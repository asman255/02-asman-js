class products {
    constructor(prod_id, prod_name, prod_price, prod_img) {
        this._prod_id = prod_id;
        this._prod_name = prod_name;
        this._prod_price = prod_price;
        this._prod_img = prod_img;
        // this._prod_status = prod_status;
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


    set prod_id(id) {
        this._prod_id = id;
    }

    set prod_name(name) {
        this._prod_name = name
    }
    set prod_price(price) {
        this._prod_price = price
    }

}


let arrProducts = [];
let arrCart = [];
//create product then put in arr
const createProduct = (prod_id, prod_name, prod_price, prod_img) => {
    const newProduct = new products(prod_id, prod_name, prod_price, prod_img);
    // arrProducts.push(newProduct);
    let findDup = false
    arrProducts.forEach(element => {

        if (prod_name === element._prod_name && prod_price === element._prod_price) {
            alert("Duplicate Product")
            findDup = true
        }
        else {

            findDup = false
        }
    });

    if (!findDup) {
        arrProducts.push(newProduct);
    }

    return newProduct;
};

const add2cart = (item) => {
    //  console.log(item)
    arrCart.push(item);


};

const calCart = (cartItems) => {
    let cartSum = 0;
    cartItems.forEach(item => {

        cartSum += item._prod_price;
    });
    return cartSum
};

const calPrice = () => {

    let sum = 0;
    const result = arrCart.forEach(element => {

        const findMatch = arrProducts.find((el) => {
            // console.log(el._prod_id,element)
            return el._prod_id == element
        })
        console.log(findMatch.prod_price)
        sum = sum + Number(findMatch.prod_price)
    });
    return sum

}
/////////////////////////dom

const btnCreate = document.getElementById("btnCreate");
// const prod_id = document.getElementById("prod_id");
const prod_name = document.getElementById("prod_name");
const prod_price = document.getElementById("prod_price");
const prod_img = document.getElementById("prod_img");
// const prod_status = document.getElementById("prod_status");
const btnadd2cart = document.getElementById("btnadd2cart");
const btnCal = document.getElementById("btnCal");

btnCreate.addEventListener("click", () => {
    const idDate = Date.now();
    // const newProduct = new products(idDate, prod_name.value, prod_price.value, prod_img.value, prod_status.value);
    const newProduct = createProduct(idDate, prod_name.value, prod_price.value, prod_img.value);
    // arrProducts.push(newProduct);
    // console.log(arrProducts);

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

        const btnDel = document.createElement("button")
        btnDel.del = "btnDel"
        btnDel.innerText = "Delete"
        btnDel.value = element._prod_id
        newDiv.appendChild(btnDel);

        btnDel.addEventListener("click", () => {
            // console.log(btnDel.value)
            const delID = btnDel.value
            const findDel = arrProducts.findIndex((element) => {
                return element._prod_id == delID
            })

            arrProducts.splice(findDel, 1)
            renderProd();
        })
        ///////// cart section
        const cartSect = document.querySelector("#cart-section");
        cartSect.innerHTML = "";  // Clear previous content

        arrCart.forEach(element => {
            // console.log(element)
            const findProd = arrProducts.find((e) => {
                return e._prod_id == element
            })
            // console.log(findProd._prod_name)
            if (findProd) {

                const newDiv = document.createElement("div");
                newDiv.innerHTML += `<img src="https://placehold.co/100" alt=""><span>${findProd._prod_name}</span><p>${findProd._prod_price}</p>`;

                cartSect.appendChild(newDiv);

                const btnDel = document.createElement("button")
                btnDel.del = "btnDel"
                btnDel.innerText = "Delete"
                btnDel.value = findProd._prod_id
                newDiv.appendChild(btnDel);

                btnDel.addEventListener("click", () => {

                    const delID = btnDel.value
                    const findDel = arrCart.findIndex((element) => {

                        return element == delID
                    })

                    arrCart.splice(findDel, 1)
                    renderProd();
                })
            }
        });
        ////////


    });
}


btnadd2cart.addEventListener("click", () => {
    const getChk = document.getElementsByName("checkbox");
    getChk.forEach((checkbox) => {
        if (checkbox.checked) {
            // console.log(checkbox.value);

            add2cart(checkbox.value)
            // console.log(arrCart)
        }
    });

    renderProd();

});


btnCal.addEventListener("click", () => {

    const finaPrice = document.getElementById("final-price")
    finaPrice.innerText = calPrice()
    renderProd()
    // console.log(calPrice())
})