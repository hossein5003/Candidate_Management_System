import React, {useEffect, useRef, useState} from "react";
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    withStyles
} from "@material-ui/core";
import UseForm from "./UseForm";
import {connect} from "react-redux";
import * as actions from "../actions/dCandidate";
import {useToasts} from "react-toast-notifications";

const styles = theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    button: {
        margin: theme.spacing(1),
    }
})

const initialValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
}

const DCandidatesFor = ({classes, ...props}) => {
    const {addToast} = useToasts();

    const validate = (formValues = state) => {
        let temp = {};

        if ('fullName' in formValues)
            temp.fullName = formValues.fullName ? "" : "Full name is required"
        if ('mobile' in formValues)
            temp.mobile = formValues.mobile ? "" : "Mobile is required"
        if ('bloodGroup' in formValues)
            temp.bloodGroup = formValues.bloodGroup ? "" : "Blood group is required"
        if ('email' in formValues)
            temp.email = (/^$|.+@.+..+/).test(formValues.email) ? "" : "email is NOT valid";

        serError({
            ...error,
            ...temp
        })

        if (formValues === state)
            return Object.values(temp).every(x => x === "");
    }

    const {
        state,
        setState,
        handleChange,
        error,
        serError,
        resetButton
    } = UseForm(initialValues, validate, props.setIdEdit);

    // select problem //
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);


    useEffect(() => {
        if (props.idForEdit !== 0) {
            setState({
                ...props.dCandidateList.find(x => x.id === props.idForEdit)
            });
        }
    }, [props.idForEdit])

    const handleSubmit = event => {
        event.preventDefault();

        if (validate()) {
            const onSuccess = () => {
                resetButton();
                addToast("Submitted SuccessFully", {appearance: "success"})
            }

            if (props.idForEdit === 0)
                props.createDCandidateList(state, onSuccess)
            else
                props.updateDCandidateList(props.idForEdit, state, onSuccess);
        }
    }

    return (
        <form autoComplete={"off"} noValidate className={classes.root} onSubmit={handleSubmit}>
            <h3>Register Form</h3>

            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name={"fullName"}
                        label={"Full Name"}
                        variant={"outlined"}
                        value={state.fullName}
                        onChange={handleChange}

                        //how to add attribute to a component //
                        {...(error.fullName && {error: true, helperText: error.fullName})}
                    />
                    <TextField
                        name={"email"}
                        label={"Email"}
                        variant={"outlined"}
                        value={state.email}
                        onChange={handleChange}
                        {...(error.email && {error: true, helperText: error.email})}
                    />
                    <FormControl
                        variant={"outlined"}
                        className={classes.formControl}
                        {...(error.bloodGroup && {error: true})}
                    >
                        <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                        <Select
                            name={"bloodGroup"}
                            value={state.bloodGroup}
                            onChange={handleChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value={"A+"}>A+ </MenuItem>
                            <MenuItem value={"A-"}>A- </MenuItem>
                            <MenuItem value={"B+"}>B+ </MenuItem>
                            <MenuItem value={"B-"}>B- </MenuItem>
                            <MenuItem value={"AB+"}>AB+ </MenuItem>
                            <MenuItem value={"AB-"}>AB- </MenuItem>
                            <MenuItem value={"O+"}>O+ </MenuItem>
                            <MenuItem value={"O-"}>O- </MenuItem>
                        </Select>

                        {error.bloodGroup && <FormHelperText>{error.bloodGroup}</FormHelperText>}
                    </FormControl>

                    <div>
                        <Button className={classes.button} type={"submit"} variant={"contained"} color={"primary"}>
                            Submit
                        </Button>
                        <Button className={classes.button} type={"reset"} variant={"contained"} onClick={resetButton}>
                            Reset
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name={"mobile"}
                        label={"Mobile"}
                        variant={"outlined"}
                        value={state.mobile}
                        onChange={handleChange}
                        {...(error.mobile && {error: true, helperText: error.mobile})}
                    />
                    <TextField
                        name={"age"}
                        label={"Age"}
                        variant={"outlined"}
                        value={state.age}
                        onChange={handleChange}
                    />
                    <TextField
                        name={"address"}
                        label={"Address"}
                        variant={"outlined"}
                        value={state.address}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </form>
    )
}

const mapStateToProps = State => ({
    dCandidateList: State.dCandidate.list
});

const mapActionsToProps = {
    createDCandidateList: actions.create,
    updateDCandidateList: actions.update
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DCandidatesFor));