import { useEffect, useState, useContext } from "react";
import Center from "../Center";
import Header from "../Header";
import styled from "styled-components";
import { getGadgetById } from "../../../components/Gadgets";
import { useParams } from "react-router-dom";
import Button from "../Button";
import CartIcon from "../icons/CartIcon";
import { CartContext } from "../CartContext";
import AddReview from "../AddReview";
import ReviewsList from "../ReviewsList";


const H1 = styled.h1`
  font-size: 1.5em;
  margin: 10px;
  font-weight: bold;
  color: #000;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns:  1fr;
          @media screen and (min-width: 768px){
    grid-template-columns: .8fr 1.2fr;
    margin: 40px 0;

}
    gap: 40px;
    margin: 40px 10px;
`;
const Boxx = styled.div`
  background-color : #fff;
  border-radius: 10px;
  padding: 30px;
`;
const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
   
`;
const Image = styled.img`
    max-width:100%;
    max-height: 100%;
    
`;
const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 15px;
`;
const ImageButton = styled.div`
    border: 2px solid #ccc;

    ${props => props.active ? 'border-color: #ccc;' : 'border-color: transparent; '}

    height: 50px;
    padding: 5px;
    cursor: pointer;
    border-radius:5px;
    
`;
const BigImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
`;
const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;
const Price = styled.span`
    font-size: 1.4rem;
`;
export default function ProductPage(){
    const [gadgets, setGadgets] = useState([]);
    const {id} = useParams();
    const [activeImage, setActiveImage] = useState(null);


    useEffect(()=>{
        getGadgetById(id).then((data)=> {
            setGadgets(data);

            if(data?.imageUrls?.length > 0){
                setActiveImage(data.imageUrls[0])
            }
        })
        .catch(console.error)
    }, [id]);

     const {setCartProducts} = useContext(CartContext);
                function addToCart(product){
                    setCartProducts(prev => [...prev, product])
                     toast.success("Added to cart"); 
                }


    
    
    return(
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <Boxx>
                        <BigImageWrapper >
                            <BigImage  src={activeImage} alt={gadgets.brand} />
                            
                        </BigImageWrapper>
                        <ImageButtons>
                            {gadgets.imageUrls?.map((url, idx) => (
                                <ImageButton key={url} active={url===activeImage} onClick={()=> setActiveImage(url)}>
                                <Image src={url} alt="" />

                                </ImageButton>

                            ))}
                        </ImageButtons>
                    </Boxx>
                    <div>
                        <H1>{gadgets.brand}</H1>
                        <p>{gadgets.description}</p>
                        <PriceRow>
                            <div>
                              <Price>&#x20A6;{gadgets.price} </Price> 

                            </div>
                            <div>
                                <Button onClick={() => addToCart(gadgets.gadgetId)}  primary> <CartIcon /> Add to cart</Button>

                            </div>
                            
                        </PriceRow>

                    </div>
                </ColWrapper><br />
                <H1>Reviews</H1>
                <ColWrapper>
                    <AddReview gadgetId={gadgets.gadgetId} onNewReview={(r) => {

                    }} />
                    <ReviewsList gadgetId={gadgets.gadgetId} />
                </ColWrapper>
                

            
            </Center>
        </>
    )
}