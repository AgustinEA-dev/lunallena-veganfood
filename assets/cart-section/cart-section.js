export let cart = JSON.parse(localStorage.getItem("cart")) || []

// cart
const cartContent = document.querySelector('.cart-content')
const addBtn = document.querySelector('btn-add')
const cartProduct = document.querySelector('.cart-product')
const emptyMsg = document.querySelector('.empty-msg')
const buyBtn = document.querySelector('.buy-btn')
const emptyBtn = document.querySelector('.empty-btn')
const total = document.querySelector('.total')

// modal

const successModal = document.querySelector(".add-modal");

// Función para guardar en el carrito.

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// Creación de template para productos del carrito

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


// Función para renderizar los productos en el carrito, en el caso de que el carrito esté vacío mostrar un mensaje que lo indique.


const renderCart = () => {
    if (!cart.length) {
        emptyMsg.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>
        `
        return
    }
    emptyMsg.innerHTML = ""
    cartProduct.innerHTML = cart.map(createCartProductTemplate).join("");
}

// Función para obtener el total de la compra

const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0);
};


// Función para mostrar el total de la compra0

const showCartTotal = () => {
    total.innerHTML = `Total: $${getCartTotal()}`;
};

// Función para desabilitar botones

const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add('disabled')
    } else {
        btn.classList.remove('disabled')
    }
}


// Función que ejecuta las funciones necesarias para actualizar el estado del carrito. 

const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
    disableBtn(buyBtn)
    disableBtn(emptyBtn)
};


// Función para crear un objeto con la información del producto que se quiere agregar al carrito o bien agregar una unidad a un producto que ya este en el carrito.


export const addProduct = (e) => {
    if (!e.target.classList.contains('btn-add'))
        return
    const product = createProductData(e.target.dataset)
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product)
        showSuccessModal("¡Se agregó una unidad más! También podés seguir agregando desde el carrito");
    } else {
        createCartProduct(product)
        showSuccessModal("El producto se agregó correctamente");
    }
    updateCartState()
}

//  * Función para agregar una unidad a un producto que ya este en el carrito.


const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) =>
        cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
    );
};


//  * Función para crear un objeto con la información del producto que se quiere agregar al carrito.


const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }]
}


// Función para saber si un producto ya existe en el carrito.


const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id)
}


// Función para crear un objeto con la información del producto que se quiere crear en el carrito.


const createProductData = (product) => {
    const { id, name, precio, img } = product
    return { id, name, precio, img }
}


// Función para mostrar el modal de éxito al agregar o añadir un producto.


const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove("active-modal")
    }, 2300)
};


// Función para manejar el evento click del botón de más de cada producto del carrito.


const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id == id);
    addUnitToProduct(existingCartProduct);
};


//  Función para manejar el evento click del botón de menos de cada producto del carrito.


const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id == id)

    if (existingCartProduct.quantity === 1) {
        if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
            removeProductFromCart(existingCartProduct);
        }
        return;
    }
    substractProductUnit(existingCartProduct);
};

//  Función para quitar una unidad de producto.


const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id
            ? { ...product, quantity: Number(product.quantity) - 1 }
            : product;
    });
};


//   Función para eliminar un producto del carrito.


const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    updateCartState();
};


//  Función que maneja los eventos de apretar el botón de más o de menos según corresponda.


const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
        handlePlusBtnEvent(e.target.dataset.id);
    }
    cartProduct.innerHTML = ""
    updateCartState();
}


//  Función para vaciar el carrito.


const resetCartItems = () => {
    cart = [];
    updateCartState();
};


//  Función para completar la compra o vaciar el carrito.

const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
    }
};


//  Función para disparar el mensaje de compra exitosa y su posterior mensaje de exito en caso de darse la confirmación.


const completeBuy = () => {
    completeCartAction("¿Desea completar su compra?", "Gracias por su compra");
};


const deleteCart = () => {
    completeCartAction("¿Desea vaciar el carrito?", "No hay mas productos en el carrito")
}


// Función para inicializar cart-section


export const cartSectionInit = () => {
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    cartContent.addEventListener('click', handleQuantity)
    buyBtn.addEventListener("click", completeBuy);
    emptyBtn.addEventListener("click", deleteCart);
}

