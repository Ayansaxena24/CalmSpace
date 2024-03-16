import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CardElement from "../../component/cardElement";
import nojobimage from "../../images/nojobimage.png"
import { Tilt } from 'react-tilt'

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


const UserJobHistory = () => {
  const { userInfo : user } = useSelector(state => state.userProfile);
  const {mode} = useSelector(state => (state.mode));
  
  console.log(user);
  console.log(user?.jobHistory.length);
  console.log(user?.jobHistory?.length);
  return (
    <>
      <Box className="ml-6 mt-5">
        <Typography className="text-[#fafafafa]" variant="h4">
          Jobs History
        </Typography>
        {(user?.jobHistory?.length===0) ? (
          <Box className="overflow-hidden">
            <div className="justify-center font-semibold text-lg mt-4 relative overflow-hidden">
              Looks like you haven't applied to any job yet.
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
                user?.jobHistory?.map((history, i) => ( 
                    <div className={`${mode === 'light' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...' : 'bg-black'}`}>  
                   <CardElement className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
                            key={i}
                            id = {history.id}
                            jobTitle = {history.title}
                            description={history.description}
                            category={history.category}
                            location={history.location} 
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

export default UserJobHistory;
