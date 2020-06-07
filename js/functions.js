import { 
    proxy, 
    baseEndpoint, 
    search, 
    searchList, 
    form, 
    orderList,
    orderCount,
} from './elements.js';

function fetchData(dish) {
    return fetch(`${proxy}${baseEndpoint}/?q=${dish}`)
        .then(resp => resp.json())
        .then(data => {
            displayData(data.results);
        })
        .catch(err => console.log(err));
}

function displayData(data) {
    searchList.innerHTML = '';

    data = data.filter(el => el.thumbnail != '');
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
    updateOrder(dishName);
}

function updateOrder(name) {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    let elIndex = order.findIndex(el => el.name == name);

    if(elIndex === -1) {
        const arrLength = order.push({
            name,
            amount: 1,
        });
        elIndex = arrLength - 1;
    } else {
        order[elIndex].amount++;
    }
    localStorage.setItem('order', JSON.stringify(order));

    displayOrder();
}

function displayOrder() {
    orderList.innerHTML = '';
    
    const order = JSON.parse(localStorage.getItem('order'));
    if(order === null) return;

    order.forEach(({ name, amount }) => {
        const orderItem = document.createElement('li');
        orderItem.textContent = `${name} x ${amount}`;
        orderItem.classList.add('order__results-item');
        orderList.appendChild(orderItem);
    });

    countElements();
}

function countElements() {
    const order = JSON.parse(localStorage.getItem('order'));
    if(order === null) return;

    const count = order.reduce((acc, curr) => acc + curr.amount, 0);
    orderCount.textContent = `Total: ${count}`;
}

export function start() {
    displayOrder();
    
    form.reset();
    form.addEventListener('submit', menuSearch);
    // bubbling
    searchList.addEventListener('click', addToOrder);
}