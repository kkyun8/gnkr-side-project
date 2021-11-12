import React from 'react';

import styled from 'styled-components';

const FooterStyle = styled.footer`
    display: flex;
    background-color: whitesmoke;
    align-content: center;
    padding: 1rem 0;
    a { 
        text-decoration:none;
        color: #5cb85c;;
        font-size: 1rem;
    } 
    .footer__text {
        color: darkgray;
        font-size: 1rem;
    }
    
`;


function Footer() {
    return (
        <FooterStyle>
            <a className="footer" href="!#"><b>gnkr-side-project</b></a><span className="footer__text">cheer up create this project</span>            
        </FooterStyle>
    );
}

export default Footer;