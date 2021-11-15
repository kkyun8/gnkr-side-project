import React, { useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Feed from './components/contents/feed/feed';
import Tag from './components/contents/tag/tag';
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import Header from './components/header/header'; 
import Banner from './components/banner/banner';
import Loading from './components/common/loading'; 
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { getAllFeeds } from './actions/feeds';
import Editor from './components/editor/editor';
import Main from './components/main/main';


const AppStyle = styled.section`
    background-color: #fff;
    .main_contain {
        display: flex;
        justify-content: space-around;
        align-content: center;
        height: 100vh;
    }
    .feed_contain{
        margin: 0 5rem;
        width: 50%;
    }
`

function App() {
    const feeds = useSelector(state => state.reducers);

    const { isLoading, data } = feeds;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllFeeds());
        
    }, [dispatch]); 
    
    return (
        <AppStyle className="main">
            <Header/>
            <Routes>
                <Route path="/" element={ <Main loading = {isLoading} data = {data} /> } />
                <Route path="editor/new" element={ <Editor /> } />
            </Routes>
            <Footer/>
        </AppStyle>
    );
}

export default App;