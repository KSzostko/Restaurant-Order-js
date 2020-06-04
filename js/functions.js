import { proxy, baseEndpoint } from './elements.js';

export function fetchData(dish) {
    return fetch(`${proxy}${baseEndpoint}/?q=${dish}`)
        .then(resp => resp.json())
        .then(data => {
            displayData(data);
        })
        .catch(err => console.log(err));
}

export function displayData(data) {
    console.log(data);
}