import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";
function NotFound() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>404 Route Not Found</h1>
            <Button onClick={() => navigate('/')}>Category Managment</Button>
        </div>
    )
}

export default NotFound
