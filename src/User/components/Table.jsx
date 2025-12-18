import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    border: 5px solid white;
    th{
        text-align: left;
        text-transform: uppercase;
        color:#ccc;
        font-weight: 600;
        font-size: .7rem;
        border: none;
    }
    td{
        border: none;
         border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
`;

export default function Table(props){
    return(
        <StyledTable {...props} />
    );
}