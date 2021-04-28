let APP_LOG_LIFECYCLE_EVENTS = false;

let webstore = new Vue({
    el: '#app',
    data: {
        showProduct: true,
        sitename: "Pet Shop",
        products: {},
        states: {
            AL: 'Alabama',
            AK: 'Alaska',
            AR: 'Arizona',
            CA: 'California',
            NV: 'Nevada'
        },
        order: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zip: '',
            state: '',
            method: 'Home Address',
            business: 'Business Address',
            home: 'Home Address',
            gift:'Send As A Gift',
            sendGift: 'Send As A Gift',
            dontSendGift: 'Do Not Send As A Gift'
        },
        cart: []
    },
    methods: {
        addToCart(product) {
            this.cart.push( product.id );
        },
        showCheckout() {
            this.showProduct = !this.showProduct;
        },
        submitForm() {
            alert('Submitted');
        },
        checkRating(n, currProduct) {
            return currProduct.rating - n >= 0;
        },
        canAddToCart(aProduct) {
            //return this.product.availableInventory > this.cartItemCount;
            return aProduct.availableInventory > this.cartCount(aProduct.id);
        },
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        }
    },
    computed: {
        cartItemCount() {
            return this.cart.length || '';
        }
        /*
        sortedProducts() {
            if (this.products.length > 0) {
                let productsArray = this.products.slice(0);
                console.log(productsArray);
                console.log(this.products);
                function compare(a, b) {
                    if (a.title.toLowerCase() < b.title.toLowerCase())
                        return -1;
                    if (a.title.toLowerCase() > b.title.toLowerCase())
                        return 1;
                    return 0;
                }
                return productsArray.sort(compare);
            }

        }*/
    },
    filters: {
        formatPrice: function (price) {
            if (!parseInt(price)) { return ""; }
            if (price > 99999) {
                let priceString = (price / 100).toFixed(2);
                let priceArray = priceString.split("").reverse();
                let index = 3;
                while (priceArray.length > index + 3) {
                    priceArray.splice(index + 3, 0, ",");
                    index += 4;
                }
                return "$" + priceArray.reverse().join("");
            }else{
                return "$" + (price / 100).toFixed(2);
            }
        }
    },
    beforeCreate: function() {
        if (APP_LOG_LIFECYCLE_EVENTS) {
            console.log("beforeCreate");
        }
    },
    created: function() {
        if (APP_LOG_LIFECYCLE_EVENTS) {
            console.log("created");
        }
        axios.get('./products.json').then((response) =>{
            this.products=response.data.products;
            console.log(this.products);
        })
    },
    beforeMount: function() {
        if (APP_LOG_LIFECYCLE_EVENTS) {
            console.log("beforeMount");
        }
    },
    mounted: function() {
        if (APP_LOG_LIFECYCLE_EVENTS) {
            console.log("mounted");
        }
    },
    beforeUpdate: function() {
        if (APP_LOG_LIFECYCLE_EVENTS) {
            console.log("beforeUpdate");
        }
    },
    updated: function() {
        if (APP_LOG_LIFECYCLE_EVENTS) {
            console.log("updated");
        }
    },
    beforeDestroy: function() {
        if (APP_LOG_LIFECYCLE_EVENTS) {
            console.log("beforeDestroy ");
        }
    },
    destroyed: function() {
        if (APP_LOG_LIFECYCLE_EVENTS) {
            console.log("destroyed");
        }
    }
});