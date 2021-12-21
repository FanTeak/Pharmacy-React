import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import {createAPIEndpoint, ENDPIONTS} from '../api/index';
import Table from '../layout/Table'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@material-ui/core/Box';

export default function MedicineList(props){
    const {setMedicineId} = props;
    const [medicineList, setMedicineList] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.MEDICINES).fetchAll()
            .then(res => {
                setMedicineList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setMedicineId(id);
    }

    const deleteMedicine = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            createAPIEndpoint(ENDPIONTS.MEDICINES).delete(id)
                .then(res => {
                    setMedicineId(0);
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <Box pl={15}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Sell Time</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    medicineList.map(item=>(
                        <TableRow key={item.medicineId}>
                            <TableCell onClick={e=>showForUpdate(item.medicineId)}>
                                {item.medicineName}
                            </TableCell>
                            <TableCell onClick={e=>showForUpdate(item.medicineId)}>
                                {item.medicinePrice}
                            </TableCell>
                            <TableCell onClick={e=>showForUpdate(item.medicineId)}>
                                {item.sellTime}
                            </TableCell>
                            <TableCell onClick={e=>showForUpdate(item.medicineId)}>
                                {item.medicineType.medicineTypeName}
                            </TableCell>
                            <TableCell>
                                <DeleteSweepIcon color="secondary"
                                onClick={e => deleteMedicine(item.medicineId)}/>
                            </TableCell>
                            <TableCell>
                                <EditIcon 
                                color="secondary"/>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </Box>
    )
}