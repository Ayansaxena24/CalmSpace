import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { editJobTypeAction } from '../../Redux/actions/jobTypeAction';
import { useNavigate, useParams } from 'react-router-dom';



const validationSchema = yup.object({

    jobTypeName: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashUpdateCategory = () => {

    const { id, jobTypeName } = useParams(); // Get the jobType ID from the URL params
    console.log("id--->", id)
    const { user } = useSelector(state => state.userProfile);
    console.log("user--->", user)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            user: user && user._id,
            jobTypeName: jobTypeName | '', // Initialize the form with the fetched jobTypeName
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(editJobTypeAction(id, values.jobTypeName));
            navigate('/admin/category')
            actions.resetForm();
        },
    });


    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", position:'relative' }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Edit the Category
                        </Typography>
                         {/* Display the current jobTypeName */}
                         <Typography variant="subtitle1" sx={{ pb: 1, position:'absolute', left:"2px", top:"6vh" }}>
                            Current Category Name: {jobTypeName}
                        </Typography>
                        <TextField sx={{ mb: 3, mt: 3}}
                            fullWidth
                            id="jobTypeName"
                            label="Update Category"
                            name='jobTypeName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="category name"
                            value={formik.values.jobTypeName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.jobTypeName && Boolean(formik.errors.jobTypeName)}
                            helperText={formik.touched.jobTypeName && formik.errors.jobTypeName}
                        />


                        <Button fullWidth variant="contained" type='submit' >Submit Changes</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashUpdateCategory