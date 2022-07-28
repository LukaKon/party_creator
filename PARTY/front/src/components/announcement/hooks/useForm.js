import { useEffect, useState } from "react";
import { createAnnouncement } from "../../../redux/slices/announcementSlice";
import { useDispatch } from "react-redux";

const validate = (values) => {
    const errors = [];

    // title
    if (!values.title) {
        errors.push("Enter some title.");
    }
    if (values.title && values.title.length < 3) {
        errors.push("Enter title longer than 5 characters.");
    }

    // description
    if (!values.description) {
        errors.push("Describe your announcement.");
    }
    if (values.description && values.description.length < 5) {
        errors.push("Be more productive ;)");
    }
    return errors;
};

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setErrors(validate(values));
    }, [values]);

    const updateValue = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (errors.length === 0) {
            console.log("Sending... ", values);
            dispatch(createAnnouncement(values));
            // setValues('')
        }
    };

    return [updateValue, submitHandler, errors];
};
