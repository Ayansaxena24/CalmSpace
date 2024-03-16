import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardElement from "../../component/cardElement";
import nojobimage from "../../images/nojobimage.png"
import { Tilt } from 'react-tilt'
import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { jobLoadSingleAction } from "../../Redux/actions/jobAction";
import { Link, useParams } from "react-router-dom";

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          500,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}


const CreatorJobsHistory = () => {
  const dispatch = useDispatch();
  const { userInfo : user } = useSelector(state => state.userProfile);
  const { singleJob, loading }  = useSelector(state => state.singleJob)
  const {mode} = useSelector(state => (state.mode));
  const { id } = useParams();

  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
}, [id]);
  
  console.log(user);
  console.log("jobHistory ==> ", user?.jobCreatorHistory.length);
  console.log("jobCreatorHistory ==> ", user?.jobCreatorHistory?.length);
  return (
    <>
      <Box className="pr-4 pt-6 pl-6">
        <Typography className="text-[#fafafafa] pb-6" variant="h4">
          Jobs History
        </Typography>
        <div className="flex justify-end absolute top-20 right-2">
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          <Link className="text-white z-20" to="create">
            Create Job
          </Link>
        </Button>
      </div>
        {(user?.jobCreatorHistory?.length===0) ? (
          <Box className="overflow-hidden">
            <div className="justify-center font-semibold text-lg mt-4 relative overflow-hidden mt-4">
              Looks like you haven't created any job yet.
              </div>
              <Tilt options={defaultOptions}  className="absolute top-16 left-50 overflow-clip">
              <div>
                <img className="w-1/2 h-1/2 mx-auto" src={nojobimage} alt="no jobs" />
              </div>
              </Tilt>
            </Box>
        ) : (
        <Box>
            {
                user && 
                user?.jobCreatorHistory?.map((history, i) => ( 
                    <div className={`${mode === 'light' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...' : 'bg-black'}`}>  
                   <CardElement className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
                            key={i}
                            id = {history._id}
                            company = {history.company}
                            jobTitle = {history.title}
                            description={history.description}
                            category={history.category}
                            location={history.location}
                            salary={history.salary} 
                            isCreator={true}
                    />   
                    </div> 
                // <h3>{history.title}</h3>
                )) 
            }
        </Box>
         )} 
      </Box>
    </>
  );
};

export default CreatorJobsHistory;