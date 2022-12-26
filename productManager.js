const fs = require('fs')

class ProductManager {
    #id

    constructor(path) {
        this.path = path
        this.products = []
        this.#id = 0
    }

    #codeExists = (code) => {
        let response = false
        this.products.forEach(el => {
            if (el.code === code) {
                response = true
                return
            }
        })
        return response
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try { 
            if (typeof title === 'undefined' || title === null) {
                return {'Error': true, 'Description': 'The title is required'}
            }
            if (typeof description === 'undefined' || description === null) {
                return {'Error': true, 'Description': 'The description is required'}
            }
            if (typeof price === 'undefined' || price === null) {
                return {'Error': true, 'Description': 'The description is required'}
            }
            if (typeof thumbnail === 'undefined' || thumbnail === null) {
                return {'Error': true, 'Description': 'The description is required'}
            }
            if (typeof code === 'undefined' || code === null) {
                return {'Error': true, 'Description': 'The description is required'}
            }
            if (typeof stock === 'undefined' || stock === null) {
                return {'Error': true, 'Description': 'The description is required'}
            }
            if (this.#codeExists(code)) {
                return {'Error': true, 'Description': 'The code is alredy used'}
            }
            this.#id += 1
            const product = {
                'id': this.#id,
                'title': title,
                'description': description,
                'price': price,
                'thumbnail': thumbnail,
                'code': code,
                'stock': stock
            }
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            // return {'Success': true, 'Description': 'Product added', 'Product': product}
        }
        catch (error) {
            throw new Error(error)
        }
    }

    getProducts = async () =>{
        try{
            let string = await fs.promises.readFile(this.path, 'utf-8')
            const object = JSON.parse(string)
            return object
        }
        catch(error){
            throw new Error(error)
        }
    }

    getProductById = async (paramId) => {
        try {
            let string = await fs.promises.readFile(this.path, 'utf-8');
            const object = JSON.parse(string);
            const resultFind = object.find(el => el.id == paramId);
            return(resultFind);
        }
        catch (error) {
            throw new Error(error);
        }
    }


    updateProduct = async (paramId, obj) => {
        try {
            const object = await this.getProducts();
            const resultFind = object.find(el => el.id == paramId);
            if (resultFind === undefined) throw new Error(`The product with id: ${paramId} not exists`);
            else {
                resultFind.title = obj.title || resultFind.title;
                resultFind.description = obj.description || resultFind.description;
                resultFind.price = obj.price || resultFind.price;
                resultFind.thumbnail = obj.thumbnail || resultFind.thumbnail;
                resultFind.code = obj.code || resultFind.code;
                resultFind.stock = obj.stock || resultFind.stock;
                await fs.promises.writeFile(this.path, JSON.stringify(object, null, '\t'));
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }

    deleteProduct = async (paramId) => {
        try {
            const result = await this.getProductById(paramId);
            const object = await this.getProducts();
            if (result === undefined) throw new Error(`The product with id: ${paramId} not exists`);
            else {
                const products = object.filter(el => el.id != paramId);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
}

const pm = new ProductManager()
console.log(pm.getProducts())
console.log(
    pm.addProduct(
        'producto prueba',
        'Este es un producto prueba',
        200,
        'Sin imagen',
        'abc123',
        25
    )
)
console.log(pm.getProducts())
console.log(
    pm.addProduct(
        'producto prueba',
        'Este es un producto prueba',
        200,
        'Sin imagen',
        'abc123',
        25
    )
)
console.log(pm.getProductById(100))
console.log(pm.getProductById(1))


