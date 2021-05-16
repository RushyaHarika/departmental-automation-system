import styled  from 'styled-components';

export const LoginListGroupWrapper = styled.div`
    background-color:white !important;
`;

export const LoginListGroup = styled.a`
    background:white !important;
    color:black !important;
    border:none;
    &.active{
        background:#16a085 !important; 
        color:white !important;
    }
    &:hover:not(.active) {
        background-color: #1abc9c !important;
    }
`;

export const Input=styled.input`
    border:none;
    outline:none;
    background-color:#bdc3c7;
    padding:6px;
    width: 100%;
    border-radius:2px;
`;

export const SideBarButton = styled.button`
    background-color:#16a085;
    color:white;
    border:none;
    font-size:2rem;
    margin-left:2%;
    &:focus {
        outline: 0 !important;
    }
`;

export const NavWrapper = styled.nav`
    border-radius:0;
    background-color:#16a085;
    margin-bottom:0;
    font-size:1.5rem;
    color:white;
`;

export const NavA = styled.a`
    color:white !important;
    &.active {
        padding-bottom:0px;
        border-bottom:1.5px solid black !important;
        text-decoration: none !important;
    }
    &:hover:not(.active) {
        color: black !important;
    }
    
`;

export const Brand = styled.a`
    padding-Left:3%;
`;

export const MainWrapper=styled.div`
    overflow: hidden;
    height:auto;
    width:auto;
`;

export const HomeWrapper = styled.div`
    background:white;
`;

export const ListGroupWrapper = styled.div`
    background-color:#1abc9c !important;
    border-radius:0px 6px 0px 0px;
    padding-bottom:5.5rem;
`;

export const ListGroup = styled.a`
    background:#1abc9c !important;
    color:white !important;
    margin-left:0;
    padding-top:1.5rem;
    padding-bottom:1.5rem;
    padding-left:3rem;
    font-size:1rem;
    border:none;
    &.active{
        background:#7f8c8d !important; 
        color:white !important;
    }
    &:hover:not(.active) {
        background-color: #95a5a6 !important;
    }
`;
