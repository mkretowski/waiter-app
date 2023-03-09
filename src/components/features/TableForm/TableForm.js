import Form from 'react-bootstrap/Form';
import { Button, Col } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const TableForm = ({ action, actionText, ...props }) => {
  const [status, setTitle] = useState(props.status || '');
  const handleSubmit = () => {
    console.log('submit');
  };

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  return (
    <Col className='col-md-8 col-12 offset-md-2 text-md-start text-center p-2'>
      <PageTitle>{actionText}</PageTitle>
      <Form onSubmit={validate(handleSubmit)}>
        <Form.Group className='mb-3 col-md-6 col-12' controlId='status'>
          <Form.Label>Status</Form.Label>
          <Form.Control
            {...register('status', { required: true, minLength: 3 })}
            type='text'
            placeholder='Enter status'
            value={status}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.status && <small className='d-block form-text text-danger mt-2'>Title is too short (min is 3)</small>}
        </Form.Group>
        <Button variant='primary' type='submit'>
          {actionText}
        </Button>
      </Form>
    </Col>
  );
};

export default TableForm;
