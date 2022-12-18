class productManager{
    constructor(productos){
        this.products = products
        this.id = 0
    }
    addProduct(title, description, price, thumbnail, code, stock){
        if(this.products.fine((producto)=> producto.code != code)){
            if(title && description && price && thumbnail && code && stock){
                let producto = {title:title, description:description, price:price, thumbnail:thumbnail, code:code, stock:stock, id:this.id}
                this.id ++
                this.products.push(producto)
            }
         
        }
    }

    getProducts(){
        console.log(this.products);
    }





    getProductsById(){
    if(this.id !== this.id){
        console.log("Not Found");
        }
    }

    
}