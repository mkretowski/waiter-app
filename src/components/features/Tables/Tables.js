import { Link } from 'react-router-dom';
import { Button, ListGroup, Col, Row } from 'react-bootstrap';

const Tables = ({ tables, ...props }) => {
  if (tables.length === 0) return <Col className='text-center'>No tables to show...</Col>;
  return (
    <ListGroup variant='flush' className='p-2'>
      {tables.map((table) => (
        <ListGroup.Item key={table.id}>
          <Row className='py-2'>
            <Col className='col-12 col-md-4 col-sm-5 col-xxl-2 col-lg-3 text-sm-start text-center p-0'>
              <Row className='align-items-center'>
                <Col className='h3 m-0'>Table {table.id}</Col>
                <Col className='m-0'>
                  <strong>Status: </strong>
                  {table.status}
                </Col>
              </Row>
            </Col>
            <Col className='col-md-2 offset-xxl-8 offset-lg-7 offset-md-6 offset-sm-4 offset-0 text-sm-end text-center p-0'>
              <Button variant='primary' as={Link} to={'/table/update/' + table.id}>
                Show more
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Tables;
