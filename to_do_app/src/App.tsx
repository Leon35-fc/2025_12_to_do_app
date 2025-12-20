import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
function App() {

  return (
    <><Container className='bg-primary-subtle rounded rounded-3'>
      <Row className='bg-primary rounded rounded-4'>
        <h1 className='text-capitalize text-center text-dark'>To do !</h1>
      </Row>
      <Row className='my-2 p-0 border border-2 border-dark'>
        <Col>
          <p className='text-center'>
            Questo è il campo di ricerca
          </p>
        </Col>
      </Row>
      <Row className='my-2 p-0 border border-2 border-dark'>
        <p className='text-center'>Questa è la lista delle cose da fare</p>
      </Row>
    </Container>
    
    </>
  )
}

export default App
