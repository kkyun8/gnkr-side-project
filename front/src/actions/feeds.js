import { VIEW_ALL } from "./types";
import feedService from "../service/feed_service";

export const getAllFeeds = () => async dispatch => {

    await feedService.getAllFeeds()//
    .then( res => {
        const data = res;
        dispatch({
            type: VIEW_ALL,
            payload: data.data,
        });
    })//
    .catch(console.error);

};

