import { Link } from "react-router-dom";
import { ButtonStyle } from "./Button";
import styled from "styled-components";

const StyledLink = styled(Link)`
     ${ButtonStyle}
`;

function ButtonLink(props){
    return(
        <StyledLink {...props} />
    )
}
export default ButtonLink;