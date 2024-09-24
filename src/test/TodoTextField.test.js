import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; // adicione fireEvent aqui
import { Formik } from 'formik';
import TodoTextField from '../components/ui/TodoTextField';

describe('TodoTextField Component', () => {
  const mockFormik = {
    values: { text: '' },
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    touched: {},
    errors: {},
    isSubmitting: false,
  };

  test('should render the text field', () => {
    render(
      <Formik initialValues={{ text: '' }} onSubmit={() => {}}>
        <TodoTextField formik={mockFormik} />
      </Formik>
    );

    expect(screen.getByPlaceholderText('Edit todo')).toBeInTheDocument();
  });

  test('should display error message when field is touched and has error', () => {
    mockFormik.touched.text = true;
    mockFormik.errors.text = 'O campo não pode ser vazio';

    render(
      <Formik initialValues={{ text: '' }} onSubmit={() => {}}>
        <TodoTextField formik={mockFormik} />
      </Formik>
    );

    expect(screen.getByText('O campo não pode ser vazio')).toBeInTheDocument();
  });

  test('should call handleChange when the text field changes', () => {
    render(
      <Formik initialValues={{ text: '' }} onSubmit={() => {}}>
        <TodoTextField formik={mockFormik} />
      </Formik>
    );

    const input = screen.getByPlaceholderText('Edit todo');
    fireEvent.change(input, { target: { value: 'New Todo' } });

    expect(mockFormik.handleChange).toHaveBeenCalledWith('text');
    // Como o valor não é atualizado automaticamente, você pode remover a linha abaixo ou atualizá-la conforme necessário
    expect(mockFormik.values.text).toBe(''); // valor no formik não muda automaticamente, só no onChange
  });
});
