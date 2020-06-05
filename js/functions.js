import { proxy, baseEndpoint, search, searchList } from './elements.js';

export function fetchData(dish) {
    console.log(dish);
    return fetch(`${proxy}${baseEndpoint}/?q=${dish}`)
        .then(resp => resp.json())
        .then(data => {
            displayData(data.results);
        })
        .catch(err => console.log(err));
}

export function displayData(data) {
    console.log(data);
    data = data.filter(el => el.thumbnail != '');

    searchList.innerHTML = '';

    data.forEach(({ title, thumbnail }) => {
        const HTML = `
            <li class="menu__results-item">
                <img class="menu__results-img" src="${thumbnail}" alt="${title}" />
                <span class="menu__results-title">${title}</span>
            </li>
        `;
        searchList.insertAdjacentHTML('beforeend', HTML);
    });
}

export function start() {
    search.addEventListener('input', e => fetchData(e.target.value));
}