class FeedRepository {
    constructor(feedClient) {
        this.feed = feedClient;
    }
    
    async getAllFeeds() {
        const response = await this.feed.get('/feed',{
            params : {
                page: 1,
                limit: 5,
            }
        })
        .catch(function (error) {
            console.log(error);
          });
          return response.data.data;
    }

}

export default FeedRepository;