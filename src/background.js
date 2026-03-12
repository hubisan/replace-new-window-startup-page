// Listen for newly created windows
browser.webNavigation.onBeforeNavigate.addListener(async (details) => {
    // Only act on top-level frames (not iframes)
    if (details.frameId !== 0) return;

    // Retrieve stored URLs
    const { sourceUrl, targetUrl } = await browser.storage.sync.get({
        sourceUrl: "",
        targetUrl: ""
    });

    // If no source URL configured, do nothing
    if (!sourceUrl) return;

    // Helper to safely parse and normalize URLs for comparison
    const normalizeUrl = (u) => {
        try {
            return new URL(u).href;
        } catch (e) {
            return u.replace(/\/$/, '');
        }
    };

    const detailsUrl = normalizeUrl(details.url);
    const configuredUrl = normalizeUrl(sourceUrl);

    // Compare the loaded URL with the configured source URL
    if (detailsUrl === configuredUrl) {
        // Redirect the tab to the target URL (if empty, use about:blank)
        const redirect = targetUrl || "about:blank";
        try {
            await browser.tabs.update(details.tabId, { url: redirect });
        } catch (e) {
            console.error("Redirect failed:", e);
        }
    }
});