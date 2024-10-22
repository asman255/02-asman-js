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

// item = new products(1, "pro1", 10, "img1", true);
// item = new products(2, "pro2", 20, "img1", false);
// item = new products(3, "pro3", 30, "img1", true);
// item = new products(4, "pro4", 40, "img1", true);

let arrProducts = [];
let arrCart = [];
//create product then put in arr
const createProduct = (prod_id, prod_name, prod_price, prod_img, prod_status) => {
    const newProduct = new products(prod_id, prod_name, prod_price, prod_img, prod_status);
    arrProducts.push(newProduct);
    return newProduct;
};

// const prod1 = createProduct(1, "Super Widget", 10, "img1", true);
// const prod2 = createProduct(2, "Mega Widget", 20, "img2", false);
// const prod3 = createProduct(3, "Ultra Widget", 30, "img3", true);

// console.log("Products created:", arrProducts);


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

// add2cart(prod1)
// add2cart(prod2)
// add2cart(prod3)



// console.log(calCart(arrCart))
// console.log(arrProducts[0]._prod_name);

/////////////////////////dom

const btnCreate = document.getElementById("btnCreate");
const prod_id = document.getElementById("prod_id");
const prod_name = document.getElementById("prod_name");
const prod_price = document.getElementById("prod_price");
const prod_img = document.getElementById("prod_img");
const prod_status = document.getElementById("prod_status");

const btnadd2cart = document.getElementById("btnadd2cart");



btnCreate.addEventListener("click", () => {
    const idDate = Date.now();
    const newProduct = new products(idDate, prod_name.value, prod_price.value, prod_img.value, prod_status.value);
    arrProducts.push(newProduct);
    console.log(arrProducts);

    renderProd();

});


function renderProd() {
    const prodSect = document.querySelector("#dashboard-section");
    prodSect.innerHTML = "";  // Clear previous content

    arrProducts.forEach(element => {
        const newDiv = document.createElement("div");  // Create a new div for each product

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "checkbox";
        checkbox.value = element._prod_id;
        checkbox.id = element._prod_id;

        newDiv.appendChild(checkbox);  // Append checkbox to the div
        newDiv.innerHTML += `<img src="https://placehold.co/100" alt=""><span>${element._prod_name}</span><p>${element._prod_price}</p>`;

        prodSect.appendChild(newDiv);  // Append each new product directly to prodSect
    });
}
btnadd2cart.addEventListener("click", () => {
    const getChk = document.getElementsByName("checkbox");  
    getChk.forEach((checkbox) => {
        if (checkbox.checked) {
            console.log(checkbox.value);  // This will log the value of checked checkboxes

            add2cart(checkbox.value)
            console.log(add2cart)
        }
    });

});
