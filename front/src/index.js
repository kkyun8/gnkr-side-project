import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import axios from 'axios';
import FeedRepository from './service/feed_repository';

const feedClient = axios.create(
  {
    //baseURL: 'http://localhost:4000/',
    withCredentials: true,
  }
);
const feed = new FeedRepository(feedClient);

ReactDOM.render(
  <React.StrictMode>
    <App feed={ feed }/>
  </React.StrictMode>,
  document.getElementById('root')
);


