import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import Footer from '../component/Footer'
import LoadingBox from '../component/loadingBox'
import Navbar from '../component/Navbar'
import { jobLoadSingleAction } from '../Redux/actions/jobAction'
import Button from '@mui/material/Button'
import { userApplyJobAction } from '../Redux/actions/userAction'
import greenSpeaker from '../images/greenSpeaker.jpg'
import gamlaCode from '../images/gamlaCoding.jpg'
import bg from '../images/bg.jpg'
import './SingleJob.css'


const SingleJob = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(jobLoadSingleAction(id));
        console.log(creatorId);
    }, [id]);

    const { singleJob, loading }  = useSelector(state => state.singleJob)
    const { job }  = useSelector(state => state.job)
    const jobState = singleJob === undefined ? job : singleJob;
    console.log("jobState", jobState); 
    const {mode} = useSelector(state => state.mode);
    const [searchParams] = useSearchParams();
    console.log("singleJOb", singleJob)
    const creatorId = searchParams.get('creatorId');
    

    const applyForAJob = () => {
        dispatch(userApplyJobAction({
            company : singleJob && singleJob.company,
            title: singleJob && singleJob.title,
            description: singleJob && singleJob.description,
            salary: singleJob && singleJob.salary,
            location: singleJob && singleJob.location,
            creatorId : creatorId
        }))
    }

    return (
        <div className={`flex flex-col ${mode === 'light' ? '' : 'bg-gradient-to-t from-gray-700 via-gray-900 to-black border-1'}`}>
            <Box
            className={`${mode === 'light' ? '' : 'bg-gradient-to-t from-gray-700 via-gray-900 to-black border-1'}`}
            // sx={{ bgcolor: "#fafafa", height: 50 }}
            >

                <Navbar />
                {/* <img src={greenSpeaker} alt="green speaker" className="w-[10%] absolute" /> */}
                <Box className="absolute top-12 left-0 w-full">
                    <Container className="flex justify-center items-center" sx={{ pt: '30px' }}>

                        <Stack
                            direction={{ xs: 'column' }}
                            spacing={{ xs: 1, sm: 0, md: 0 }}
                        >
                            <Box sx={{ flex: 4, py: 2 }}>

                                {
                                    loading ? <LoadingBox /> :

                                        <Card className='relative h-[400px] w-[1100px] text-3xl'>
                                            <CardContent className='bg-gradient-to-r from-[#a0467c] via-[#7327a5] to-[#a0467c] h-full flex flex-col '>
                                                <Typography variant="h1" component="h1">
                                                    {singleJob && singleJob.company}
                                                </Typography>
                                                <Typography variant="h5" component="h3" className='pl-2'>
                                                    {singleJob && singleJob.title}
                                                </Typography>
                                                <div className='grid grid-cols-2 w-[600px] justify-between h-full pt-20'>
                                                <Typography variant="body2">
                                                    <Box component="span" className='text-xl' sx={{ fontWeight: 700 }}>Salary</Box>: ${singleJob && singleJob.salary}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" className='text-xl' sx={{ fontWeight: 700 }}>Category</Box>: {singleJob && singleJob.jobTypeName ? singleJob.jobTypeName : "No category2"}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" className='text-xl' sx={{ fontWeight: 700 }}>Location</Box>: {singleJob && singleJob.location}
                                                </Typography>
                                                <Typography variant="body2" sx={{ pt: 0 }}>
                                                <Box component="span" className='text-xl' sx={{ fontWeight: 700 }}>Job description</Box>: {singleJob && singleJob.description}
                                                </Typography>
                                                </div>
                                            </CardContent>
                                            <img src={gamlaCode} alt="gamla code" className="absolute top-0 right-0 md:w-[400px] md:h-[400px] sm:w-[220px] object-cover" />
                                        </Card>
                                }
                            </Box>
                            <Box className="flex justify-center pr-12 hover:shadow-lg hover:shadow-blue-100 duration-300 ease-in-out hover:scale-105">
                                <Button onClick={applyForAJob} className=' bg-gradient-to-r from-[#ad5389] via-[#691c93] to-[#ad5389] duration-300 ease-in-out w-full h-20' sx={{ fontSize: "15px" }} variant='contained'>Apply for this Job</Button>
                            </Box>

                        </Stack>

                    </Container>
                </Box>
            </Box>
            {/* <Footer className="absolute bottom-0"/> */}
        </div>
    )
}

export default SingleJob;