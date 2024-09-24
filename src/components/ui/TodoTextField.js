import React from 'react';
import { TextField } from 'react-md';

const TodoTextField = ({ formik }) => (
    <TextField
        id="todo-text"
        placeholder="Edit todo"
        value={formik.values.text}
        onChange={formik.handleChange('text')}
        onBlur={formik.handleBlur}
        error={formik.touched.text && formik.errors.text}
        errorText={formik.errors.text}
        disabled={formik.isSubmitting}
    />
);

export default TodoTextField;
