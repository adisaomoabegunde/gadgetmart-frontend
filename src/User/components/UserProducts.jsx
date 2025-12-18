import Center from "./Center";
import Header from "./Header";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { getAllGadgets } from "../../components/Gadgets";
import { Link } from "react-router-dom";
import Button from "./Button";
import { CartContext } from "./CartContext";
import { useLoading } from "../LoadingContext";

const H1 = styled.h1`
  font-size: 1.5em;
  margin: 10px;
  font-weight: bold;
  color: #000;
`;
const ProductWrapperr = styled.div`

`;
const ProductGrid = styled.div`
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
const WhiteBoxx = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 180px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
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
const Titlee = styled(Link)`
    font-weight: normal;
    font-size: 0.9rem;
    margin:0;
`;
const ProductInfoBoxx = styled.div`
    margin-top : 5px;
`;
const PriceRoww = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;
const Pricee = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

function UserProducts(){
     const [gadgets, setGadgets] = useState([]);
     const {setLoading} = useLoading();
    
        useEffect(()=> {
              setLoading(true);

            getAllGadgets().then((data)=> {
                setGadgets(data);
                  setLoading(false);
            })
            .catch(console.error);
        }, []);
       

         const {setCartProducts} = useContext(CartContext);
            function addToCart(product){
                setCartProducts(prev => [...prev, product])
        
            }
           
    return(
        <>
            <Header/>
            <Center>
                <H1>All Products</H1>
                <ProductGrid>
                        {gadgets.map(g => (
                            <ProductWrapperr>
                                <WhiteBoxx to={`product/ProductDetail/`+g.gadgetId} > 
                                    <div> 
                                    <img src={g.imageUrls[0]} alt={g.brand} />

                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
                                    
                                    </WhiteBoxx>
                                    <ProductInfoBoxx>
                                        <Titlee to={`product/ProductDetail/`+g.gadgetId} > {g.brand} </Titlee>
                                        <PriceRoww>
                                            <Pricee>
                                            &#x20A6;{g.price}
                                        </Pricee>
                                            
                                            <Button onClick={() => addToCart(g.gadgetId)} primary outline > Add to cart </Button>
                                            
                                        </PriceRoww>
                                        
                                    </ProductInfoBoxx>
                                
                            </ProductWrapperr>
                        
                        ))}
                </ProductGrid>
            </Center>
            
        </>
    )
}
export default UserProducts;