import { VIEW_ALL } from "./types";
import feedService from "../service/feed_service";

export const getAllFeeds = () => async dispatch => {
        try{
            const res = await feedService.getAllFeeds();
            dispatch({
                type: VIEW_ALL,
                payload: res,
            });
        } catch(err) {
            console.log(err);
        }
    };

