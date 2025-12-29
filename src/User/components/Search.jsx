import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllGadgets } from "../../components/Gadgets";
import Header from "./Header";
import Center from "./Center";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";



const H2 = styled.h1`
  font-size: 1.2em;
  margin: 10px;
  font-weight: bold;
  color: #000;
`;
const ProductWrapperrr = styled.div`

`;
const ProductGridd = styled.div`
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
const WhiteBoxxx = styled(Link)`
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
const Titleee = styled(Link)`
    font-weight: normal;
    font-size: 0.9rem;
    margin:0;
`;
const ProductInfoBoxxx = styled.div`
    margin-top : 5px;
`;
const PriceRowww = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;
const Priceee = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;


export default function Search(){
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [gadgets, setGadgets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        setLoading(true);

        getAllGadgets()
        .then((data) => {
            setGadgets(data || []);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const results = gadgets.filter((g) => 
        g.brand?.toLowerCase().includes(query.toLowerCase()) ||
        g.category?.toLowerCase().includes(query.toLowerCase())
    );

    
             const {setCartProducts} = useContext(CartContext);
                function addToCart(product){
                    setCartProducts(prev => [...prev, product])
                     toast.success("Added to cart"); 
                }
               
    return(
        <>
            <Header />
            <Center>
                <H2 className="mb-4 text-sm text-gray-600">
                    Search results for <b>{query}</b>
                </H2>

                {loading && (
                    <div className="flex justify-center mt-10">
                        <div className="w-8 h-8 border-4 border-border-black border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {!loading && results.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">No products found</p>
                )}
                <ProductGridd>
                        {results.map(g => (
                            <ProductWrapperrr>
                                <WhiteBoxxx to={`/user/products/product/ProductDetail/${g.gadgetId}`} > 
                                    <div> 
                                    <img src={g.imageUrls[0]} alt={g.brand} />

                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
                                    
                                    </WhiteBoxxx>
                                    <ProductInfoBoxxx>
                                        <Titleee to={`/user/products/product/ProductDetail/${g.gadgetId}`} > {g.brand} </Titleee>
                                        <PriceRowww>
                                            <Priceee>
                                            &#x20A6;{g.price}
                                        </Priceee>
                                            
                                            <Button onClick={() => addToCart(g.gadgetId)} primary outline > Add to cart </Button>
                                            
                                        </PriceRowww>
                                        
                                    </ProductInfoBoxxx>
                                
                            </ProductWrapperrr>
                        
                        ))}
                </ProductGridd>

            </Center>
        </>
    )

}