import React from 'react';
import styled from 'styled-components';


const LoadingStyle = styled.div`
    .outer{
        margin: auto;
        margin-top: 15%;
        background: #5cb85c;
        height: 100px;
        width: 100px;
        border-radius: 15px;
    }
    .middle{
        height: 60px;
        width: 60px;
        margin:auto;
        position: relative;
        top:20px;
        border-radius: 50%;
        background-image: linear-gradient(150deg, transparent 50%, #154e7d 50%),linear-gradient(90deg, #154e7d 50%, white 50%);
        -webkit-animation: rotation 1200ms infinite linear;
        transform-origin: 50% 50%;
        animation-timing-function: ease;
    }
    .inner{
        background: #5cb85c;
        height: 48px;
        width: 48px;
        margin:auto;
        position: relative;
        top:6px;
        border-radius: 50%;
    }
    @-webkit-keyframes rotation {
        from {
        -webkit-transform: rotate(270deg);
        }
        to{
        -webkit-transform: rotate(630deg);
        }
    }
`;

const Loading = () => {
    return( 
        <LoadingStyle>
            <div className='outer'>
                <div className='middle'>
                    <div className='inner'>    
                    </div>
                </div>
            </div>
        </LoadingStyle>
    );
};

export default Loading;