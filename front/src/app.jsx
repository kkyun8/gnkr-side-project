import React, { useState } from 'react';
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

function App() {

const [feeds, setFeeds] = useState([
    {
        id: '1',
        user: 'cho',
        image: '😄',
        date: '2021',
        title: 'Title',
        description: 'test description', 
    },
    {
        id: '2',
        user: 'you',
        image: '😝',
        date: '2021',
        title: 'Title2',
        description: 'test description2', 
    },
    {
        id: '3',
        user: 'kim',
        image: null,
        date: '2021',
        title: 'Title3',
        description: 'test description3', 
    },
]); 

    return (
        <AppStyle className="main">
            <Header/>
            <Banner/>
            <Nav/>
            <div className='main_contain'>
                <ul>
                    {feeds.map(feed => (
                        <Feed feed={feed} />
                    ))}
                </ul>
               <Tag/>
            </div>
            <Footer/>
        </AppStyle>
    );
}

export default App;