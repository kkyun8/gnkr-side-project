import React from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.header`
    display: flex;
    justify-content: space-around;
    align-content: center;
    padding: 0.5rem 1rem;
    .header-title {
        font-size: 1.5rem !important;
        color: #5cb85c;
        text-decoration: none !important;
        cursor: pointer;
    }
    a { 
        font-size: 1.0rem !important;
        text-decoration:none !important;
        color: rgba(0,0,0,0.3);; 
        font-size: 0.7rem;
        padding: 0 0.5em;
    } 

    a:hover {
        color: black;
    }

`;


function Header() {
    return (
        <HeaderStyle className="header">
            <div className="header-title">gnkr-side-project</div>
            <div className="header-nav">
                <a href="!#" className="header-nav__home">Home</a>
                <a href="!#" className="header-nav__post">New Post</a>
                <a href="!#" className="header-nav__sign-in">Sign in</a>
                <a href="!#" className="header-nav__sign-up">Sign up</a>
            </div>
        </HeaderStyle>
    );
}

export default Header;

