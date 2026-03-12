// Keep track of the URLs in memory so we don't have to await storage inside a blocking listener
let config = {
    sourceUrl: "",
    targetUrl: ""
};

// Track newly created tabs to only redirect on startup/new window
const newTabIds = new Set();

// Listen for new window creation instead of any new tab
browser.windows.onCreated.addListener(async (window) => {
    // A slight delay ensures the initial tabs of the window are fully generated
    setTimeout(async () => {
        try {
            const tabs = await browser.tabs.query({ windowId: window.id });
            for (const tab of tabs) {
                newTabIds.add(tab.id);
                // Remove the tab from the set after a short delay (e.g. 2 seconds)
                // If a request happens after this, it's likely a manual navigation
                setTimeout(() => {
                    newTabIds.delete(tab.id);
                }, 2000);
            }
        } catch (e) {
            console.error("Could not query tabs for new window:", e);
        }
    }, 50);
});

// Load initial config
browser.storage.sync.get({ sourceUrl: "", targetUrl: "" }).then(res => {
    config.sourceUrl = res.sourceUrl;
    config.targetUrl = res.targetUrl;
});

// Update config when changed in options
browser.storage.onChanged.addListener((changes, area) => {
    if (area === "sync") {
        if (changes.sourceUrl) config.sourceUrl = changes.sourceUrl.newValue;
        if (changes.targetUrl) config.targetUrl = changes.targetUrl.newValue;
    }
});

// Helper to safely parse and normalize URLs for comparison
const normalizeUrl = (u) => {
    try {
        return new URL(u).href;
    } catch (e) {
        return u.replace(/\/$/, '');
    }
};

// Intercept the request before it even starts.
// Using webRequest instead of tabs.update avoids the "Extension changed this page" indicator.
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        // Only act on top-level frames (not iframes)
        if (details.frameId !== 0) return {};

        // If no source URL configured, do nothing
        if (!config.sourceUrl) return {};

        // Only redirect if this is a newly created tab (like a new window startup)
        // This prevents redirecting when the user manually types the URL later
        if (!newTabIds.has(details.tabId)) return {};

        const detailsUrl = normalizeUrl(details.url);
        const configuredUrl = normalizeUrl(config.sourceUrl);

        // Compare the loaded URL with the configured source URL
        if (detailsUrl === configuredUrl) {
            // Once redirected we can remove it so we don't accidentally redirect again
            newTabIds.delete(details.tabId);
            
            // Redirect the tab to the target URL (if empty, use about:blank)
            const redirect = config.targetUrl || "about:blank";
            return { redirectUrl: redirect };
        }
        
        return {};
    },
    { urls: ["<all_urls>"], types: ["main_frame"] },
    ["blocking"]
);