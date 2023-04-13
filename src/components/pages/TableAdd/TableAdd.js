import TableForm from '../../features/TableForm/TableForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTableRequest, getNewId } from '../../../redux/tablesReducer';
import { useCallback } from 'react';
import { addTable } from '../../../redux/tablesReducer';
const TableAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newTableId = useSelector((state) => getNewId(state));
  const handleSubmit = useCallback(
    async (table) => {
      try {
        await dispatch(addTableRequest({ ...table, id: newTableId })).unwrap();
        dispatch(addTable({ ...table, id: newTableId }));
        navigate('/');
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError);
      }
    },
    [dispatch, navigate, newTableId]
  );
  return <TableForm action={handleSubmit} actionText='Add table' />;
};
export default TableAdd;
