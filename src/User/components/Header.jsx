import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import ButtonLink from "./ButtonLink";
import Button from "./Button";
import { AuthContext, useAuth } from "../AuthContext";


    const StlyedHeader = styled.header`
        background-color: #222;
        z-index: 3;
        
    `;
    const Logo = styled(Link)`
        color:#fff;
        text-decoration: none;
        font-size: 20px;
        
        position: relative;
        z-index: 3;
        margin-left: 5px;

        @media screen and (min-width: 768px){
            margin-left: 0;
        }
    `;

    const Wrapper = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
    `;
    const StyledNav = styled.nav`
        ${props => props.mobileNavActive ? `
            display: block;
            
            ` : `
            display: none;
            `}
       
        gap: 15px;
        position: fixed;
        top: 0;
        bottom: 0;
        left:0;
        right:0;
        padding: 70px 20px 20px;
        background-color: #222;
        z-index: 3;
        @media screen and (min-width: 768px){
            display: flex;
            position: static;
        z-index: 3;
            padding:0;
        }
    `;
    const NavLink = styled(Link)`
        display:block;
        color: #aaa;
        text-decoration: none;
        padding: 10px 0;
         @media screen and (min-width: 768px){
            padding:0;
         }

    `;
    const NavButton = styled.button`
        background-color: transparent;
        width: 30px;
        height: 30px;
        border:0;
        color: white;
        cursor: pointer;
        position: relative;
        z-index: 3;
        @media screen and (min-width: 768px){
            display: none;
        }
    `;
    const Input = styled.input`
        border-radius: 50px;
        margin-top: 0;
        @media screen and (min-width: 768px){
           margin-top: -10px;
        }
    `;

function Header(){
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive]= useState(false);
      const { logout } = useContext(AuthContext);
    const {user} = useAuth();
   
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
     const handleLogout = () =>{
        logout();
        navigate("/user/login");
    }

    function handleSearch(e){
        e.preventDefault();
        if(!query.trim()) return;

        navigate(`/user/search?q=${encodeURIComponent(query)}`);
    }


    return(
        <StlyedHeader>

            <Center>
                <Wrapper>
                    <Logo to={'/user'}>GadgetMart</Logo>
                        <StyledNav mobileNavActive={mobileNavActive}>
                            <NavLink  to={'/user'}>Home</NavLink>
                            <NavLink to={'/user/products'}>All products</NavLink>
                            <NavLink to={'/user/categories'}>Categories</NavLink>
                            <NavLink to={'/user/account'}>Account</NavLink>
                            <NavLink to={'/user/cart'}>Cart ({cartProducts?.length})</NavLink>
                
                        </StyledNav>
                       <div>
                        <form
                            onChange={handleSearch}
                            className="flex-1 relative"
                            >
                            <Input
                                type="text"
                                placeholder="Search gadgets…"
                                value={query}
                                
                                onChange={(e) => setQuery(e.target.value)}
                                className="
                                w-full
                                pl-5  
              
                                border border-gray-300
                                text-sm
                                outline-none
                                transition
                                focus:border-black
                                focus:ring-1 focus:ring-black
                                focus:bg-white
                                focus:text-black-900
                                placeholder:text-gray-400

                                "
                            />

                         
                            <svg
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                                />
                            </svg>
                            </form>
                       </div>
                        <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                            <BarsIcon />
                        </NavButton>
                </Wrapper>
            </Center>
        </StlyedHeader>
    )
}
export default Header;