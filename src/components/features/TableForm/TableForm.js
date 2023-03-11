import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const TableForm = ({ action, actionText, ...props }) => {
  const statuses = ['Busy', 'Cleaning', 'Free', 'Reserved'];
  const [status, setStatus] = useState(props.status || '');
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '0');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '0');
  const [bill, setBill] = useState(props.bill || '0');
  const handleSubmit = () => {
    console.log('submit');
  };

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  return (
    <Col className='col-12 text-md-start text-center p-3'>
      <PageTitle>
        {actionText} {props.id}
      </PageTitle>
      <Form onSubmit={validate(handleSubmit)} className='col-md-6 col-12'>
        <Form.Group as={Row} className='col-12 my-3' controlId='status'>
          <Form.Label column className='col-3 col-lg-2 text-start'>
            <b>Status:</b>
          </Form.Label>
          <Col xs='auto'>
            <Form.Select value={status} style={{ width: '12rem' }} onChange={(e) => setStatus(e.target.value)}>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='col-12 my-3' controlId='people'>
          <Form.Label column className='col-3 col-lg-2 text-start'>
            <b>People:</b>
          </Form.Label>
          <Col className='col-9'>
            <Row>
              <Col xs='auto'>
                <Form.Control
                  {...register('peopleAmount', { required: true, min: 0, max: maxPeopleAmount })}
                  value={peopleAmount}
                  style={{ width: '3rem' }}
                  className='text-center'
                  onChange={(e) => setPeopleAmount(e.target.value)}
                />
              </Col>
              <Col xs='auto' className='align-self-center px-0'>
                /
              </Col>
              <Col xs='auto'>
                <Form.Control
                  {...register('maxPeopleAmount', { required: true, min: 0, max: 10 })}
                  value={maxPeopleAmount}
                  style={{ width: '3rem' }}
                  className='text-center'
                  onChange={(e) => setMaxPeopleAmount(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          {errors.peopleAmount && !errors.maxPeopleAmount && (
            <small className='d-block form-text text-danger mt-2'>
              People number for table has to be value between 0 and and {maxPeopleAmount}.
            </small>
          )}
          {errors.maxPeopleAmount && (
            <small className='d-block form-text text-danger mt-2'>
              Max people number for table has to be value between 1 and 10.
            </small>
          )}
        </Form.Group>
        <Form.Group as={Row} className='col-12 my-3' controlId='bill'>
          <Form.Label column className='col-3 col-lg-2 text-start'>
            <b>Bill:</b>
          </Form.Label>
          <Col className='col-9'>
            <Row>
              <Col xs='auto'>
                <Form.Control
                  {...register('bill', { required: true, min: 0 })}
                  value={bill}
                  style={{ width: '3rem' }}
                  className='text-center'
                  onChange={(e) => setBill(e.target.value)}
                />
              </Col>
              <Col xs='auto' className='align-self-center px-0'>
                $
              </Col>
            </Row>
          </Col>
          {errors.bill && !errors.peopleAmount && !errors.maxPeopleAmount && (
            <small className='d-block form-text text-danger mt-2'>Bill can't be less than 0.</small>
          )}
        </Form.Group>
        <Button variant='primary' type='submit'>
          {actionText}
        </Button>
      </Form>
    </Col>
  );
};

export default TableForm;
