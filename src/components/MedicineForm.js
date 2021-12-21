import { Grid } from "@mui/material";
import React, {useEffect, useState} from "react";
import Form from '../layout/Form' 
import Input from "../controls/Input";
import Select from '../controls/Select';
import Date from "../controls/Date";
import Button from '../controls/Button';
import {ButtonGroup, Button as MuiButton, makeStyles} from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@material-ui/core/Box';
import {createAPIEndpoint, ENDPIONTS} from '../api/index'

const getNewMedicine = ()=>({
    medicineId: 0,
    medicineName: "",
    medicinePrice: 0,
    sellTime: "",
    medicineTypeId: 0
})

const useStyles = makeStyles(theme => ({
    submitButtonGroup: {
        backgroundColor: '#76a877',
        color: '#000',
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#76a877',
        }
    }
}))

export default function MedicineForm(props){
    const {medicineId, setMedicineId} = props;
    const[values, setValues] = useState(getNewMedicine());
    const [errors, setErrors] = useState({});
    const classes = useStyles();
    const [typeList, setTypeList] = useState([]);
    
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.TYPES).fetchAll()
            .then(res => {
                let typeList = res.data.map(item => ({
                    id: item.medicineTypeId,
                    title: item.medicineTypeName
                }));
                typeList = [{ id: 0, title: 'Select' }].concat(typeList);
                setTypeList(typeList);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (medicineId == 0) resetForm()
        else {
            createAPIEndpoint(ENDPIONTS.MEDICINES).fetchById(medicineId)
                .then(res => {
                    setValues(res.data);
                    setErrors({});
                })
                .catch(err => console.log(err))
        }
    }, [medicineId]);

    const handleInputChange = e =>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }

    const resetForm = ()=>{
        setValues(getNewMedicine())
    }

    const validateForm = () =>{
        let temp = {};
        temp.medicineName = values.medicineName != "" ? "" : "This field is required.";
        temp.medicinePrice = values.medicinePrice != 0 ? "" : "This field is required.";
        temp.medicineTypeId = values.medicineTypeId != 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }

    const SubmitMedicine = e =>{
        e.preventDefault();
        if (validateForm()) {
            if (values.medicineId == 0) {
                createAPIEndpoint(ENDPIONTS.MEDICINES).create(values)
                    .then(res => {
                        resetForm();
                    })
                    .catch(err => console.log(err));
            }
            else {
                createAPIEndpoint(ENDPIONTS.MEDICINES).update(values.medicineId, values)
                    .then(res => {
                        setMedicineId(0);
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    return(
        <Form onSubmit={SubmitMedicine}>
            <Grid container>
                <Grid item xs={3.5}>
                    <Input
                        label="Name"
                        name="medicineName"
                        onChange={handleInputChange}
                        error={errors.medicineName}
                        value={values.medicineName}>
                    </Input>
                </Grid>
                <Grid item xs={3.5}>
                    <Input
                        label="Price"
                        name="medicinePrice"
                        onChange={handleInputChange}
                        value={values.medicinePrice}
                        error={errors.medicinePrice}>
                    </Input>
                </Grid>
                <Grid item xs={3.5}>
                    <Select
                        label="Type"
                        name="medicineTypeId"
                        onChange={handleInputChange}
                        value={values.medicineTypeId}
                        options = {typeList}
                        error={errors.medicineTypeId}>
                    </Select>
                </Grid>
                <Grid item xs={3.5}>
                    <Date
                        label="Sell Time"
                        name="sellTime"
                        onChange={handleInputChange}
                        value={values.sellTime}>                
                    </Date>
                    <Box m={2} ml={3} pt={1}>
                        <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton
                                size="large"
                                endIcon={<AddCircleIcon/>}
                                type="submit">
                                    Submit
                            </MuiButton>
                        </ButtonGroup>
                    </Box>
                </Grid>
            </Grid>
        </Form>
    )
}