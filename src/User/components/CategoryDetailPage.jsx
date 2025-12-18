// CategoryDetailPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import { getCategoryById } from "../../components/Gadgets";
import Center from "./Center";
import { CartContext } from "./CartContext";

const Page = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const H11 = styled.h1`
  font-size: 1.5em;
  margin: 10px;
  font-weight: bold;
  color: #000;
`;
const ProductWrapperrrrrrr = styled.div`

`;
const ProductGridddddd = styled.div`
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
const WhiteBoxxxxxxx = styled(Link)`
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
const Titleeeee = styled(Link)`
    font-weight: normal;
    font-size: 0.9rem;
    margin:0;
`;
const ProductInfoBoxxxxxxx = styled.div`
    margin-top : 5px;
`;
const PriceRowwwwww = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;
const Priceeeeee = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAA" +
  "AAC0lEQVR42mP8/x8AAwMCAK2f9R0AAAAASUVORK5CYII=";

export default function CategoryDetailPage() {
    const {id} = useParams();
    const [category, setCategory] = useState("");

    useEffect(()=>{
        getCategoryById(id)
        .then(setCategory)
        .catch((err)=> console.error(err));

    }, [id]);

    if(!category){
        return(
           <>
            <Header />
            <Center>
                <p>Loading Category details...</p>

            </Center>
           </>
           
        );
    }
 
    const {setCartProducts} = useContext(CartContext);
            function addToCart(product){
                setCartProducts(prev => [...prev, product])
        
            }



  return (
    <>
      <Header />
     <Center>
         <Page>
        <H11>Category {category.categoryName}</H11>
      

        {category.gadgets && category.gadgets.length > 0 ? (
               
                    <ProductGridddddd>
                        {category.gadgets.map((g)=> (
                             <ProductWrapperrrrrrr>
                                <WhiteBoxxxxxxx to={`/user/products/product/ProductDetail/`+g.gadgetId} > 
                                    <div> 
                                    <img src={g.imageUrls[0]} alt={g.brand} />

                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
                                    
                                    </WhiteBoxxxxxxx>
                                    <ProductInfoBoxxxxxxx>
                                        <Titleeeee to={`/user/products/product/ProductDetail/`+g.gadgetId} > {g.brand} </Titleeeee>
                                        <PriceRowwwwww>
                                            <Priceeeeee>
                                            &#x20A6;{g.price}
                                        </Priceeeeee>
                                            
                                            <Button onClick={() => addToCart(g.gadgetId)} primary outline > Add to cart </Button>
                                            
                                        </PriceRowwwwww>
                                        
                                    </ProductInfoBoxxxxxxx>
                                
                            </ProductWrapperrrrrrr>
                        ))}
                    </ProductGridddddd>
             
            ) : (
                <p>No gadgets in this category yet.</p>
            )}

     
             

          
      </Page>
     </Center>
    </>
  );
}