import http from '../http-commons';
    
const getAllFeeds = () => {
    return http.get('/feed',{
        params : {
            page: 1,
            limit: 5,
        }
    });
} 

const feedService = {
    getAllFeeds,
};

export default feedService;