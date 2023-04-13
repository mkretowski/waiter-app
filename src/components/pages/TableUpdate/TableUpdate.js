import TableForm from '../../features/TableForm/TableForm';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesReducer';
import { updateTableRequest } from '../../../redux/tablesReducer';
import { Navigate } from 'react-router-dom';
import { useCallback } from 'react';
import { updateTable } from '../../../redux/tablesReducer';
const TableUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const tableId = id;
  const tableData = useSelector((state) => getTableById(state, tableId));
  const handleSubmit = useCallback(
    async (table) => {
      try {
        await dispatch(updateTableRequest({ ...table, id })).unwrap();
        dispatch(updateTable({ ...table, id }));
        navigate('/');
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError);
      }
    },
    [dispatch, navigate, id]
  );
  if (!tableData) return <Navigate to='/' />;
  return <TableForm action={handleSubmit} actionText='Update table' {...tableData} />;
};
export default TableUpdate;
