import { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function Details() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.removeItem('tasks');
    }
  }, [tasks]);

  const completeDate = () => {
    //Creo un array con anno, mese e giorno, lo inverto e inserisco il trattinio tra gli elementi
    const date = [
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    ];
    return date.reverse().join('-');
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInput = (e) => {
    const formInput = e.target.id.replace('Task', '').toLowerCase();

    setTasks((prev) => {
      const updated = [...prev];
      updated[index][formInput] = e.target.value;
      console.log(updated);
      return updated;
    });

    console.log('taskForm', tasks);
    console.log(formInput);
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const completed = !task.completed;
        return {
          ...task,
          completed,
          completedDate: completed ? completeDate() : ''
        };
      })
    );
  };

  const handleForm = (e) => {
    e.preventDefault();

    // DA RIMUOVERE
    // const newTask = {
    //   id: '',
    //   title: tasks[index].title,
    //   description: tasks[index].description,
    //   date: completeDate(),
    //   completed: false,
    //   completedDate: ''
    // };

    console.log('tasks', tasks, 'event', e);

    // const id = Number(tasks.length !== 0 ? tasks[tasks.length - 1].id : 0) + 1;

    console.log('submit FORM', e.target.id, e.target.value);
    setTasks((prev) => [...prev]);
    console.log(tasks);
    console.log('Event', e);
    alert('Modifica applicata');
    handleClose();
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    alert('Evento cancellato');
    navigate('/');
  };

  return (
    <>
      <Row className="row-cols-1 row-cols-sm-2 justify-content-center gap-1">
        <Col className="" key={tasks[index].id}>
          <Card className="">
            <Card.Body>
              <Card.Title className="hstack">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id={`checkbox-${tasks[index].id}`}
                  className="me-2"
                  checked={tasks[index].completed}
                  onChange={() => toggleComplete(tasks[index].id)}
                />
                {tasks[index].title}
              </Card.Title>
              <hr />
              <Card.Text>{tasks[index].description}</Card.Text>
              <Card.Text className="d-flex row-cols-2">
                <span className="fw-semibold">added : {tasks[index].date}</span>{' '}
                {tasks[index].completed && (
                  <span className="fw-semibold">
                    completed : {tasks[index].completedDate}
                  </span>
                )}
              </Card.Text>
              <hr />
              <div className="d-flex row-cols-12 row-cols-lg-6 flex-wrap flex-md-nowrap justify-content-start gap-3">
                <Button onClick={handleShow}>Modifica</Button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  contentClassName="border border-3 border-info"
                >
                  <Modal.Header closeButton className="bg-warning">
                    <Modal.Title>Nuova attività</Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={handleForm}>
                    <Modal.Body>
                      <Form.Group className="mb-3" controlId="TaskTitle">
                        <Form.Label>Titolo attività</Form.Label>
                        <Form.Control
                          as="input"
                          rows={1}
                          defaultValue={tasks[index].title}
                          onBlur={handleInput}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="TaskDescription">
                        <Form.Label>Descrizione attività</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          defaultValue={tasks[index].description}
                          onBlur={handleInput}
                          required
                          style={{ resize: 'none' }}
                        />
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="d-flex row-cols-3 justify-content-center bg-warning gap-5">
                      <Button variant="primary" type="submit">
                        Invia
                      </Button>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
                <Button onClick={() => removeTask(tasks[index].id)}>
                  Elimina
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Details;
