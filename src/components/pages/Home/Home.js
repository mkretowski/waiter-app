import Tables from '../../features/Tables/Tables';
import { Button, Row, Col } from 'react-bootstrap';
import PageTitle from '../../views/PageTitle/PageTitle';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesReducer';
import { useCallback } from 'react';
import { removeTableRequest } from '../../../redux/tablesReducer';

const Home = () => {
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);
  const handleDelete = useCallback(
    (tableId) => {
      dispatch(removeTableRequest(tableId));
    },
    [dispatch]
  );

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
      <Tables tables={tables} action={handleDelete} />
    </>
  );
};

export default Home;
