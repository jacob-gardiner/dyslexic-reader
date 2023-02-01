console.log('snickers');

(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    document.getElementById('toggle').addEventListener('click', async (e) => {
        const result = await chrome.storage.local.get("enabled");
        await chrome.storage.local.set({enabled: !result.enabled});

        if (result.enabled) {
            document.querySelector('#toggle').innerText = 'Disabled';
        } else {
            document.querySelector('#toggle').innerText = 'Enabled';
        }

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