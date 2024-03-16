import axios from 'axios';
import { CREATE_JOB_TYPE_FAIL, CREATE_JOB_TYPE_REQUEST, CREATE_JOB_TYPE_SUCCESS, DELETE_JOB_TYPE_FAIL, EDIT_JOB_TYPE_REQUEST, EDIT_JOB_TYPE_SUCCESS, JOB_TYPE_LOAD_FAIL, JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_SUCCESS } from '../constants/jobTypeConstants';
import { toast } from 'react-toastify';

// const backend_api = process.env.REACT_APP_BACKEND_API;

export const jobTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/type/jobs`);
        dispatch({ 
            type: JOB_TYPE_LOAD_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_TYPE_REQUEST })

    try {
        const { data } = await axios.post("/api/type/create", jobtype)
        dispatch({
            type: CREATE_JOB_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Job type created successfully");


    } catch (error) {
        dispatch({
            type: CREATE_JOB_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}

//EditJ JobtType Action 
export const editJobTypeAction = (jobTypeID, newJobTypeName) => async (dispatch) => {
    dispatch({ type: EDIT_JOB_TYPE_REQUEST })

    try {
        const { data } = await axios.put(`/api/type/update/${jobTypeID}`,
        {
            jobtypeID: jobTypeID,
            jobTypeName: newJobTypeName
        })
        console.log("data ===================>>>>>>>>>>>>>>>>>>>> ", jobTypeID, newJobTypeName)
        dispatch({
            type: EDIT_JOB_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Job type updated successfully");
    }

    catch (error) {
        dispatch({
            type: CREATE_JOB_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}

//Delete JobType Action
export const jobTypeDeleteAction = (jobTypeID) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/type/delete/${jobTypeID}`);
        toast.success("Job type deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_JOB_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}