import { Box, Stack, Typography } from '@mui/material';
import StatComponent from '../../component/statComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { Chart } from "react-google-charts";
import { data, options } from './data/data';
import ChartComponent from '../../component/ChartComponent';
import adminCoding from '../../images/adminCoding.mp4'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allUserAction } from '../../Redux/actions/userAction';
import { jobTypeLoadAction } from '../../Redux/actions/jobTypeAction';
import { jobLoadAction } from '../../Redux/actions/jobAction';

const AdminDashboard = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(allUserAction());
        dispatch(jobTypeLoadAction());
        dispatch(jobLoadAction());
      }, []);
    
      const { users, loading } = useSelector((state) => state.allUsers);
      const { jobType, loading: loadingJobType } = useSelector((state) => state.jobTypeAll);
      const { jobs, loading: loadingJobs } = useSelector((state) => state.loadJobs);

      // Count the number of users with role === 1
     const countAdmins = users !==undefined ? users.filter(user => user.role === 1).length : 0;
     const countJobs = jobs !== undefined ? jobs.length : 0;
     const countJobTypes = jobType!==undefined ? jobType.length : 0;
    

    return (
        <div className='relative'>
            <video src={adminCoding} className='z-0 absolute opacity-50' autoPlay='true' loop muted />
            <Box className="z-1">
                <Typography className="pt-4 pl-4 relative" variant="h4" sx={{ color: "white", pb: 3 }}>
                    Dashboard
                </Typography>
                <Stack
                    className='pl-4 w-[80%] z-10 relative'
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >

                    <StatComponent
                        value = {countAdmins}
                        icon={<SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Administrators"
                        money=''
                    />
                    <StatComponent
                        value={countJobs}
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Jobs"
                        money=''
                    />
                    <StatComponent
                        value={countJobTypes}
                        icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Jobs categories"
                        money=''
                    />

                </Stack>

                {/* <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <ChartComponent>
                        <Chart
                            chartType="Bar"
                            data={data}
                            options={options}
                            width="100%"
                            height="300px"
                            legendToggle
                        />
                    </ChartComponent>
                </Stack> */}

            </Box>
        </div>
    )
}

export default AdminDashboard