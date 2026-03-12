document.addEventListener('DOMContentLoaded', async () => {
    const sourceInput = document.getElementById('source');
    const targetInput = document.getElementById('target');
    const saveBtn = document.getElementById('save');
    // Load saved values
    const { sourceUrl = '', targetUrl = '' } = await browser.storage.sync.get({
        sourceUrl: '',
        targetUrl: ''
    });
    sourceInput.value = sourceUrl;
    targetInput.value = targetUrl;
    // Save on click
    saveBtn.addEventListener('click', async () => {
        await browser.storage.sync.set({
            sourceUrl: sourceInput.value.trim(),
            targetUrl: targetInput.value.trim()
        });
        alert('Settings saved');
    });
});
