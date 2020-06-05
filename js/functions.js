import { proxy, baseEndpoint, search, searchList, form } from './elements.js';

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

function menuSearch(e) {
    e.preventDefault();

    fetchData(search.value);
}

export function start() {
    form.addEventListener('submit', menuSearch);
}