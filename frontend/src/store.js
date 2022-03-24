import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
<<<<<<< HEAD
import { profileReducer, userReducer } from "./reducers/userReducer";
=======
import { userReducer } from "./reducers/userReducer";
>>>>>>> 7e2b957769e6e362ed21d0b1fc7bdacd7db92eb1

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user: userReducer,  
<<<<<<< HEAD
    profile: profileReducer,
=======
>>>>>>> 7e2b957769e6e362ed21d0b1fc7bdacd7db92eb1
});

let initalState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;