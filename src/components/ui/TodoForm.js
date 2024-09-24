// TodoForm.js
import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from 'react-md';

const TodoSchema = Yup.object().shape({
    text: Yup.string()
        .required('O campo não pode ser vazio')
        .min(3, 'O campo deve ter pelo menos 3 caracteres')
        .max(50, 'Máximo de 50 caracteres!')
});

const TodoForm = ({ onSubmit }) => (
    <Formik
        initialValues={{ text: '' }}
        validationSchema={TodoSchema}
        onSubmit={onSubmit}
    >
        {({ isSubmitting, handleChange, values }) => (
            <Form className='form__grid'>
                <div>
                    <TextField
                        id="floating-center-title"
                        placeholder="Add a new todo"
                        value={values.text}
                        onChange={handleChange('text')}
                        lineDirection="center"
                    />
                    <div className='h__2 alert-color'>
                        <ErrorMessage name="text" component="div" />
                    </div>
                </div>
                <Button className='w__10' raised primary type="submit" disabled={isSubmitting}>
                    Add Todo
                </Button>
            </Form>
        )}
    </Formik>
);

export default TodoForm;
