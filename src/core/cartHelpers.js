// work with local storage
export const addItem = (item = [], count = 0, next = (f) => f) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        // add an item into cart => if adding an item that have already been in the cart => cause duplication
        cart.push({
            ...item,
            count: 1,
        });

        // => therefore, need to remove duplicated items by building an Array from new Set and turn it back into array so that later we can re-map it:
        // new Set: only allow unique values in it => therefore, pass/ add the ids of the items in cart in to new Set => result will a collection with unique ids
        // then use Array.from to covert the collection of unique ids back into array of unique ids
        // the loop through the new array using map and return the actual product from the cart. Using find to return the first matched product per unique id of the new array from cart array.
        cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
            return cart.find((p) => p._id === id);
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

export const itemTotal = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0;
};

export const getCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
};

export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const removeItem = (productId) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
        next();
    }
};
