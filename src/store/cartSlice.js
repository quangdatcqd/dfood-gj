// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const calcuTotalPriceCart = (dishes) => {

    let totalPrice = dishes?.reduce((total, item) => {
        // var totalPriceOps = 0;
        // item.variants?.forEach((variant) => {
        //     totalPriceOps += variant?.price
        // })  
        return total + item?.price * item.quantity;// + totalPriceOps
    }, 0)

    return totalPrice;
}
var cartStore = localStorage.getItem("cart");
cartStore = cartStore ? JSON.parse(cartStore) : [];
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        CartList: cartStore
    },
    reducers: {

        addDishesToCart: (state, action) => {
            const cartIndex = state.CartList?.findIndex(cart => cart?.resData?.resId === action.payload?.resData?.resId);
            if (cartIndex >= 0) {
                let Cart = state.CartList[cartIndex];
                const index = Cart.dishes?.findIndex(item => {
                    const prev = { ...item };
                    const next = { ...action.payload.dishes };
                    delete prev.quantity;
                    delete next.quantity;
                    return JSON.stringify(prev) == JSON.stringify(next)
                });
                if (index >= 0) {
                    Cart.dishes[index] = { ...Cart.dishes[index], quantity: Cart.dishes[index].quantity + action.payload.dishes.quantity };
                } else {
                    Cart.dishes = [...Cart.dishes, action.payload.dishes];
                }

                const totalPrice = calcuTotalPriceCart(Cart.dishes);

                state.CartList[cartIndex] = {
                    dishes: Cart.dishes,
                    totalPrice: totalPrice,
                    resData: action.payload.resData
                }

            } else {
                let Cart = {
                    dishes: [action.payload.dishes],
                    totalPrice: 0,
                    resData: action.payload.resData
                }

                const totalPrice = calcuTotalPriceCart(Cart.dishes);
                state.CartList = [
                    ...state?.CartList,
                    {
                        ...Cart,
                        totalPrice: totalPrice
                    }
                ]

            }
            localStorage.setItem("cart", JSON.stringify(state.CartList))

        },
        deCreaseQty: (state, action) => {
            const cartIndex = state.CartList?.findIndex(cart => cart?.resData?.resId === action.payload?.idRestaurant);
            let Cart = state.CartList[cartIndex];
            const dishIndex = action.payload.index;
            const currentQty = Cart.dishes[dishIndex].quantity;

            if (currentQty <= 1) {
                state.CartList[cartIndex].dishes?.splice(dishIndex, 1);
            } else {
                Cart.dishes[dishIndex] = { ...Cart.dishes[dishIndex], quantity: currentQty - 1 }
            }
            const totalPrice = calcuTotalPriceCart(Cart.dishes)
            state.CartList[cartIndex] = { ...Cart, totalPrice: totalPrice };
            localStorage.setItem("cart", JSON.stringify(state.CartList))
        },
        inCreaseQty: (state, action) => {
            const cartIndex = state.CartList?.findIndex(cart => cart?.resData?.resId === action.payload?.idRestaurant);
            let Cart = state.CartList[cartIndex];
            const dishIndex = action.payload.index;
            const currentQty = Cart.dishes[dishIndex].quantity;

            Cart.dishes[dishIndex] = { ...Cart.dishes[dishIndex], quantity: currentQty + 1 }
            const totalPrice = calcuTotalPriceCart(Cart.dishes)
            state.CartList[cartIndex] = { ...Cart, totalPrice: totalPrice };
            localStorage.setItem("cart", JSON.stringify(state.CartList))
        },
        removeCart: (state, action) => {
            // const cartIndex = state.CartList?.findIndex(cart => cart?.resData?.resId === action.payload?.idRestaurant);
            state.CartList?.splice(action?.payload, 1);
            localStorage.setItem("cart", JSON.stringify(state.CartList))
        },
        clearCart: (state, action) => {
            state.CartList = [];
            localStorage.setItem("cart", JSON.stringify(state.CartList))
        },

    },
});

export const { addDishesToCart, inCreaseQty, deCreaseQty, clearCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
