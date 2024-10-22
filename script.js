class products {
    constructor(prod_id, prod_name, prod_price, prod_img, prod_status) {
        this._prod_id = prod_id;
        this._prod_name = prod_name;
        this._prod_price = prod_price;
        this._prod_img = prod_img;
        this._prod_status = prod_status;
    }

    get prod_id() {
        return this._prod_id
    }
    get prod_name() {
        return this._prod_name
    }
    get prod_price() {
        return this._prod_price
    }
    get prod_status() {
        return this._prod_status
    }

    set prod_id(id) {
        this._prod_id = id;
    }

    set prod_name(name) {
        this._prod_name = name
    }
    set prod_price(price) {
        this._prod_price = price
    }
    set prod_status(status) {
        this._prod_status = status
    }
}

 item = new products(1, "pro1", 10, "img1", true);
 item = new products(2, "pro2", 20, "img1", false);
 item = new products(3, "pro3", 30, "img1", true);
 item = new products(4, "pro4", 40, "img1", true);

let arrCart = [];

const add2cart = (item) => {
    if (arrCart.includes(item._prod_id)) {
        console.log("dup")
        return
    }
    if ((item._prod_status === true) && (arrCart.includes(item._prod_id) === false)) {
        arrCart.push(item);
    }
};

const calCart = (cartItems) => {
    let cartSum = 0;
    cartItems.forEach(item => {

        cartSum += item._prod_price;
    });
    return cartSum
};

add2cart(item)


 console.log(calCart(arrCart))
console.log(item);
