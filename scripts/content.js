const allElements = document.querySelectorAll('*:not(i)');

const openDyslexic = new FontFace('Open-Dyslexic', 'url(https://fonts.cdnfonts.com/s/29616/open-dyslexic.woff)');

const shouldAlterContent = async () => {
    const {enabled} = await chrome.storage.local.get("enabled")
    return enabled;
}
const changeContent = (targets) => {
    openDyslexic.load().then(() => {
        document.fonts.add(openDyslexic);
        targets.forEach(element => {
            applyChanges(element)
        });
    });
}

const applyChanges = (element) => {
    const elementFonts = getComputedStyle(element)['font-family']
        .split(', ')
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter((value, index, self) => self.indexOf("Open-Dyslexic") !== index)
        .filter((value, index, self) => self.value !== null)
        .join(', ');
    element.style.fontFamily = `"Open-Dyslexic", ${elementFonts}`
}

(async () => {
    if (await shouldAlterContent()) {
        changeContent(allElements);
    }
})()

// Select the node that will be observed for mutations
const targetNode = document.querySelector('body');

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true};

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    const targets = document.querySelectorAll('*:not(i)');

    changeContent(targets)
    /*for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            mutationList.forEach((mutation) => {
                console.log(mutation.target);
                applyChanges(mutation.target);

            })
            console.log('A child node has been added or removed.');
        }
    }*/
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

