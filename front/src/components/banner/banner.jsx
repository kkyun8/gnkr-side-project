import React from 'react';
import styled from 'styled-components';

const BannerStyle = styled.section`
    background-color: #5cb85c;
    width: 100%;
    text-align: center;
    padding: 2rem;
    h1 {
        text-shadow: 0 1px 3px rgb(0 0 0 / 30%);
        font-weight: 700!important;
        text-align: center;
        font-size: 3.5rem;
        color: #fff;
        margin: 0;
    }
    p {
        color: #fff;
        font-size: 1.5rem;
        font-weight: 300!important;
        margin: 0;
    }
    
`

function Banner() {
    return (
        <BannerStyle>
            <h1>gnkr-side-project</h1>
            <p>cheer up create this project</p>
        </BannerStyle>
    );
}

export default Banner;