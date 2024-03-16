import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../Redux/actions/jobTypeAction';

import moment from 'moment'

const CreatorDashCategory = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    },[]);

    const { jobType, loading } = useSelector(state => state.jobTypeAll);
    let data = [];
    data = (jobType !== undefined && jobType.length > 0) ? jobType : []

    //delete by job id
    const deleteJobCategoryById = (e, id) => {
        console.log(id)
    }

    const columns = [

        {
            field: '_id',
            headerName: 'Category_ID',
            width: 150,
            editable: true,
        },
        // {
        //     field: 'Actions',
        //     width: 200,
        //     rederCell: (values) => (
        //         <Box className = "flex justify-space-between w-[170px]">
        //             <Button variant='contained'><Link className='text-white' to={`/admin/edit/user/${values.row.id}`}>Edit</Link></Button>
        //             <Button onClick={(e) => deleteJobCategoryById(e, values.row.id)} variant='contained' color='error'>Delete</Button>
        //         </Box>
        //     )
        // },
    ];

    return (
        <Box className="pl-6 pt-6 pr-4">
            <div className='text-white pb-3 text-2xl'>Jobs Category</div>
            <div className='pb-2 flex justify-end'>
                <Button variant='contained' color='success' startIcon={<AddIcon />}><Link className='text-white' to='admin/category/create'>Create Category</Link></Button>
            </div>
            <div className='bg-blue-600'>
                <Box className='h-400 w-[100%]'>
                <DataGrid className='bg-gradient-to-r from- via-purple-500 to-pink-500'
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                // color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                // bgcolor: (theme) =>
                                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                    // theme.palette.secondary.main
                            },
                            button: {
                                color: '#ffffff'
                            }

                        }}
                        rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    // components={{ Toolbar: GridToolbarExport }}
                    />
                </Box>
            </div>
        </Box>
    )
}

export default CreatorDashCategory

