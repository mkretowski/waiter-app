import TableForm from '../../features/TableForm/TableForm';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesReducer';
import { updateTable } from '../../../redux/tablesReducer';
import { Navigate } from 'react-router-dom';
const TableUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const tableId = id;
  const tableData = useSelector((state) => getTableById(state, tableId));
  const handleSubmit = (table) => {
    dispatch(updateTable({ ...table, id }));
    navigate('/table/' + tableId);
  };
  if (!tableData) return <Navigate to='/' />;
  return <TableForm action={handleSubmit} actionText='Update table' {...tableData} />;
};

export default TableUpdate;
