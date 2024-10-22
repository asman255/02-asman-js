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

// const calCart = (cartItems) => {
//     let cartSum = 0;
//     cartItems.forEach(item => {

//         cartSum += item._prod_price;
//     });
//     return cartSum
// };

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
const btnUpdate = document.getElementById("btnUpdate")


btnUpdate.addEventListener("click", () => {
    const upID = btnUpdate.value
    const newName = document.getElementById("edit_prod_name").value
    const newPrice = document.getElementById("edit_prod_price").value
    const newImg = document.getElementById("edit_prod_img").value

    const findMatch = arrProducts.find((el) => {
        return el._prod_id == upID
    })

    findMatch._prod_name = newName
    findMatch._prod_price = newPrice
    findMatch._prod_img = newImg
    console.log(arrProducts)
    document.getElementById("form-edit").hidden = true
    alert("Your request has been submitted")
    renderProd();

})

btnCreate.addEventListener("click", () => {
    if (!prod_name.value.trim() || !prod_img.value.trim() || !prod_price.value) {
        alert("Please Do not leave any field blank")
        return

    }
    const idDate = Date.now();
    // const newProduct = new products(idDate, prod_name.value, prod_price.value, prod_img.value, prod_status.value);
    const newProduct = createProduct(idDate, prod_name.value, prod_price.value, prod_img.value);
    // arrProducts.push(newProduct);
    // console.log(arrProducts);

    renderProd();

});


btnadd2cart.addEventListener("click", () => {
    if (arrProducts <= 0) {
        alert("There is no Product yet, please add product")
        return
    }
    const getChk = document.getElementsByName("checkbox");
    let i = 0;
    getChk.forEach((checkbox) => {

        if (checkbox.checked) {
            i++
            add2cart(checkbox.value)
        }

    });
    if (i < 1) {
        alert("Please Select at least 1 Product")
        return
    }
    renderProd();
});


btnCal.addEventListener("click", () => {
    if (arrCart.length <= 0) {
        alert("Please Add atleast 1 Product to Cart")
        return
    }
    const finaPrice = document.getElementById("final-price")
    finaPrice.innerText = "You have to pay: " + calPrice()
    renderProd()
    
})


function renderProd() {
    console.log(arrCart)
    const textboxes = document.querySelectorAll('#form input');
    textboxes.forEach(textbox => {
        textbox.value = '';
    });

    const prodSect = document.getElementById("dashboard-section");
    prodSect.innerHTML = "";
    const cartSect = document.getElementById("cart-section");
    // cartSect.innerHTML = "";  // Clear previous content

    arrProducts.forEach(element => {

        const newDiv = document.createElement("div");
        newDiv.classList.add("divProd")
        //checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "checkbox";
        checkbox.value = element._prod_id;
        checkbox.id = element._prod_id;

        newDiv.appendChild(checkbox);
        newDiv.innerHTML += `<img src="${element._prod_img}" alt=""><div class="name"><h3>${element._prod_name}</h3><p>$ ${element._prod_price}</p></div>`;

        prodSect.appendChild(newDiv);
        ///editBtn
        const editBtn = document.createElement("button")
        editBtn.name = "btnEdit"
        editBtn.textContent = "EDIT"
        newDiv.appendChild(editBtn);
        editBtn.addEventListener("click", () => {
            const edit_prod_name = document.getElementById("edit_prod_name")
            const edit_prod_price = document.getElementById("edit_prod_price")
            const edit_prod_img = document.getElementById("edit_prod_img")
            edit_prod_name.value = element._prod_name
            edit_prod_price.value = element._prod_price
            edit_prod_img.value = element._prod_img

            btnUpdate.value = [element.prod_id]
            document.getElementById("form-edit").hidden = false
            renderProd()
        })

        ///delBtn
        const btnDel = document.createElement("button")
        btnDel.del = "btnDel"
        btnDel.innerText = "Delete"
        btnDel.value = element._prod_id
        newDiv.appendChild(btnDel);

        btnDel.addEventListener("click", () => {
            document.getElementById("form-edit").hidden = true
            const delID = btnDel.value
            const findDel = arrProducts.findIndex((element) => {
                return element._prod_id == delID
            })
            arrProducts.length <= 0 ? arrProducts = [] : arrProducts.splice(findDel, 1)

            renderProd();
        })
        ///////// cart section

        cartSect.innerHTML = "";
        arrCart.forEach(element => {

            const findProd = arrProducts.find((e) => {

                return e._prod_id == element

            })

            if (findProd) {
                console.log(findProd)
                const newDiv = document.createElement("div");
                newDiv.classList.add("divProd")
                newDiv.innerHTML += `<img src="${findProd._prod_img}" alt=""><div class="name"><h3>${findProd._prod_name}</h3><p>$ ${findProd._prod_price}</p></div>`;

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

    // console.log(arrProducts, arrProducts.length)
    // console.log(arrCart, arrCart.length)
}