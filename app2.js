class ProductManager {
    #id

    constructor() {
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

    addProduct = (title, description, price, thumbnail, code, stock) => {
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
        return {'Success': true, 'Description': 'Product added', 'Product': product}
    }

    getProducts = () => this.products

    getProductById = (id) => {
        let msg = {'Error': true, 'Description': 'Not found'}
        this.products.forEach(el => {
            if (el.id === id) {
                msg = {'Success': true, 'Description': 'Product found', 'Product': el}
                return
            }
        })
        return msg
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