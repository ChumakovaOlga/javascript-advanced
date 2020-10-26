const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};

// –--------------------------------

class ProductList {
  #goods;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this._allProducts = [];

    // this._fetchGoods();
    this.#getProducts().then((data) => {
      this.#goods = [...data];
      // this.#goods = Array.from(data);
      this.#render();
    });

    console.log(this.sum());
  }

  // _fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     console.log(this.#goods);
  //   });
  // }

  #getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(response => response.json())
        .catch((error) => {
          console.log(error);
        });
  }

  sum() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
    }
    for (let item of document.getElementsByClassName("product-item")){
      item.querySelector(".buy-btn").addEventListener("click", function() {
        fetch(`${API}/addToBasket.json`)
            .then(response => response.json())
            .catch((error) => {
              console.log(error);
            });
      })
    }
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  getGoodHTML() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
            </div>`;
  }
}

class Cart {
  #cartItems;

  constructor (container = '.cart-items') {
    this.container = container;
    this.#cartItems = [];
    this.getItemsList().then((data) => {
      this.#cartItems = [...data.contents];
      this.#renderCart();
    });
  }
  //метод добавления товара в корзину
  addCartItem(product) {
    return fetch(`${API}/addToBasket.json`)
        .then(response => response.json())
        .catch((error) => {
          console.log(error);
        });
    //this.cartItems.push(product);
  }

  removeCartItem(product) {
    return fetch(`${API}/deleteFromBasket.json`)
        .then(response => response.json())
        .catch((error) => {
          console.log(error);
        });
    //this.cartItems.splice(product);
  }

  getItemsList() {
    return fetch(`${API}/getBasket.json`)
        .then(response => response.json())
        .catch((error) => {
          console.log(error);
        });
    //return this.cartItems;
  }

  #renderCart() {
    const block = document.querySelector(this.container);
    block.innerHTML = "";
    const modal = document.getElementById("cart-modal-container");
    modal.style.display = "block";
    for (let product of this.#cartItems) {
      const cartItemObject = new CartItem(product);
      block.insertAdjacentHTML('beforeend', cartItemObject.getGoodHTML());
    }
    for (let cartItem of document.querySelectorAll(".cart-item")){
      cartItem.querySelector(".cart-remove-btn").addEventListener("click", this.removeCartItem)
    }

  }

    // //Метод для вывода итоговой суммы корзины
    // totalCartPrice() {
    //   // let totalPrice = document.getElementById('goods-list__total');
    //   let sum = 0;
    //   this.cartItems.forEach (product => {
    //     sum += product.price
    //   });
    //   // totalPrice.innerText = `Итого  ${sum} рублей`;
    //   alert("Total sum: " + sum);
}
//
//
class CartItem {
  constructor(product) {
    this.product = product;
  }

  getGoodHTML() { //метод для создания элементов в корзине
    return `<div class="cart-item">
                  <h3>${this.product.product_name}</h3>
                  <p>${this.product.price} \u20bd</p>
                  <button class="cart-remove-btn">Удалить</button>
              </div>`;
  }
}

const list = new ProductList();
let cart;
let cartButton = document.getElementById("cart-button");

  cartButton.addEventListener("click", function() {
  cart = new Cart();
  let closeCartButton = document.querySelector(".cart-close-btn");
  closeCartButton.addEventListener("click", function() {
    document.getElementById("cart-modal-container").style.display = "none";
  })
})

