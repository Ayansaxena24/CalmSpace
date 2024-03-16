import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'; // Thunk middleware for Redux 

import { composeWithDevTools } from 'redux-devtools-extension'; // Redux DevTools Extension
import { loadJobReducer, loadJobSingleReducer, registerAjobReducer } from './reducer/jobReducer';
import { createJobTypeReducer, loadJobTypeReducer } from './reducer/jobTypeReducer';
import { allUserReducer, creatorJobReducer, deleteUserReducer, getSingleApplicantReducer, userApplyJobReducer, 
         userReducerLogout, userReducerProfile, userReducerSignIn, userReducerSignUp } from './reducer/userReducer';
import { modeReducer } from './reducer/themeModeReducer';

//combine reducers
const reducer = combineReducers({
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    signup : userReducerSignUp,
    logOut : userReducerLogout,
    userProfile : userReducerProfile,
    singleJob: loadJobSingleReducer,
    userJobApplication : userApplyJobReducer,
    allUsers : allUserReducer,
    mode : modeReducer,
    registerJob : registerAjobReducer,
    createJobType : createJobTypeReducer,
    deleteUser : deleteUserReducer,
    creatorJobCHistory : creatorJobReducer,
    getSingleApplicant : getSingleApplicantReducer 

});


//initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null //get user info from local storage //if user info is in local storage then parse it to json else null
    },
    mode : "dark"
};


const middleware = [thunk]; 
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))); //create store //composeWithDevTools(applyMiddleware(...middleware)) is for redux devtools extension //applyMiddleware(...middleware) is for thunk middleware
 export default store; //export store