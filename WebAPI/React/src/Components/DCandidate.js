import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/dCandidate"
import {
    Grid,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    withStyles, Button, ButtonGroup
} from "@material-ui/core";
import DCandidatesForm from "./DCandidatesForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete"
import {useToasts} from "react-toast-notifications";
import FilterUser from "./FilterUser";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontsize: "250px"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const initialFilterState = {
    bloodGroup: '',
    fullName: ''
}

const DCandidates = ({classes, ...props}) => {
    const [filterState, setFilterState] = useState(initialFilterState);
    const [idForEdit, setIdForEdit] = useState(0);
    const {addToast} = useToasts();

    useEffect(() => {
        props.fetchAllDCandidates();
    }, []);

    const handleDelete = id => {
        const deleteToast = () => addToast("Deleted Successfully", {appearance: "info"})

        if (window.confirm("Are you sure to delete the record ?"))
            props.deleteDCandidate(id, deleteToast);
    }

    const returnRecord=(record, index)=>{
        return(
            <TableRow key={index} hover>
                <TableCell>{record.fullName}</TableCell>
                <TableCell>{record.mobile}</TableCell>
                <TableCell>{record.bloodGroup}</TableCell>
                <TableCell>
                    <ButtonGroup>
                        <Button onClick={() => setIdForEdit(record.id)}>
                            <EditIcon color={"primary"}/>
                        </Button>
                        <Button onClick={() => handleDelete(record.id)}>
                            <DeleteIcon color={"secondary"}/>
                        </Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>
        )
    }

    const filterF=(record)=>{
        if (filterState.fullName && !record.fullName.toLowerCase().startsWith(filterState.fullName.toLowerCase()))
            return false;

        return !(filterState.bloodGroup && record.bloodGroup !== filterState.bloodGroup);
    }

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={5}>
                        <DCandidatesForm idForEdit={idForEdit} setIdEdit={setIdForEdit}/>
                    </Grid>
                    <Grid item xs={5}>
                        <h3>List of Registered Users</h3>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Mobile</TableCell>
                                        <TableCell>Blood Group</TableCell>
                                        <TableCell> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.dCandidateList.filter(record=>filterF(record)).map((record, index) =>returnRecord(record,index))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={2}>
                        <FilterUser setFilterState={setFilterState} filterState={filterState}/>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

const mapStateToProps = State => ({
    dCandidateList: State.dCandidate.list
});

const mapActionsToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.deleteApi
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DCandidates));