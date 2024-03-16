import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Footer from '../../component/Footer'
import LoadingBox from '../../component/loadingBox'
import Navbar from '../../component/Navbar'
import { jobLoadSingleAction } from '../../Redux/actions/jobAction'
import Button from '@mui/material/Button'
import { userApplyJobAction } from '../../Redux/actions/userAction'
import { IoArrowBackOutline } from "react-icons/io5";
// import greenSpeaker from '../images/greenSpeaker.jpg'
// import gamlaCode from '../images/gamlaCoding.jpg'


const CreatorSingleJob = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const loading = false;

    useEffect(() => {
        dispatch(jobLoadSingleAction(id));
    },[]);

    const data  = useSelector(state => state.singleJob);
    console.log("job =====> ",data)
    const { job } = data; 

    const {mode} = useSelector(state => state.mode);
    const params = useParams();
    const [searchParams] = useSearchParams();

    return (
        <div className={`h-[82vh] ${mode === 'light' ? 'bg-white' : 'bg-gradient-to-t from-gray-700 via-gray-900 to-black border-1'}`}>
            <Box sx={{minHeight:"screen"}}
            className={`h-[82vh] ${mode === 'light' ? 'bg-gray-300' : 'bg-gradient-to-t from-gray-700 via-gray-900 to-black border-1'}`}
            // sx={{ bgcolor: "#fafafa", height: 50 }}
            >
                <Navbar />
                <div className={`p-4 ${mode === 'light' ? 'bg-gray-300 min-w-screen' : ' bg-gradient-to-r h-full from-[#000000] to-[#434343] min-h-full'}`}>
                <div className={`px-4 pb-4 mt-12 rounded-lg relative ${mode === 'light' ? 'bg-gray-400  min-w-screen' : ' h-full bg-gradient-to-r to-[#000000] from-[#434343] min-h-full'}`}>
                    <div className='flex justify-center rounded-3xl w-full'>
                        <div className='rounded-full mr-20'>
                        <img src={`${mode === 'light' ? 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=893&height=600&name=image8-2.jpg}' : 'https://static1.xdaimages.com/wordpress/wp-content/uploads/2020/05/Google-Search-Dark.jpeg?q=50&fit=contain&w=1140&h=&dpr=1.5'}`} alt="job" className="absolute -top-10 w-24 h-24 object-cover rounded-full" />
                        </div>
                    </div>
                    <div className={`mt-4 absolute ${mode === "light" ? 'text-black' : 'text-sky-400'}`}>
                        <Link to={"/creator/jobs"}><IoArrowBackOutline className="animate-bounce text-xl"/></Link>
                        </div>
                    <div className="w-full flex justify-center mt-20">
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>Job Details</p>
                        </div>
                    </div>
                    <div className='p-8 m-8 grid grid-cols-3 gap-y-10 text-white ml-64'>
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>{job?.company}</p>
                            <p>Company</p>
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>{job?.title}</p>
                            <p>Title</p>
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>{job?.location}</p>
                            <p>Location</p>
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>{job?.salary}</p>
                            <p>Salary</p>
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>{job?.available === true ? 'Yes' : "No"}</p>
                            <p>Available</p>
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>{job?.availableTill.split('T')[0]}</p>
                            <p>Available Till</p>
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>{job?.description}</p>
                            <p>Description</p>
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>{job?.createdAt.split('T')[0]}</p>
                            <p>Created At</p>
                        </div>
                        <div>
                            <p className={`text-2xl font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-sky-400'}`}>{job?.updatedAt.split('T')[0]}</p>
                            <p>Last Updated At</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="flex absolute bottom-0 w-full ">
                <Footer className="w-full bg-green-400"/>
                </div>
            </Box>
        </div>
    )
}

export default CreatorSingleJob;