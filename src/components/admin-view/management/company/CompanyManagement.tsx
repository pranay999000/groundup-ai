import { Box, Typography, Divider, LinearProgress, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../admin-view.scss'
import { CompanyColumns } from '../../../../mockData/AdminPanel';
import GTable from '../../../common/table/GTable';
import GButton from '../../../common/button/GButton';
import AddCompany from './add-company/AddCompany';
import './company-management.scss'
import { RootState } from '../../../../store/reducers';
import { companyState } from '../../../../store/reducers/companyReducer';
import { bindActionCreators } from 'redux';
import { companyActionCreators } from '../../../../store/action-creators'
import { useDispatch, useSelector } from 'react-redux';
import {  } from '../../../../store/action-creators/companyActionCreators';
import EditCompany from './edit-company/EditCompany';

interface CompanyRowsTypes {
    company: string;
    action: string;
    _id: number;
    address: string;
    number: string;
}

export default function CompanyManagement() {
    const [open, setOpen] = useState(false);
    const handleShowDialog = (status: boolean) => {
        setOpen(status);
    }

    const dispatch = useDispatch();
    const { fetchCompany, deleteCompany } = bindActionCreators(companyActionCreators, dispatch)
    const { company, error, loading }: companyState = useSelector((state: RootState) => state.company);

    const [companyManagementRows, setcompanyManagementRows] = useState<CompanyRowsTypes[]>([]);
    const tempcompanyManagementRows: CompanyRowsTypes[] = []


    const [editCompanyData, setEditCompanyData] = useState<CompanyRowsTypes>();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const handleShowEditDialog = (status: boolean) => {
        setOpenEditDialog(status);
    }


    useEffect(() => {
        fetchCompany()
    }, [])

    useEffect(() => {
        (company || []).map((company, index) => {
            tempcompanyManagementRows.push({
                company: company['name'],
                action: "Edit/Remove",
                _id: company['_id'],
                address: company['address'],
                number: company['number'],
            })
        })
        setcompanyManagementRows(tempcompanyManagementRows)
    }, [company])


    const rowClicked = (data: CompanyRowsTypes) => {
        console.log('rowClicked')
        console.log(data)
        setEditCompanyData(data)
        setOpenEditDialog(true)
    }
    return (
        <>
            <Box >
                {loading === true ? (<LinearProgress />)
                    : loading === false && error !== '' ? <Alert severity="error">{error}</Alert> :
                        <>
                            <Box className="company-management-view">
                                <Typography className="heading" variant="h5" component="h2">Company Management</Typography>
                                <Divider />
                                <GButton title='Add Comapny' size='small' className='company-management-btn add-button' onClick={() => setOpen(true)} />
                                <AddCompany open={open} showDialog={handleShowDialog} handleSubmit={() => { setOpen(false) }} />
                                <GTable rowClicked={(data: any) => { }} editlicked={rowClicked} deleteClicked={(data) => deleteCompany(data)} rows={companyManagementRows} columns={CompanyColumns} />
                            </Box>
                        </>
                }
            </Box>
            {openEditDialog && <EditCompany EditCompanyData={editCompanyData} open={openEditDialog} showDialog={handleShowEditDialog} handleSubmit={() => { setOpenEditDialog(false) }} />}
        </>
    )
}
