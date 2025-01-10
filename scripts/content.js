const cssSelector = '*:not(i):not([aria-hidden="true"])';
const allElements = document.querySelectorAll(cssSelector);

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

const targetNode = document.querySelector('body');

const config = { childList: true, subtree: true};

const callback = async (mutationList, observer) => {
    const targets = document.querySelectorAll(cssSelector);
    if (await shouldAlterContent()) {
        changeContent(targets)
    }
};

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);

