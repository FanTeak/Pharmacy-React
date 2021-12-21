import React from "react";
import '@date-io/date-fns'
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

export default function Date(props){
    const { name, label, value, variant, onChange, error = null, ...other } = props;

    const [selectedDate, setSelectedDate] = React.useState("2021-12-21T08:34:05.541Z");
    const handleDate=(date)=>{
        setSelectedDate(date);
        onChange({target:{name:name, value:selectedDate}});
    }

    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                variant={variant || 'outlined'}
                margin="normal"
                format="MM/dd/yyy"
                name={name}
                label={label}
                value={selectedDate}
                onChange={handleDate}
                KeyboardButtonProps={{'aria-label':'change date'}}>
            </KeyboardDatePicker>
        </MuiPickersUtilsProvider>
    )
}