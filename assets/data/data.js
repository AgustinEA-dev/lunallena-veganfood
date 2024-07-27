export const productsData = [
    {
        name: 'Medallón de calabaza',
        precio: 600,
        // precioDocena: 5500,
        // precioMediaDocena: 2750,
        img: './productos/medallon_calabaza.png',
        id: 1
    },
    {
        name: 'Medallón Mix veg.',
        precio: 600,
        // precioDocena: 5500,
        // precioMediaDocena: 2750,
        img: './productos/medallon_acelga.png',
        id: 2
    },
    {
        name: 'Medallón de arbejas',
        precio: 600,
        // precioDocena: 5500,
        // precioMediaDocena: 2750,
        img: './productos/medallon_arbejas.png',
        id: 4
    },
    {
        name: 'Medallón de remolacha',
        precio: 600,
        // precioDocena: 5500,
        // precioMediaDocena: 2750,
        img: './productos/medallon_remolacha.png',
        id: 3
    },
    {
        name: 'Medallón variedades',
        precio: 600,
        // precioDocena: 5500,
        // precioMediaDocena: 2750,
        img: './productos/medallones_mix.png',
        id: 5
    },
    {
        name: 'Guiso de lentejas',
        precio: 2500,
        img: './productos/guiso-lentejas.png',
        id: 6
    },
    {
        name: 'Arrollados rellenos',
        precio: 2000,
        img: './productos/arrollados.png',
        id: 7
    },
    {
        name: 'Focaccia',
        precio: 2500,
        img: './productos/focaccia.png',
        id: 8
    },
    {
        name: 'Pan integral',
        precio: 2500,
        img: './productos/panes.png',
        id: 9
    },
    {
        name: 'Bifes de seitan',
        precio: 300,
        img: './productos/Bife-seitan.png',
        id: 10
    },
]

// Function to create product list.

const createProductList = () => {
    let productList = []
    productList.push(productsData)
    return productList

}

export const appState = {
    products: createProductList()
}


