// navbar
const cartBtn = document.querySelector('#cart-icon')
const navBar = document.querySelector('.nav')
const dropDownMenu = document.querySelector('.dropDown')
const barsMenu = document.querySelector('#bars-icon')
const cartContent = document.querySelector('.cart-content')

// Función para el display del dropdown menú y ocultar el cart content.

const dropDown = () => {
    dropDownMenu.classList.toggle('dropDown-display')
    cartContent.classList.remove('cart-content-display')
}

// Función para cerrar el dropDownd cuando hacemos un click en algúno de sus links.

const closeOnClick = (e) => {
    if (!e.target.classList.contains('nav-link')) return
    dropDownMenu.classList.remove('dropDown-display')
    cartContent.classList.remove('cart-content-display')
}

// Función para el display del cart-content y cerrar el dropDown

const cartContentDisplay = () => {
    cartContent.classList.toggle('cart-content-display')
    dropDownMenu.classList.remove('dropDown-display')
}

// Función para cerrar onScroll

const closeOnScroll = () => {
    if (
        dropDownMenu.classList.contains('dropDown-display') ||
        cartContent.classList.contains('cart-content-display')
    ) {
        dropDownMenu.classList.remove('dropDown-display')
        cartContent.classList.remove('cart-content-display')
    }
}

// Función inicializadora de nav-section.

export const navSectionInit = () => {
    barsMenu.addEventListener('click', dropDown)
    dropDownMenu.addEventListener('click', closeOnClick)
    navBar.addEventListener('click', closeOnClick)
    cartBtn.addEventListener('click', cartContentDisplay)
    window.addEventListener('scroll', closeOnScroll)
}
