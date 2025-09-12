import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];

    getTotalItems: () => number;
    addProductToCart: (product: CartProduct) => void;
    //updateProductQuantity
    //removeProduct
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            //Methods
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce(( total, items ) => total + items.quantity, 0);
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
                console.log(cart)

                //1. Revisar si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some(item => item.id === product.id && item.size === product.size);
                if( !productInCart ) {
                    set({
                        cart: [
                            ...cart,
                            product
                        ]
                    })
                    return;
                }

                //2. Se que el producto existe por talla... tengo que incrementar
                const updateCartProducts = cart.map(item => {
                    if(item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                    }
                    return item;
                })

                set({ cart: updateCartProducts })
            }
        })

        , {
            name: 'shopping-cart'
        }
    )
)