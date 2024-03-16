import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputBase } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const validationSchema = yup.object({
    search: yup
        .string('Enter your search query')
        .required('this field can not be empty'),
});

const SearchInputEl = () => {

    const navigate = useNavigate();
    const {mode} = useSelector((state) => state.mode);

    const onSubmit = (values, actions) => {
        //alert(values.search);
        const { search } = values;
        if (search.trim()) {
            navigate(`/search/${search}`);
        } else {
            navigate('/');
        }
        actions.resetForm();
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            search: '',
        },

        validationSchema: validationSchema,
        onSubmit
    });

    return (

        <form onSubmit={handleSubmit} style={{ width: '50%' }} className='absolute top-40 flex left-80 z-20 '>
            <Box 
            // sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            className='flex w-[100%] justify-center'
            >
                {/* <Search> */}

                <InputBase className={`rounded-l-md p-2 ${mode === 'dark' ? 'bg-gray-900' : 'bg-white'} }`} 
                // sx={{ bgcolor: 'white', padding: '10px' }}
                    fullWidth={true}
                    id="search"
                    name="search"
                    label="search"
                    placeholder='ex: developer, front end'
                    value={values.search}
                    onChange={handleChange}
                    error={touched.search && Boolean(errors.search)}
                // helperText={touched.search && errors.search}
                />
                <Button sx={{ borderRadius: '0 4px 4px 0'}} className='rounded-r-md' color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                    Search
                </Button>

            </Box>
            <Box component='span' sx={{ color: 'orange' }}>{touched.search && errors.search}</Box>
        </form>

    );
};

export default SearchInputEl;