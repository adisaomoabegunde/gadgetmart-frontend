import Header from "./Header";
import { CartContext, CartContextProvider } from "./CartContext";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import { getGadgetById } from "../../components/Gadgets";
import { useParams } from "react-router-dom";
import Table from "./Table";
import Input from "./Input";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color : #fff;
    border-radius: 10px;
    padding: 30px;
`;
const ProductInfoCell = styled.td`
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, .1);
`;
const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding:5px;
    border: 1px solid rgba(0,0,0, .1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 80px;
        max-height: 80px;
    }
`;
const QuantityLabel = styled.span`
    padding: 0 3px;
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;
function CartPage(){
     const {cartProducts, addProduct, removeProduct} = useContext(CartContext);
    //  const {id} = useParams();
     const [gadgets, setGadget] = useState([]);
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [city, setCity] = useState('');
     const [postalCode, setPostalCode] = useState('');
     const [streetAddress, setStreetAddress] = useState('');
     const [country, setCountry] = useState('');
    useEffect(()=>{
        if(!cartProducts || cartProducts.length === 0){
            setGadget([]);
            return;
        }
        async function loadItems() {
            try{
                const items = [];
                for(const id of cartProducts){
                    console.log("Fetching gadget ID:", id);

                    const data = await getGadgetById(id);
                    console.log("API response for", id, data)
                    items.push(data);
                }
                setGadget(items);
            }catch(error){
                console.error("Error loading cart items:", error);
            }
        }
        loadItems();
    }, [cartProducts]);
    console.log("cart products:", cartProducts);
    const uniqueIds = [...new Set(cartProducts.map(id => id))];
    function moreOfThisProducts(id){
        addProduct(id);
    }
    function lessOfThisProduct(id){
        removeProduct(id);
    }
    let total = 0;
    for(const id of cartProducts){
        const price = gadgets.find(g => g.gadgetId === id)?.price || 0;
        total += price;
    }
    return(
        <CartContextProvider>
                <Header />
                <Center>
                    <ColumnsWrapper>
                            <Box>
                                    <h2>Cart</h2>

                                {!cartProducts?.length  &&  (
                                    <div>Your cart is empty</div>
                                )}
                                 {cartProducts?.length > 0 && (
                                         <Table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                        <tbody> 
                                            {uniqueIds.map(id => {
                                                const g = gadgets.find(item => item.gadgetId === id);
                                                const quantity = cartProducts.filter(x => x === id).length;

                                                if(!g) return null;
                                                return(
                                                    <tr key={id}>
                                                        <ProductInfoCell>
                                                            <ProductImageBox>
                                                                <img src={g.imageUrls[0]} alt={g.brand} />
                                                             </ProductImageBox>
                                                            {g.brand} 
                                                            
                                                        </ProductInfoCell>
                                                        <td>
                                                            <Button onClick={()=> lessOfThisProduct(id)}>-</Button>
                                                            <QuantityLabel>
                                                                {quantity}
                                                            </QuantityLabel>
                                                            
                                                            <Button onClick={()=> moreOfThisProducts(id)}>+</Button>
                                                        </td>
                                                        <td>
                                                            &#x20A6;{quantity * g.price}
                                                        </td>
                                                    </tr>
                                                );
                                            })} 
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>&#x20A6;{total}</td>
                                                </tr>
                                        </tbody>
                                   
                                </Table>
                                 )}

                                
                                 
                            </Box> 

                            {!!cartProducts?.length && (
                                 <Box>
                                    <h2>Order Information</h2>
                                    <Input type="text" placeholder="Name" />
                                    <Input type="text" placeholder="Email" />
                                    <CityHolder>
                                        <Input type="text" placeholder="City" />
                                        <Input type="text" placeholder="Postal Code" />
                                    </CityHolder>
                                    <Input type="text" placeholder="Postal Code" />
                                    <Input type="text" placeholder="Country" />
                                    <Button black block >Continue to payment</Button>
                                </Box>
                                )}
                           
                    </ColumnsWrapper>
                </Center>
               
           
        </CartContextProvider>
        
        
    );
}
export default CartPage;