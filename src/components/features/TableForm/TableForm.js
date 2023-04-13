import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import React, { useState } from 'react';

const TableForm = ({ action, actionText, ...props }) => {
  const [statuses] = useState(['Busy', 'Cleaning', 'Free', 'Reserved']);
  const [status, setStatus] = useState(props.status || 'Free');
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '0');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '0');
  const [bill, setBill] = useState(props.bill || '0');
  const [peopleAmountError, setPeopleAmountError] = useState(false);
  const [maxPeopleAmountError, setMaxPeopleAmountError] = useState(false);
  const [billError, setBillError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    action({ status, peopleAmount, maxPeopleAmount, bill });
  };
  const handleBill = (value) => {
    if (value >= 0) {
      setBill(value);
      setBillError(false);
    } else {
      setBillError(true);
    }
  };

  const handlePeopleAmount = (value) => {
    if (value <= parseInt(maxPeopleAmount)) {
      setPeopleAmount(value);
      setPeopleAmountError(false);
    } else {
      setPeopleAmountError(true);
    }
  };

  const handleMaxPeopleAmount = (value) => {
    if (value <= 10) {
      setMaxPeopleAmount(value);
      setMaxPeopleAmountError(false);
    } else {
      setMaxPeopleAmountError(true);
    }
    if (value <= parseInt(peopleAmount)) {
      setPeopleAmount(value);
      setPeopleAmountError(true);
    } else {
      setPeopleAmountError(false);
    }
  };

  const handleState = (state) => {
    setStatus(state);
    if (state === 'Cleaning' || state === 'Free') {
      setPeopleAmount(0);
    }
    if (state !== 'Busy') {
      setBill(0);
    }
  };

  return (
    <Col className='col-12 text-md-start text-center p-3'>
      <PageTitle>
        {actionText} {props.id}
      </PageTitle>
      <Form onSubmit={handleSubmit} className='col-md-6 col-12'>
        <Form.Group as={Row} className='col-12 my-3' controlId='status'>
          <Form.Label column className='col-3 col-lg-2 text-start'>
            <b>Status:</b>
          </Form.Label>
          <Col xs='auto'>
            <Form.Select
              value={status}
              style={{ width: '12rem' }}
              onChange={(e) => {
                handleState(e.target.value);
              }}
            >
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
                  value={peopleAmount}
                  style={{ width: '3rem' }}
                  className='text-center'
                  onChange={(e) =>
                    handlePeopleAmount(e.target.value, maxPeopleAmount, setPeopleAmount, setPeopleAmountError)
                  }
                />
              </Col>
              <Col xs='auto' className='align-self-center px-0'>
                /
              </Col>
              <Col xs='auto'>
                <Form.Control
                  value={maxPeopleAmount}
                  style={{ width: '3rem' }}
                  className='text-center'
                  onChange={(e) => handleMaxPeopleAmount(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          {peopleAmountError && (
            <small className='d-block form-text text-danger mt-2'>
              People number for table has to be value between 0 and and {maxPeopleAmount}.
            </small>
          )}
          {maxPeopleAmountError && (
            <small className='d-block form-text text-danger mt-2'>
              Max people number for table has to be value between 1 and 10.
            </small>
          )}
        </Form.Group>
        {status === 'Busy' && (
          <Form.Group as={Row} className='col-12 my-3' controlId='bill'>
            <Form.Label column className='col-3 col-lg-2 text-start'>
              <b>Bill:</b>
            </Form.Label>
            <Col className='col-9'>
              <Row>
                <Col xs='auto'>
                  <Form.Control
                    value={bill}
                    style={{ width: '3rem' }}
                    className='text-center'
                    onChange={(e) => handleBill(e.target.value)}
                  />
                </Col>
                <Col xs='auto' className='align-self-center px-0'>
                  $
                </Col>
              </Row>
            </Col>
            {billError && (
              <small className='d-block form-text text-danger mt-2'>Bill has to be number larger than 0.</small>
            )}
          </Form.Group>
        )}
        <Button variant='primary' type='submit'>
          {actionText}
        </Button>
      </Form>
    </Col>
  );
};
TableForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
};
export default TableForm;
