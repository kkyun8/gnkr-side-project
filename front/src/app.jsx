import React, { useEffect, useState } from 'react';
import Feed from './components/contents/feed/feed';
import Tag from './components/contents/tag/tag';
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import Header from './components/header/header'; 
import Banner from './components/banner/banner'; 
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { getAllFeeds } from './actions/feeds';

const AppStyle = styled.section`
    background-color: #fff;
    .main_contain {
        display: flex;
        justify-content: space-around;
        align-content: center;
    }
    .feed_contain{
        margin: 0 5rem;
        width: 50%;
    }
`

function App() {
    const feeds = useSelector(state => state.reducers);
    //ネット通信時データの読み込みのところ使うLoadingState
    const [loading, setLoading] = useState(true); 
    
    const dispatch = useDispatch();

     useEffect(() => {
        setLoading(true);
        dispatch(getAllFeeds());
        setLoading(false);
    }, [dispatch]); 

    return (
        <AppStyle className="main">
            <Header/>
            <Banner/>
            <Nav/>
            <div className='main_contain'>
                <section className='feed_contain'>
                    <ul>
                        {loading ? <h1>Now Loading......</h1> : feeds.map(feed => <Feed key={feed.id} feed={feed} />)}
                        {/* {feeds && feeds.map(feed => <Feed key={feed.id} feed={feed} />)} */}
                    </ul>
                </section>
               <Tag/>
            </div>
            <Footer/>
        </AppStyle>
    );
}

export default App;