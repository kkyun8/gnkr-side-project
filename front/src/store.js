import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

//const initState = {reducers:[]};

const store = createStore(
    reducers,
    //initState,
    applyMiddleware(thunk),
);

export default store;