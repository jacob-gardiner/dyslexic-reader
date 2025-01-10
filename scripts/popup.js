(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const result = await chrome.storage.local.get("enabled");
    document.querySelector('#toggle').checked = result.enabled ? 'checked' : null;

    document.getElementById('toggle').addEventListener('click', async (e) => {
        const result = await chrome.storage.local.get("enabled");
        await chrome.storage.local.set({enabled: !result.enabled});

        await chrome.scripting.executeScript({
            args: [],
            target: { tabId: tab.id },
            function: toggle,
        });
    })
})()

const toggle = async () => {
    window.location.reload();
}