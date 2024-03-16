import { CREATE_JOB_TYPE_FAIL, CREATE_JOB_TYPE_REQUEST, CREATE_JOB_TYPE_RESET, CREATE_JOB_TYPE_SUCCESS, EDIT_JOB_TYPE_FAIL, EDIT_JOB_TYPE_REQUEST, EDIT_JOB_TYPE_RESET, EDIT_JOB_TYPE_SUCCESS, JOB_TYPE_LOAD_FAIL, JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_RESET, JOB_TYPE_LOAD_SUCCESS } from "../constants/jobTypeConstants";


export const loadJobTypeReducer = (
    state = { jobType: [] },
    action //initial state is empty array
  ) => {
    switch (action.type) {
      case JOB_TYPE_LOAD_REQUEST: //if request is made, loading is true
        return { loading: true };
      case JOB_TYPE_LOAD_SUCCESS: //if request is successful, loading is false and jobs are returned
        return {
          loading: false,
          jobType: action.payload.jobT
        };
  
      case JOB_TYPE_LOAD_FAIL: //if request is successful, loading is false and jobs are returned
        return {
          loading: false,
          error: action.payload,
        };
  
      case JOB_TYPE_LOAD_RESET: //if request is successful, loading is false and jobs are returned
        return {};
      default:
        return state;
    }
  };
  
  
  // create job type reducer
export const createJobTypeReducer = (state = {}, action) => {
  switch (action.type) {
      case CREATE_JOB_TYPE_REQUEST:
          return { loading: true }
      case CREATE_JOB_TYPE_SUCCESS:
          return {
              loading: false,
              jobType: action.payload,
          }
      case CREATE_JOB_TYPE_FAIL:
          return { loading: false, error: action.payload }
      case CREATE_JOB_TYPE_RESET:
          return {}
      default:
          return state;
  }

}

// Edit Job Type Reducer 
export const editJobTypeReducer = (state = {}, action) => {
  switch (action.type) {
      case EDIT_JOB_TYPE_REQUEST:
          return { loading: true }
      case EDIT_JOB_TYPE_SUCCESS:
          return {
              loading: false,
              jobType: action.payload,
          }
      case EDIT_JOB_TYPE_FAIL:
          return { loading: false, error: action.payload }
      case EDIT_JOB_TYPE_RESET:
          return {}
      default:
          return state;
  }

} 