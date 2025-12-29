import { useContext, useEffect, useRef, useState } from "react";
import { getAllGadgets } from "../../components/Gadgets";
import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useLoading } from "../LoadingContext";
import toast from "react-hot-toast";

const ProductWrapper = styled.div`

`;

const ProductsGrid = styled.div`
   display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin: 0 10px;
          @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    margin: 0 ;

          }
   
`;
const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 180px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: relative;
    img{
        max-width: 100%;
        max-height: 150px;
    }
    svg{
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 3;
    }
`;
const Title = styled(Link)`
    font-weight: normal;
    font-size: 0.9rem;
    margin:0;
`;
const ProductInfoBox = styled.div`
    margin-top : 5px;
`;
const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
    
`;
const Price = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const Header = styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px ;
`;

function NewProducts(){
     const [gadgets, setGadgets] = useState([]);


     const {setLoading} = useLoading();

    useEffect(()=> {
          setLoading(true);
        getAllGadgets().then((data)=> {

            const limited = data.slice(-9);
            setGadgets(limited);
             setLoading(false);
        })
        .catch(console.error);
    }, []);
    

    const {setCartProducts} = useContext(CartContext);
    function addToCart(product){
        setCartProducts(prev => [...prev, product])
        toast.success("Added to cart");

    }

    


    return(
      <Center>
      <Header>New Arrivals</Header>
         <ProductsGrid>
                  {gadgets.map(g => (
                    <ProductWrapper>
                           <WhiteBox to={`products/product/ProductDetail/`+g.gadgetId} > 
                           

                            <div> 
                             <img src={g.imageUrls[0]} alt={g.brand} />

                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
                            
                            </WhiteBox>
                            <ProductInfoBox>
                                 <Title to={`products/product/ProductDetail/`+g.gadgetId} > {g.brand} </Title>
                                 <PriceRow>
                                    <Price>
                                      &#x20A6;{g.price}
                                   </Price>
                                    
                                     <Button ref={cartRef} onClick={() =>  addToCart(g.gadgetId)} primary outline > Add to cart </Button>
                                    
                                 </PriceRow>
                                
                            </ProductInfoBox>
                           
                    </ProductWrapper>
                
                ))}
         </ProductsGrid>
      </Center>
    )
}
export default NewProducts;