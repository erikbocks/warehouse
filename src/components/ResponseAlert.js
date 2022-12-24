import { React } from 'react'
import { Alert, AlertTitle, Collapse } from '@mui/material'
import '../styles/ResponseAlert.css'

function ResponseAlert({ data }) {
    return (
        <div className='alertContainer'>
            <Collapse className='collapse' in={data.open}>
                <Alert className='alert' severity={data.severity}>
                    <AlertTitle className='alertTitle'>{data.title}</AlertTitle>
                    {data.message}
                </Alert>
            </Collapse>
        </div>
    )

}

export default ResponseAlert