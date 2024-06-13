// Import styles.

import './assets/styles/stylesCart.css'
import './assets/styles/stylesFooter.css'
import './assets/styles/stylesHero.css'
import './assets/styles/stylesInfo.css'
import './assets/styles/stylesModal.css'
import './assets/styles/stylesNav.css'
import './assets/styles/stylesProd.css'
import './assets/styles/animations.css'
import './assets/styles/mediaquery.css'
import './assets/styles/stylesContact.css'
import 'animate.css'

//Import modules.

import { productsSectionInit } from './assets/products-section/products-section.js'
import { navSectionInit } from './assets/nav-section/nav-section.js'
import { cartSectionInit } from './assets/cart-section/cart-section.js'
import { contactSectionInit } from './assets/contact-section/contact-section.js'


// Main init.

const init = () => {
    productsSectionInit()
    cartSectionInit()
    navSectionInit()
    contactSectionInit()
}

init()





