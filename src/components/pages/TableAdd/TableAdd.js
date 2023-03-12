import TableForm from '../../features/TableForm/TableForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTableRequest, getNewId } from '../../../redux/tablesReducer';
import { useCallback } from 'react';
const TableAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newTableId = useSelector((state) => getNewId(state));
  const handleSubmit = useCallback(
    (table) => {
      dispatch(addTableRequest({ ...table, id: newTableId }));
      navigate('/');
    },
    [dispatch, navigate, newTableId]
  );

  return <TableForm action={handleSubmit} actionText='Add table' />;
};

export default TableAdd;
