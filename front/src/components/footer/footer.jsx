import React from 'react';

import styled from 'styled-components';

const FooterStyle = styled.footer`
    
    background-color: whitesmoke;
    padding: 1rem 15rem;
    
    a { 
        text-decoration:none;
        color: #5cb85c;;
        font-size: 1rem;
        margin-right: 0.5rem;
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