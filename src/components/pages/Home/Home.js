import Tables from '../../features/Tables/Tables';
import { Button, Row, Col, Spinner } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllTables, getStatus } from '../../../redux/tablesReducer';

const Home = () => {
  const tables = useSelector(getAllTables);
  const { status } = useSelector(getStatus);
  return (
    <>
      <Row className='m-0 p-2'>
        <PageTitle>All tables</PageTitle>
        <Col className='col-md-2 offset-md-7 text-end p-0'>
          <Button variant='outline-info' as={Link} to='/table/add'>
            Add Table
          </Button>
        </Col>
      </Row>
      {(status === 'loading' || !status) && <Spinner animation='border' variant='primary' />}
      {status === 'idle' && <Tables tables={tables} />}
    </>
  );
};

export default Home;
