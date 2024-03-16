import { Avatar, Box } from '@mui/material'
import React, { useEffect } from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import LockClockOutlined from '@mui/icons-material/LockClockOutlined'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { userSignInAction } from '../Redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
import '../App.css';
import face from '../images/face.mp4';

const validationSchema = yup.object({ // yup validation
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});



const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector(state => state.signIn);
    const {mode} = useSelector(state => state.mode);
    useEffect(() => { // redirect to dashboard if user is authenticated
        if (isAuthenticated) {
            if (userInfo.role === 1) {
                console.log(isAuthenticated, " , ", userInfo, " , ", userInfo.role);
                navigate('/admin/dashboard');
            } else {
                console.log(isAuthenticated, " , ", userInfo, " , ", userInfo.role);
                navigate('/user/dashboard');
            }
        }
        // if (isAuthenticated) {
        //     navigate('/user/dashboard');
        // }
    }, [isAuthenticated])


    const formik = useFormik({ // formik hook
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => { // submit function
            //  alert(JSON.stringify(values, null, 2));
            dispatch(userSignInAction(values)); // dispatch action
            actions.resetForm(); // reset form after submit
        }

    })

    return (
        <>
            <Navbar />
            <div
            className='relative h-[81vh] flex justify-center items-center bg-black overflow-clip' 
            // sx={{ height: '81vh', display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <video src={face} className='absolute w-[67%] right-0' autoPlay='true' loop muted/>
                <div className='absolute left-8 w-full'>
                <Box onSubmit={formik.handleSubmit} component="form" 
                className={`${mode === 'light' ? 'relative flex justify-center p-[24px] bg-white border-1 w-[35%] rounded-lg' : 'relative flex justify-center p-[24px] bg-gradient-to-t from-gray-700 via-gray-900 to-black border-1 w-[35%] rounded-lg'}`} 
                // className="form_style border-style" 
                >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                            <LockClockOutlined />
                        </Avatar>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            name='email'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E-mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button fullWidth variant="contained" type='submit' >Log In</Button>
                    </Box>
                </Box>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LogIn