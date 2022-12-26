 function Main(){
    const pm = new productManager()
        constructor(products)
        this.products = products
        this.productos = []
        this.id = 0
     pm.getProducts()
     pm.addProduct(
        "producto prueba",
        "este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
    )
     pm.getProducts()
     pm.getProductsById(0)
     pm.undateProduct(0,{
        price:500,
        descripcion: "Este producto esta siendo probado"})
     pm.getProducts()
}
 