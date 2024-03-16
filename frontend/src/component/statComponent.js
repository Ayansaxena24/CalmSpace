import { Card, CardContent, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const StatComponent = ({ value, icon, description, money }) => {
    const { palette } = useTheme();
    const {mode} = useSelector(state => (state.mode));
    return (
        <>
            <Card 
            // sx={{ bgcolor: palette.secondary.midNightBlue, width: "100%" }}
            >
                <div className={`w-screen ${mode === 'light' ? 'bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r hover:bg-gradient-to-tr hover:from-gray-900 hover:to-gray-600 hover:bg-gradient-to-r duration-300 ease-in-out' : 'bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r hover:bg-gradient-to-tr hover:from-gray-900 hover:to-gray-600 hover:bg-gradient-to-r duration-300 ease-in-out'}`}>
                <CardContent >

                    <IconButton sx={{ bgcolor: "black", mb: 2 }} >
                        {icon}
                    </IconButton>
                    <Typography variant='h4' sx={{ color: "#fafafa", mb: '1px', fontWeight: 700 }}>
                        {money !== '' ? money + value : value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", mb: 0 }}>
                        {description}
                    </Typography>
                </CardContent>
                </div>
            </Card>
        </>
    )
}

export default StatComponent