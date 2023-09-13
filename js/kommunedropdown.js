const urlKommuner = 'https://api.dataforsyningen.dk/kommuner'


const pbSearch = document.querySelector('#pbSearch');
const inpSearch = document.querySelector('#inpSearch');
const kommuneList = document.querySelector('#kommuneList');
const ddKommuner = document.querySelector('#ddKommuner');
const pbFetchKommuner = document.querySelector('#pbFetchKommuner');
const elements = kommuneList.querySelectorAll('a');

let kommuneNavneAndHrefList;
let nameAlreadyExists = false;

function mapNameAndHref(kommuner) {
    kommuneNavneAndHrefList = kommuner.map(kom => {
        return {
            navn: kom.navn,
            href: kom.href
        }
    });
}

function addKommunerToList() {
    kommuneNavneAndHrefList.forEach(kom => {
        const element = document.createElement('option');
        element.value = kom.href;
        element.textContent = kom.navn;
        ddKommuner.append(element);
    });
}

async function loadData() {
    const res = await fetch(urlKommuner);
    const data = await res.json();
    mapNameAndHref(data)
    addKommunerToList();
}

function openWebsite() {
    const selectedValue = this.value;
    window.open(selectedValue, '_blank');
}

function searchByName() {
    const inp = inpSearch.value;
    const kommuneUrl = kommuneNavneAndHrefList.filter(komm => {
        return komm.navn === inp;
    }).map(komHref => {
        return komHref.href;
    });

    elements.forEach(element => {
        if (element.textContent === inp) {
            nameAlreadyExists = true;
        }
    });

    if (kommuneUrl.length > 0 && !nameAlreadyExists) {
        const element = document.createElement('a');
        const br = document.createElement('br');
        element.href = kommuneUrl[0];
        element.textContent = inp;
        element.target = '_blank';
        kommuneList.append(element);
        kommuneList.append(br);
    }
}

pbSearch.addEventListener('click', searchByName);
pbFetchKommuner.addEventListener('click', loadData);
ddKommuner.addEventListener('change', openWebsite);

