console.log('snickers');



(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    document.querySelector('.donkey').addEventListener('click', (e) => {
        chrome.scripting.executeScript({
            args: [],
            target: { tabId: tab.id },
            function: dealWithDonkey,
        });
    })
})()

const dealWithDonkey = async () => {
    const result = await chrome.storage.local.get("enabled");
    console.log(result);
    await chrome.storage.local.set({enabled: !result.enabled});
    window.location.reload();
}