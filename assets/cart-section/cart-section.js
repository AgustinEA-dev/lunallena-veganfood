// Dependecies

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

// cart

export let cart = JSON.parse(localStorage.getItem("cart")) || []

const cartContent = document.querySelector('.cart-content')
const cartBubble = document.querySelector(".cart-bubble");
const addBtn = document.querySelector('btn-add')
const cartProduct = document.querySelector('.cart-product')
const emptyMsg = document.querySelector('.empty-msg')
const buyBtn = document.querySelector('.buy-btn')
const emptyBtn = document.querySelector('.empty-btn')
const total = document.querySelector('.total')


// modal


const successModal = document.querySelector(".add-modal");


// Store in cart.


const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
}


// Create product template.


const createCartProductTemplate = (cartProduct) => {
    const { id, name, precio, img, quantity } = cartProduct;
    return `<div class="cardCart-container">
    <div class='data-container'>
    <img class="img" src="${img}" alt="${name}">
    <div>
    <h2 class ="h2Card">${name}</h2>
    <h3>Precio x unidad: $${precio}</h3>
    <h4>Cod: ${id}</h4>
    <div class="item-handler">
    <button class="quantity-handler down" data-id=${id}>-</button>
    <span class="item-quantity">${quantity}</span>
    <button class="quantity-handler up" data-id=${id}>+</button>
    </div>
    </div>

  </div>`

}


// Render cart products. If cart is empty render a message to show so.


const renderCart = () => {
    if (!cart.length) {
        emptyMsg.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>
        `
        return
    }
    emptyMsg.innerHTML = ""
    cartProduct.innerHTML = cart.map(createCartProductTemplate).join("");
}


// Get buy total.


const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0);
};


// Show buy total.


const showCartTotal = () => {
    total.innerHTML = `Total: $${getCartTotal()}`;
};


// Unable buttons.


const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add('disabled')
    } else {
        btn.classList.remove('disabled')
    }
}


// Update cart bubble.


const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};


// Update cart state.


const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
    disableBtn(buyBtn)
    disableBtn(emptyBtn)
    renderCartBubble()
};


// Add to cart.


export const addProduct = (e) => {
    if (!e.target.classList.contains('btn-add'))
        return
    const product = createProductData(e.target.dataset)
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product)
        showSuccessModal("¡Se agregó una unidad más! También podés seguir agregando desde el carrito");
    } else {
        createCartProduct(product)
        showSuccessModal('El producto se agregó correctamente');
    }
    updateCartState()
}


// Add one unit.


const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) =>
        cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
    );
};


// Spread cart info and modify quantity.


const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }]
}


// Check for an existing product.


const isExistingCartProduct = (product) => {

    return cart.find((item) => item.id === product.id)
}


// Create an object with product information.


const createProductData = (product) => {
    const { id, name, precio, img } = product
    return { id, name, precio, img }
}


// Show success modal.


const showSuccessModal = (msg) => {
    successModal.classList.add('active-modal');
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove('active-modal')
    }, 2300)
};


// Handle plus button event.


const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id == id);
    addUnitToProduct(existingCartProduct);
};


// Handle minus event.


const handleMinusBtnEvent = (id) => {

    const existingCartProduct = cart.find((item) => item.id == id)

    const confirm = {
        title: '¿Desea eliminar este producto?',
        icon: 'question',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonColor: "#d33",
        color: '#18282f',
        allowOutsideClick: false,
        allowEscapeKey: true
    }

    const exito = {
        title: '¡Perfecto!',
        text: 'Producto eliminado.',
        icon: 'success',
        showConfirmButton: false,
        color: '#18282f',
        timer: 1500,
    }


    if (existingCartProduct.quantity === 1) {

        Swal.fire(confirm)
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(exito)
                    removeProductFromCart(existingCartProduct);
                    if (cart.length === 0) {
                        cartProduct.innerHTML = ""
                    }
                }
            })
        return
    }
    substractProductUnit(existingCartProduct);
};


// Substract a unit.


const substractProductUnit = (existingProduct) => {

    cart = cart.map((product) => {
        return product.id === existingProduct.id
            ? { ...product, quantity: Number(product.quantity) - 1 }
            : product;
    });
};


// Delete one product from cart.


const removeProductFromCart = (existingProduct) => {

    cart = cart.filter((product) => product.id !== existingProduct.id);
    updateCartState();
};


// Handle quantity.


const handleQuantity = (e) => {

    if (e.target.classList.contains('down')) {
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains('up')) {
        handlePlusBtnEvent(e.target.dataset.id);
    }
    updateCartState();
}


// Reset cart items.


const resetCartItems = () => {

    cart = [];
    cartProduct.innerHTML = ""
    updateCartState();

};


// Complete buy.


const completeCartActionBuy = () => {

    if (!cart.length) return;

    const confirm = {
        title: '¿Desea confirmar su compra?',
        icon: 'question',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonColor: "#d33",
        allowOutsideClick: false,
        allowEscapeKey: true
    }

    const exito = {
        title: '¡Muchas gracias!',
        text: 'Tu compra ya fue confirmada.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        allowEscapeKey: true
    }

    Swal.fire(confirm)
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire(exito)
                resetCartItems()
            }
        })
};


// Empty cart.


const completeCartActionDelete = () => {

    if (!cart.length) return;

    const confirm = {
        title: '¿Desea eliminar los productos del carrito?',
        icon: 'question',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        allowOutsideClick: false
    }

    const exito = {
        title: 'Artículos eliminados',
        text: 'No hay más productos en el carrito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }

    Swal.fire(confirm)
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire(exito)
                resetCartItems()
            }
        })
};


// Fire succes message on buy or empty cart.


const completeBuy = () => {
    completeCartActionBuy();
};


const deleteCart = () => {
    completeCartActionDelete()
}


// Init cart section.


export const cartSectionInit = () => {
    cartContent.addEventListener('click', handleQuantity)
    buyBtn.addEventListener('click', completeBuy);
    emptyBtn.addEventListener('click', deleteCart);
    renderCartBubble(cart)
    document.addEventListener('DOMContentLoaded', renderCart);
    document.addEventListener('DOMContentLoaded', showCartTotal);
}

