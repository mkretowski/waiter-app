import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import TableUpdate from './components/pages/TableUpdate/TableUpdate';
import TableAdd from './components/pages/TableAdd/TableAdd';
import { Container } from 'react-bootstrap';
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';
import { fetchTables } from './redux/tablesReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/table/add' element={<TableAdd />} />
        <Route path='/table/update/:id' element={<TableUpdate />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
