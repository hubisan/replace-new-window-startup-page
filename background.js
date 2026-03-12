// Listen for newly created windows
browser.webNavigation.onCommitted.addListener(async (details) => {
    // Only act on top‑level frames (not iframes)
    if (details.frameId !== 0) return;
    // Retrieve stored URLs
    const { sourceUrl, targetUrl } = await browser.storage.sync.get({
        sourceUrl: "",
        targetUrl: ""
    });
    // If no source URL configured, do nothing
    if (!sourceUrl) return;
    // Compare the loaded URL with the configured source URL (exact match)
    if (details.url === sourceUrl) {
        // Redirect the tab to the target URL (if empty, use about:blank)
        const redirect = targetUrl || "about:blank";
        try {
            await browser.tabs.update(details.tabId, { url: redirect });
        } catch (e) {
            console.error("Redirect failed:", e);
        }
    }
});