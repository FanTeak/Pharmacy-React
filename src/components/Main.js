import { Grid } from "@mui/material";
import React, { useState } from "react";
import Box from '@material-ui/core/Box';
import MedicineForm from "./MedicineForm";
import MedicineList from "./MedicineList";
export default function Main(){
    const [medicineId, setMedicineId] = useState(0);

    return(
        <Grid container spacing={2}>
            <Grid>
                <MedicineForm {...{medicineId, setMedicineId}}></MedicineForm>
            </Grid>
            <Grid>
                <Box pt={10} ml={25}>
                <MedicineList {...{setMedicineId}}></MedicineList>
                </Box>
            </Grid>
        </Grid>
    )
}