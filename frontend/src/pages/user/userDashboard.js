import React from "react";
import { Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import StatComponent from "../../component/statComponent";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux';
import moment from 'moment';
import codingVideo from '../../images/codingVideo.mp4';

const UserDashboard = () => {
  const { userInfo : user } = useSelector(state => state.userProfile);

  return (
    <div className="relative">
    <div className="absolute top-0 -z:1 -left-1 bg-[#020C0E] overflow-hidden rounded-lg w-[100%]">
      <video autoplay="true" muted loop src={codingVideo} className="w-[95%] h-[650px] object-cover rounded-none"/>
      <Box className="absolute top-5 left-2 right-2 w-full rounded-md">
        <Typography variant="h4" sx={{ color: "white", pb: 3, pl:3 }}>
          Dashboard
        </Typography>
        <Stack className="mx-6"
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={user && moment(user.createdAt).format('YYYY/MM/DD')}
            icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Member since"
            money=""
            sx={{color:"white"}}
          />
          <StatComponent
            value={user && user.jobHistory.length}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Number of jobs applied"
            money=""
          />
        </Stack>
      </Box>
    </div>
    </div>
  );
};

export default UserDashboard;
