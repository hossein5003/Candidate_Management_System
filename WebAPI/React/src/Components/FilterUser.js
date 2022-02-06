import React, {useEffect, useRef, useState} from "react";
import {FormControl, withStyles, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    }
})

const FilterUser = ({classes,...props}) => {
    // select problem //
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;

        props.setFilterState({...props.filterState, [name]: value});

        console.log(props.filterState)
    }

    return (
        <form autoComplete={"off"}>
            <h3>Filter User</h3>

            <TextField
                className={classes.formControl}
                name={"fullName"}
                label={"Full Name"}
                variant={"outlined"}
                value={props.filterState.fullName}
                onChange={handleChange}
            />
            <FormControl variant={"outlined"} className={classes.formControl}>
                <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                <Select
                    name={"bloodGroup"}
                    value={props.filterState.bloodGroup}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                >
                    <MenuItem value={''}>No Matter</MenuItem>
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                </Select>
            </FormControl>
        </form>
    )
}

export default withStyles(styles)(FilterUser)