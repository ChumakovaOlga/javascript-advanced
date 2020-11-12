Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            requred: true
        }
    },
    template: `
        <ul>
        <li v-for="detail in details">{{detail}}</li>
        </ul>
        `
})

var eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            requred: true
        }
    },
    template: `
  <div class="product">
       <div class="product-image">
         <img :src="image" :alt="image"/>
       </div>

     <div class="product-info">
              <h1>{{title}}</h1>
              <p>{{description}}</p>
         <a v-bind:href="link" target="_blank">More products like this</a>
                    
                          <!--   <p v-if="inventory > 10">In stock</p>
                             <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>-->

         <p v-if="inStock">In stock</p>
                         <!-- <p v-show="inStock">In stock</p>-->
         <p v-else :class="{ outOfStock: !inStock}">Out of stock</p>
         <p>{{sale}}</p>
         
       <!--  <p>Shipping: {{ shipping }}</p>-->
        <info-tabs :shipping="shipping" :details="details"></info-tabs>
         <product-details :detail="details"></product-details>
         
         <ul >
             <li v-for="size in sizes">{{ size }}</li>
         </ul>

         <div   class="color-box"
                v-for="(variant, index) in variants"
                :key="variant.variantId"
                :style="{ backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(index)">
         </div>

           <!--  <button v-on:click="cart += 1">Add to Cart</button>-->

                 <button v-on:click="addToCart"
                 :disabled="!inStock"
                 :class="{ disabledButton: !inStock}">Add to Cart</button>
                 
                 <button @click="removeFromCart">Delete</button>   
               
     </div>
     
                 <product-tabs :reviews="reviews"></product-tabs>
          
     
  </div>
    `,
    data() {
        return {
            brand: 'Great',
            product: 'Socks',
            description: 'The best socks ever!',
            selectedVariant: 0,
            // image:  'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
            //'images/vmSocks-green-onWhite.jpg', // моя папка

            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',

            //inventory: 100
            onSale: true,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                //'images/vmSocks-green-onWhite.jpg'
                variantQuantity:10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                // 'images/vmSocks-blue-onWhite.jpg'
                variantQuantity:0
            }
        ],

            sizes: ['S','M','L','XL','XXL','XXXL'],
            reviews: []
        }
    },
    methods: {
        addToCart () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart (){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct (index) {
            this.selectedVariant = index
        }

    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale'
            }
            return this.brand + ' ' + this.product + ' are not on sale'
        },
        shipping() {
            if(this.premium) {
                return "Free"
            }
            return 2.99
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    template: `
     <form class="review-form" @submit.prevent="onSubmit">
     <p class="error"  v-if="errors.length">
     <b>Please correct the following error(s):</b>
     <ul>
     <li v-for="error in errors">{{ error }}</li>
</ul>
     </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      
      <p>Would you recommend this product?</p>  
      <label>
      yes
      <input type="radio" value="Yes" v-model="recommend"/>
      </label> 
          <label>
          no
          <input type="radio" value="No" v-model="recommend"/>
          </label> 
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            }
            else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommendation required.")
            }

        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
    <div>
    <ul>
    <span class="tab"
    :class="{ activeTab: selectedTab === tab}" 
    v-for="(tab, index) in tabs" 
    :key="index"
    @click="selectedTab = tab"
    >{{ tab }}</span>
    </ul>
    
            <div v-show="selectedTab === 'Reviews'">
               <!--  <h2>Reviews</h2>-->
                 <p v-if="!reviews.length">There are no reviews yet.</p>
                 <ul v-else>
                   <li v-for="(review, index) in reviews" :key="index">
                     <p>{{ review.name }}</p>
                     <p>Ratind:{{ review.rating }}</p>
                     <p>{{ review.review }}</p>
                   </li>
                 </ul>
            </div>
            <div  v-show="selectedTab === 'Make a Review'">
                 <product-review 
                 ></product-review>
            </div>
    </div>
    
    
    `,
    data() {
        return {
            tabs: ['Reviews',' ', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})
Vue.component('info-tabs', {
    props: {
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
      <div>
      
        <ul>
          <span class="tabs" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
          >{{ tab }}</span>
        </ul>

        <div v-show="selectedTab === 'Shipping'">
          <p>{{ shipping }}</p>
        </div>

        <div v-show="selectedTab === 'Details'">
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
        </div>
    
      </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }
    }
})



var app = new Vue({
    el: '#app',
    data: {
        premium:true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0;i--) {
                if (this.cart[i]  === id) {
                    this.cart.splice(i, 1)
                }
            }
        }
    }

})