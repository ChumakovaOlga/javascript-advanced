class ProductList {
  #goods;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this._allProducts = [];

    this._fetchGoods();
    this.#render();
  }

  _fetchGoods() {
    this.#goods = [
      {id: 1, title: 'Notebook', price: 20000, img: "img/notebook.jpg"},
      {id: 2, title: 'Mouse', price: 1500, img: "img/mouse.jpg"},
      {id: 3, title: 'Keyboard', price: 5000, img: "img/keyboard.jpg"},
      {id: 4, title: 'Gamepad', price: 4500, img: "img/gamepad.jpg"},
    ];
  }

  totalProductPrice() {
    let totalPrice = document.getElementById('total-price');
    let sum = 0;
    this.#goods.forEach (product => {
        sum += product.price
    });
    console.log("Sum: " + sum);
    totalPrice.innerText = `Итого  ${sum} рублей`;
}

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product, product.img);

      this._allProducts.push(productObject);

      block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
    }
  }
}

class Cart {
    constructor () {
      this.cartItems = [];
    }
    //метод добавления товара в корзину
    addCartItem(product) {
        this.cartItems.push(product);
    }

    removeCartItem(product) {
      this.cartItems.splice(product);
    }

    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
        // let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.cartItems.forEach (product => {
            sum += product.price
        });
        // totalPrice.innerText = `Итого  ${sum} рублей`;
        alert("Total sum: " + sum);
    }
}

class ProductItem {
  constructor(product, img = 'https:placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  getGoodHTML() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="photo">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
            </div>`;
  }
}

class CartItem {
  constructor(product) {
    this.product = product;
  }

  getGoodHTML() { //метод для создания элементов в корзине
  }
}

const list = new ProductList();
const cart = new Cart();
let calculateButton = document.getElementById("calculate-button");
calculateButton.addEventListener("click", function() {
  console.log("click");
  list.totalProductPrice();
})






// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);
