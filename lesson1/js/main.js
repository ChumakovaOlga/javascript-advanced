const products = [
  {id: 1, title: 'Notebook', price: 20000, img: "img/notebook.jpg"},
  {id: 2, title: 'Mouse', price: 1500, img: "img/mouse.jpg"},
  {id: 3, title: 'Keyboard', price: 5000, img: "img/keyboard.jpg"},
  {id: 4, title: 'Gamepad', price: 4500, img: "img/gamepad.jpg"},
];

const renderProduct = (title = 'Title', price = 100, img = '') => {
  return `<div class="product-item">
            <img src="${img}" alt="photo">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`;
};

const renderProducts = (list) => {
  const productList = list.map(item => renderProduct(item.title, item.price, item.img));
  console.log(productList);
  document.querySelector('.products').innerHTML = productList.join("");
};

renderProducts(products);
