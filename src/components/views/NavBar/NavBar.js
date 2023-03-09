import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const NavBar = () => {
  return (
    <Navbar bg='primary' variant='dark' className='mt-4 mb-4 mx-2 rounded px-2 justify-content-between'>
      <Navbar.Brand href='#home'>Waiter.app</Navbar.Brand>
      <Nav>
        <Nav.Link as={NavLink} to='/'>
          Home
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
