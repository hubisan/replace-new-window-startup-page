// Keep track of the URLs in memory so we don't have to await storage inside a blocking listener
let config = {
    sourceUrl: "",
    targetUrl: ""
};

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

        const detailsUrl = normalizeUrl(details.url);
        const configuredUrl = normalizeUrl(config.sourceUrl);

        // Compare the loaded URL with the configured source URL
        if (detailsUrl === configuredUrl) {
            // Redirect the tab to the target URL (if empty, use about:blank)
            const redirect = config.targetUrl || "about:blank";
            return { redirectUrl: redirect };
        }
        
        return {};
    },
    { urls: ["<all_urls>"], types: ["main_frame"] },
    ["blocking"]
);