import React from 'react';
import styled from 'styled-components';

const BannerStyle = styled.section`
    background-color: olivedrab;
    width: 100%;
    text-align: center;
    padding: 2rem;
    h1 {
        padding-bottom: 0.5rem;
    }
    h1, p {
        color: white;
        margin: 0;
    }
    
`

function Banner() {
    return (
        <BannerStyle>
            <h1>gnkr-side-project banner</h1>
            <p>cheer up create this project</p>
        </BannerStyle>
    );
}

export default Banner;