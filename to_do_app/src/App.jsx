// import { useState } from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import Details from '../components/Details';

function App() {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/');
  // };
  return (
    <>
      <BrowserRouter>
        <Container fluid={true} className="/*bg-dark*/ my-0 py-3">
        <Link to='/'>
          <h1 className="bg-primary rounded rounded-3 text-center text-dark py-3 mx-5 pt-1" style={{ cursor: 'pointer' }}>
            To do App!
          </h1>
        </Link>
          <Routes>
            <Route path="/" element={<Tasks/>} />
          {/* <Tasks/> */}
            <Route path="/details/:index" element={<Details/>} />
          </Routes>
          {/* <Details/> */}
        </Container>
        <footer className="d-flex align-bottom h-100 mt-auto py-5"></footer>
      </BrowserRouter>
    </>
  );
}

export default App;
