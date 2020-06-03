const proxy = 'https://cors-anywhere.herokuapp.com/';
const baseEndpoint = 'http://www.recipepuppy.com/api/?q=pizza';

fetch(`${proxy}${baseEndpoint}`)
.then(resp => resp.json())
.then(data => console.log(data));