export const productsData = [
    {
        name: 'Medallón de calabaza',
        precio: 600,
        // precioDocena: 5500,
        // precioMediaDocena: 2750,
        img: './productos/IMG_1389 (1).jpg',
        id: 1
    },
    {
        name: 'Medallón de remolacha',
        precio: 600,
        // precioDocena: 5500,
        // precioMediaDocena: 2750,
        img: './productos/IMG_1397 (1).jpg',
        id: 2
    },
    {
        name: 'Medallón de arbejas',
        precio: 600,
        // precioDocena: 5500,
        // precioMediaDocena: 2750,
        img: './productos/IMG_1400 (1).jpg',
        id: 3
    },
    {
        name: 'Guiso de lentejas',
        precio: 2500,
        img: './productos/guiso.jpeg',
        id: 4
    },
    {
        name: 'Arrollados rellenos',
        precio: 2000,
        img: './productos/arrollados.jpeg',
        id: 5
    },
    {
        name: 'Focaccia',
        precio: 2500,
        img: './productos/focaccia.jpeg',
        id: 6
    },
    {
        name: 'Pan integral con semillas',
        precio: 2500,
        img: './productos/panes.jpeg',
        id: 7
    },
    {
        name: 'Bifes de seitan',
        precio: 300,
        // precioDocena: 5500,
        // precioMediaDocena: 2750,
        img: './productos/Bife-seitan.jpg',
        id: 7
    },
]

// Función que crea la lista de productos

const createProductList = () => {
    let productList = []
    productList.push(productsData)
    // console.log(productList)
    return productList

}

export const appState = {
    products: createProductList()
}


