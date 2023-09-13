const inpUrl = document.querySelector('#inpUrl');
const textArea = document.querySelector('#txt')
const pbFetch = document.querySelector('#pbFetchUrl');

function fetchAnyUrl(url) {
    return fetch(url).then(response => response.text());
}

async function actionFetchUrl() {
    const url = inpUrl.value
    const jsonOutput = await fetchAnyUrl(url);
    textArea.textContent = jsonOutput;
}

function newFetchAnyUrl(url) {
    return fetch(url).then(response => response.text().then(data => data));
}

function newActionFetchUrl() {
    const url = inpUrl.value
    newFetchAnyUrl(url).then(
        jsonOutput => textArea.textContent =jsonOutput
    );
}

async function newActionFetchUrl() {
    const res = await fetch(inpUrl.value);
    const data = await res.text();
    textArea.textContent = data;
}

pbFetch.addEventListener('click', actionFetchUrl);