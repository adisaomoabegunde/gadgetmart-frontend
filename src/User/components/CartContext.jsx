import { createContext, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export const CartContext = createContext({});

export function CartContextProvider({children}){
    const ls = typeof window !== "undefined" ? window.localStorage : null;


    const storedUser = ls?.getItem("userr");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const cartkey = storedUser ? `cart_${storedUser}` : null;

    const [cartProducts,setCartProducts] = useState([]);

    useEffect(()=>{
        if(cartProducts?.length > 0){
            ls?.setItem(cartkey, JSON.stringify(cartProducts));
        }

    }, [cartProducts]);
   

    useEffect(()=>{
        if(ls && ls.getItem(cartkey)){
            setCartProducts(JSON.parse(ls.getItem(cartkey)));
        }
    }, [])

    function addProduct(gadgetId){
        setCartProducts(prev => [...prev,gadgetId]);

    }
    // function removeProduct(gadgetId){
    //     setCartProducts(prev => {
    //         const pos = prev.indexOf(gadgetId);
    //         if(pos !== -1){
    //            return prev.filter((value,index) => index !== pos);
    //         }
    //         return prev;
    //     });
        function removeProduct(gadgetId) {
        setCartProducts(prev => {
            const pos = prev.indexOf(gadgetId);
            if (pos === -1) return prev;

            const updated = prev.filter((_, index) => index !== pos);
            localStorage.setItem(cartkey, JSON.stringify(updated));
            return updated;
        });
    
    }
    return(
        <CartContext.Provider value={{cartProducts, setCartProducts,addProduct,removeProduct}}>
            {children}
        </CartContext.Provider>
    );
}