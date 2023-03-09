import TableForm from '../../features/TableForm/TableForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTable } from '../../../redux/tablesReducer';
const TableAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (table) => {
    dispatch(addTable(table));
    navigate('/');
  };

  return <TableForm action={handleSubmit} actionText='Add table' />;
};

export default TableAdd;
