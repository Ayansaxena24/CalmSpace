import axios from 'axios';
import { JOB_LOAD_REQUEST, JOB_LOAD_SUCCESS, JOB_LOAD_FAIL, JOB_LOAD_SINGLE_REQUEST, JOB_LOAD_SINGLE_SUCCESS, JOB_LOAD_SINGLE_FAIL, REGISTER_JOB_REQUEST, REGISTER_JOB_SUCCESS, REGISTER_JOB_FAIL } from '../constants/jobConstants';
import { toast } from 'react-toastify';

// const backend_api = process.env.REACT_APP_BACKEND_API;

export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`);
        // console.log(this.data);
        dispatch({ 
            type: JOB_LOAD_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data?.error
        });
    }
}

//single job action
export const jobLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
        console.log("halwaasasaa", id);
        const res = await axios.get(`/api/job/${id}`);
        console.log("response === >", res);
        const data = res.data;
        // console.log("job === >", job);
        dispatch({ 
                type: JOB_LOAD_SINGLE_SUCCESS, 
                payload: data
        });
        // console.log(data.job);
        // const { job } = data;
        // console.log(job);
        // const {jobTypeName} = job.jobType;
        // const {_id, company, title, description, salary, location, user, createdAt, updatedAt, available, availableTill} = job;
        // console.log(jobTypeName);
        // // dispatch({ 
        // //     type: JOB_LOAD_SINGLE_SUCCESS, 
        // //     payload: data 
        // // });
        // dispatch({ 
        //     type: JOB_LOAD_SINGLE_SUCCESS, 
        //     payload: {
        //         job: {
        //                 _id,
        //                 company,
        //                 title,
        //                 description,
        //                 salary,
        //                 location,
        //                 user,
        //                 available,
        //                 availableTill,
        //                 createdAt,
        //                 updatedAt,
        //                 jobTypeName
        //             }
        //         }       
        //     }
        //     );
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}

// register job action
export const registerAjobAction = (job) => async (dispatch) => {
    dispatch({ type: REGISTER_JOB_REQUEST })

    try {
        const { data } = await axios.post(`/api/job/create`, job)
        dispatch({
            type: REGISTER_JOB_SUCCESS,
            payload: data
        })
        toast.success("Job created successfully");


    } catch (error) {
        dispatch({
            type: REGISTER_JOB_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}
