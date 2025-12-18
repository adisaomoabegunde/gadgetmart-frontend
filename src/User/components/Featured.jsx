import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Bg = styled.div`
    background-color: #222;
    color:#fff;
    padding: 50px 0;
`;
const Title = styled.h1`
    margin-left: 5px;
    font-weight: normal;
    font-size: 1.5rem;
    color:#fff;
        @media screen and (min-width: 768px){
    font-size: 3rem;
    margin-left: 0;

        }
`;
const Desc = styled.p`
    margin-left: 5px;
    color: #aaa;
    font-size: .8rem;
    @media screen and (min-width: 768px){
     margin: 0;
    }
`;
const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img{
        max-width: 100%;   
        max-height: 250px;
        display: block;
        margin: 0 auto;
    }   
        div:nth-child(1) {
            order: 2;
        }

     @media screen and (min-width: 768px){

        grid-template-columns: 1.1fr 0.9fr;
        div:nth-child(1) {
            order: 0;
        }
        img{
        max-width: 100%;   
    }  
     }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
  
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
    margin-left: 5px;
    @media screen and (min-width: 768px){
    margin-left: 0;
    }

`;


function Feartured(){
     const {user, logout} = useAuth();
     const navigate = useNavigate();

     function handleLogout(){
        logout();
        navigate("/user/login", {replace: true });
     }
    return(
        <Bg>
          <Center>
            <ColumnsWrapper>
                <Column>
                    <div>
                           <Title>Macbook 14 pro </Title>
            <Desc>Supercharged by M2 Pro or M2 Max, MacBook takes its power and efficiency further than ever. It delivers exceptional performance whether it is plugged in or not, and now has ever long lasting battery  </Desc>
            <ButtonsWrapper>

                {user? (
                    <>
                         <Button onClick={handleLogout} white={1} outline={1} >Logout  </Button>
                 <ButtonLink to={"/user/products"} white={1}>   <CartIcon/> View all product  </ButtonLink>
                         
                    </>
                ) : (
                       <>
                          <ButtonLink to={"/user/login"} white={1} outline={1} >Sign In  </ButtonLink>
                <ButtonLink to={"/user/register"} white={1} >
                   <CartIcon/>

                    Sign up
                    
                    </ButtonLink>
                       </>
                )}

                
            </ButtonsWrapper>
                    </div>
                </Column>

                <Column>
                    <img src="https://png.pngtree.com/png-vector/20240623/ourmid/pngtree-apple-macbook-on-transparent-background-png-image_12823123.png" alt="looooooo" />
                </Column>
            </ColumnsWrapper>
           
          </Center>
        </Bg>
    )
}
export default Feartured;