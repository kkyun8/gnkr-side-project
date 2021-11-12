import { VIEW_ALL } from "../actions/types";

const initialState = {
    "isLoading": true,
    "totalCount": 3,
    "page": 1,
    "limit": 4,
    "data": [
      {
        "id": 3,
        "title": "titlecome",
        "body": "musukasii",
        "userId": 1,
        "createdAt": "2021-10-22T12:54:02.000Z",
        "updatedAt": "2021-10-22T12:54:02.000Z",
        "tags": [],
        "user": {
          "id": 1,
          "name": "cho",
          "email": "jstack@aaaa.mail",
          "password": "$2b$10$zhDzJVoJCbxwfnzYqg.GzeF7uADV5G7cmL3XHrB3LS2DANMYc/l46",
          "image": null,
          "title": null,
          "description": null,
          "createdAt": "2021-08-27T08:11:10.000Z",
          "updatedAt": "2021-08-27T08:11:10.000Z",
          "feedIds": [
            1,
            2,
            3
          ],
          "favoriteFeedIds": []
        }
      },
    ]
  }

//type: "액션의 종류를 한번에 식별할 수 있는 문자열 혹은 심볼",
//payload: "액션의 실행에 필요한 임의의 데이터",
const feedsReducer = (feedState = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case VIEW_ALL:
            const { data } = payload;
            return {
                isLoading: false,
                data,
            }
            
        default:
            return feedState.data;
    }
}

export default feedsReducer;