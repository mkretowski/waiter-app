import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, ListGroup, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeTableRequest } from '../../../redux/tablesReducer';
const Tables = ({ tables }) => {
  const dispatch = useDispatch();

  if (tables.length === 0) return <Col className='text-center'>No tables to show...</Col>;
  return (
    <ListGroup variant='flush' className='p-1'>
      {tables.map((table) => (
        <ListGroup.Item key={table.id}>
          <Row className='py-2 justify-content-between'>
            <Col md='auto' className='col-12 col-sm-5 text-sm-start text-center p-0'>
              <Row className='align-items-center'>
                <Col className='h3 m-0'>Table {table.id}</Col>
                <Col md='auto' className='m-0'>
                  <strong>Status: </strong>
                  {table.status}
                </Col>
              </Row>
            </Col>
            <Col className='text-sm-end text-center p-0'>
              <Button variant='primary' as={Link} to={'/table/update/' + table.id}>
                Show more
              </Button>{' '}
              <Button
                variant='primary'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(removeTableRequest(table.id));
                }}
              >
                Delete table
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
Tables.propTypes = {
  tables: PropTypes.array.isRequired,
};
export default Tables;
