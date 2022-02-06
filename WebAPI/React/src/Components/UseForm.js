import React, {useState} from "react";

const UseForm = (initialValue, validate, setIdEdit) => {
    const [state, setState] = useState(initialValue);
    const [error, serError] = useState([]);

    const handleChange = event => {
        const {name, value} = event.target;

        setState({
            ...state,
            [name]: value
        });

        validate({[name]: value});
    }

    const resetButton = () => {
        setState({...initialValue});
        serError({});
        setIdEdit(0);
    }

    return {
        error,
        serError,
        state,
        setState,
        handleChange,
        resetButton
    };
}

export default UseForm;