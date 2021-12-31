import { Box, Typography, Divider, LinearProgress, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CraneUsageRows, CraneManagementColumns } from '../../../../mockData/AdminPanel'
import { craneActionCreator } from '../../../../store/action-creators'
import { RootState } from '../../../../store/reducers'
import { GetCraneState } from '../../../../store/reducers/craneReducer'
import GButton from '../../../common/button/GButton'
import GTable from '../../../common/table/GTable'
import '../../admin-view.scss'
import AddCrane from './add-crane/AddCrane'
import './crane-booking.scss'

interface CraneUsageRows {
    crane: string;
    bookingHours: string;
    bookingDays: string;
    action: string;
    _id: number;
}


export default function CraneBookingManagement() {

    const dispatch = useDispatch();
    const { fetchCrane, removeCrane } = bindActionCreators(craneActionCreator, dispatch)
    const { craneError, cranes, craneLoading }: GetCraneState = useSelector((state: RootState) => state.crane);

    const [open, setOpen] = useState(false);

    const [allCranes, setAllCranes] = useState([]);
    const handleShowDialog = (status: boolean) => {
        setOpen(status);
    }

    useEffect(() => {
        fetchCrane()
    }, [])

    useEffect(() => {
        let tempCrane: any = [];
        (cranes || []).map((crane: any) => {
            tempCrane.push({
                crane: crane['name'],
                bookingHours: crane['createdAt'],
                bookingDays: crane['weekdays'],
                action: "Edit/Remove",
                _id: crane['_id']
            })
        })
        setAllCranes(tempCrane)
    }, [cranes])

    const deleteCrane = async (craneID: any) => {
        await removeCrane(craneID)
        fetchCrane()
    }


    return (
        <Box>
            {craneLoading === true ? <LinearProgress /> : craneLoading === false && craneError !== '' ? <Alert severity="error">{craneError}</Alert> :
                <Box className="crane-booking-management-view">
                    <Typography className="heading" variant="h5" component="h2">Crane Booking Management</Typography>
                    <Divider />
                    <GButton title='Add Crane' size='small' className='crane-management-btn add-button' onClick={() => setOpen(true)} />
                    <GTable rowClicked={(data: any) => { }} rows={allCranes} deleteClicked={deleteCrane} columns={CraneManagementColumns} />
                    {/*  Dialogs */}
                    <AddCrane open={open} showDialog={handleShowDialog} handleSubmit={() => { setOpen(false) }} />
                </Box>}
        </Box>
    )
}
