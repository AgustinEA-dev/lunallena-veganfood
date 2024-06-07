import { productsData, appState } from "../data/data.js"
import { addProduct } from "../cart-section/cart-section.js"


// products


export const productsContainer = document.querySelector('.products-container')
const input = document.querySelector('#search')


// Function to create template for products.


const createProductTemplate = (product) => {
    const { id, name, precio, img } = product
    return `<div class="card-container">
<img class="cardImg" src="${img}" alt="${name}">
<div class="infoProduct">
<h2 class ="h2Prod">${name}</h2>
<h3>Precio x unidad: $${precio}</h3>
<h4>Cod: ${id}</h4>
</div>
<button class="btn-add"
data-id='${id}'
data-name='${name}'
data-img='${img}'
data-precio='${precio}'
>Agregar</button>
</div>`
}


// Function to render products.


const renderProducts = (productList) => {
    productsContainer.innerHTML = ""
    productsContainer.innerHTML += productList
        .map(createProductTemplate)
        .join("")
}


// Function to filter products.


const handleSearch = () => {
    const searchTerm = input.value.toLowerCase()
    const filteredProducts = productsData.filter((product) =>
        product.name.toLowerCase().startsWith(searchTerm))
    renderProducts(filteredProducts)
}


// Function to init product section.


export const productsSectionInit = () => {
    renderProducts(appState.products[0])
    productsContainer.addEventListener('click', addProduct)
    input.addEventListener('input', handleSearch)
}

