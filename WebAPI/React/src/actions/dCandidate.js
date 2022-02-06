import api from "./api";

export const ACTION_TYPES = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    FETCH_ALL: "FETCH_ALL",
}

const formatData = data => {
    return {
        ...data,
        age: parseInt(data.age ? data.age : 0)
    }
}

export const fetchAll = () => dispatch => {
    api.dCandidateAPIs().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            });
        })
        .catch(error => console.log(error))
}

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data);

    api.dCandidateAPIs().create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: response.data
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data);

    api.dCandidateAPIs().update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: {id,...data}
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const deleteApi = (id, onSuccess) => dispatch => {
    api.dCandidateAPIs().delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}