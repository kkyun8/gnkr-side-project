import React from 'react';

import styled from 'styled-components';

const FooterStyle = styled.footer`
    display: flex;
    background-color: whitesmoke;
    justify-content: space-around;
    align-content: center;
    a { 
        text-decoration:none;
        color: #3CB371;
        font-size: 0.6rem;
    } 
    .footer__text {
        color: darkgray;
        font-size: 0.6rem;
    }
    
`;


function Footer() {
    return (
        <FooterStyle>
            <a className="footer" href="#">gnkr-side-project</a><span className="footer__text">cheer up create this project</span>            
        </FooterStyle>
    );
}

export default Footer;