import React, { useEffect, useState } from 'react';
import Feed from './components/contents/feed/feed';
import Tag from './components/contents/tag/tag';
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import Header from './components/header/header'; 
import Banner from './components/banner/banner'; 
import styled from 'styled-components';

const AppStyle = styled.section`
    background-color: mintcream;
    height: 100vh;
    .main_contain {
        display: flex;
        justify-content: space-around;
        align-content: center;
        height: 100vh;
    }
`

function App({ feed }) {

const [feeds, setFeeds] = useState([]);

useEffect(() => {
    feed.getAllFeeds()
    .then(feeds => setFeeds(feeds));
}, [feed]); 

    return (
        <AppStyle className="main">
            <Header/>
            <Banner/>
            <Nav/>
            <div className='main_contain'>
                <ul>
                    {feeds.map(feed => <Feed key={feed.id} feed={feed} />)}
                </ul>
               <Tag/>
            </div>
            <Footer/>
        </AppStyle>
    );
}

export default App;