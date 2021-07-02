import React from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.header`
    display: flex;
    justify-content: space-around;
    align-content: center;
    .header-title {
        color: #3CB371;
    }
    a { 
        text-decoration:none;
        color: darkgray; 
        font-size: 0.7rem;
    } 
    .header-nav__home {
        margin-right: 1rem;
    }
    .header-nav__sign-in {
        margin-right: 1rem;
    }
`;


function Header() {
    return (
        <HeaderStyle className="header">
            <div className="header-title">gnkr-side-project</div>
            <div className="header-nav">
                <a href="#" className="header-nav__home">Home</a>
                <a href="#" className="header-nav__sign-in">Sign in</a>
                <a href="#" className="header-nav__sign-up">Sign up</a>
            </div>
        </HeaderStyle>
    );
}

export default Header;

