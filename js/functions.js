import { proxy, baseEndpoint, search, searchList, form } from './elements.js';

export function fetchData(dish) {
    return fetch(`${proxy}${baseEndpoint}/?q=${dish}`)
        .then(resp => resp.json())
        .then(data => {
            displayData(data.results);
        })
        .catch(err => console.log(err));
}

export function displayData(data) {
    data = data.filter(el => el.thumbnail != '');

    searchList.innerHTML = '';

    data.forEach(({ title, thumbnail }) => {
        const HTML = `
            <li class="menu__results-item">
                <img class="menu__results-img" src="${thumbnail}" alt="${title}" />
                <div class="menu__results-data">
                    <span class="menu__results-title">${title}</span>
                    <button class="button button--white">Add to order</button>
                </div>
            </li>
        `;
        searchList.insertAdjacentHTML('beforeend', HTML);
    });
}

function menuSearch(e) {
    e.preventDefault();

    fetchData(search.value);
}

function addToOrder(e) {
    if(e.target.tagName != 'BUTTON') return;

    const dishName = e.target.previousElementSibling.textContent;
}

export function start() {
    form.reset();
    form.addEventListener('submit', menuSearch);
    // bubbling
    searchList.addEventListener('click', addToOrder);
}