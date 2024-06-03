import { productsData, appState } from "../data/data.js"
import { addProduct } from "../cart-section/cart-section.js"

// products
export const productsContainer = document.querySelector('.products-container')
const input = document.querySelector('#search')


// Creación de template de productos


const createProductTemplate = (product) => {
    const { id, name, precio, img } = product
    return `<div class="card-container">
<img class="cardImg" src="${img}" alt="${name}">
<h2>${name}</h2>
<h3>Precio x unidad: $${precio}</h3>
<h4>Cod: ${id}</h4>
<button class="btn-add"
data-id='${id}'
data-name='${name}'
data-img='${img}'
data-precio='${precio}'
>Agregar</button>
</div>`
}

// Función para renderizar lsita de productos

const renderProducts = (productList) => {
    productsContainer.innerHTML = ""
    productsContainer.innerHTML += productList
        .map(createProductTemplate)
        .join("")
}

// Función para filtrar productos

const handleSearch = () => {
    const searchTerm = input.value.toLowerCase()
    const filteredProducts = productsData.filter((product) =>
        product.name.toLowerCase().startsWith(searchTerm))
    renderProducts(filteredProducts)
}

// Función para incializar products-section

export const productsSectionInit = () => {
    renderProducts(appState.products[0])
    productsContainer.addEventListener('click', addProduct)
    input.addEventListener('input', handleSearch)
}

