import { CartContextProvider } from "./CartContext";
import Feartured from "./Featured";
import Header from "./Header";
import NewProducts from "./NewProducts";

function HomePage(){
    return (
        <div>
            <CartContextProvider>
                
                   <Header/>
                   <Feartured />
                   <NewProducts />
            </CartContextProvider>
         
        </div>
    )
}
export default HomePage;