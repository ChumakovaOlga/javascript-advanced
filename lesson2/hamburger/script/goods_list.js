let btnBasket = document.getElementById('basket-btn');
let goodsListSection = document.getElementById('goods-list-section');

//Создаем класс для товара.
class GoodsItem {
    constructor (title, price, src) {
        this.title = title;
        this.price = price;
        this.src = src;
    }
    //метод возвращает html-разметку отрисовка корзины
    render () {
        return `<div class="goods-list__product-box">
        <span class="goods-list__product-box__name">${this.title}</span>
        <div class="goods-list__product-box__price">${this.price}\u20bd</div>
        <img class="goods-list__product-box__img" src=${this.src} height="100px" alt="">
        <input type="submit" value="X" class="goods-list-item__product-box__delete" onclick="deleteProductStringBasket()">
        </div>`
    }
}

//Создаем класс для списка товаров GoodsList
class GoodsList {
    constructor () {
        this.goods = [];
    }
     //метод для заполнения списка goods.
    fetchGoods () {
        this.goods = [
            { title : 'Булочка', price : 20, src : 'image/bun.jpg' },
            { title : 'Котлета', price : 60, src : 'image/hamburger.jpg' },
            { title : 'Соленые огурчики', price : 10, src : 'image/pickles.jpeg' },
            { title : 'Соус', price : 10, src : 'image/ketchup.jpeg' },
            { title : 'Сыр', price : 10, src : 'image/cheese.jpg' },
            { title : 'Салат', price : 20, src : 'image/salad.jpeg' },
            { title : 'Картофель', price : 15, src : 'image/potato.jpeg' },
            { title : 'Специи', price : 15, src : 'image/spices.jpeg' },
            { title : 'Майонез', price : 20, src : 'image/mayonnaise.jpeg' }
        ];
    }


}

//Создаем класс корзина Cart
class Cart {
    constructor () {
        this.goods = [];
    }
    //метод добавления товара в корзину
    addCartItem(cartItem) {
        this.goods.push(cartItem);
    }

    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total'); 
        let sum = 0;
        this.goods.forEach (good => { 
            sum += good.price
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    render() {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list__product-box'); 
        
        this.goods.forEach (good => {
            const goodItem = new GoodsItem (good.title, good.price, good.src);
            listHtml += goodItem.render();
        });
        goodsList.innerHTML = listHtml;
    }
}

let renderCart = () => {
    const list =  new GoodsList ();
    const cart = new Cart();

    list.fetchGoods();
    cart.addCartItem(list.goods[0]);
    cart.addCartItem(list.goods[1]);
    cart.addCartItem(list.goods[2]);
    cart.addCartItem(list.goods[3]);
    cart.addCartItem(list.goods[4]);
    cart.addCartItem(list.goods[5]);
    cart.addCartItem(list.goods[6]);
    cart.addCartItem(list.goods[7]);
    cart.addCartItem(list.goods[8]);
   
    cart.render();

    cart.totalCartPrice();
    goodsListSection.style.display = 'block';
};

btnBasket.addEventListener('click', renderCart);
window.addEventListener('click', function (evt) {console.log(evt)});