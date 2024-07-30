import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TaskForm = ({ addTask }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        addTask(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field
              name="title"
              type="text"
              className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="title" component="div" className="invalid-feedback" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field
              name="description"
              as="textarea"
              className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`}
            />
            <ErrorMessage name="description" component="div" className="invalid-feedback" />
          </div>
          <button type="submit" className="btn btn-warning">Add Task</button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
