import { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// const taskArr = [
//   {
//     id: '000000001',
//     title: 'task1',
//     description: 'a long description of what I should do',
//     date: '23-12-2025',
//     completed: true,
//     completedDate: '28-12-2025'
//   },
//   {
//     id: '000000002',
//     title: 'task2',
//     description: 'a long description of what I should do',
//     date: '23-12-2025',
//     completed: false,
//     completedDate: ''
//   },
//   {
//     id: '000000003',
//     title: 'task3',
//     description: 'a long description of what I should do',
//     date: '23-12-2025',
//     completed: false,
//     completedDate: ''
//   }
// ];

function Tasks() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskForm, setTaskForm] = useState({ title: '', description: '' });
  const [filter, setFilter] = useState('tutte');
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  console.log(tasks);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log('Selected Card', selected);

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleInput = (e) => {
    const formInput = e.target.id.replace('Task', '').toLowerCase();

    setTaskForm({ ...taskForm, [formInput]: e.target.value });
    console.log('taskForm', taskForm);
    console.log(formInput);
  };

  const completeDate = () => {
    //Creo un array con anno, mese e giorno, lo inverto e inserisco il trattinio tra gli elementi
    const date = [
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    ];
    return date.reverse().join('-');
  };

  const handleForm = (e) => {
    e.preventDefault();

    const newTask = {
      id: '',
      title: taskForm.title,
      description: taskForm.description,
      date: completeDate(),
      completed: false,
      completedDate: ''
    };

    console.log('tasks', tasks, 'event', e);

    const id = Number(tasks.length !== 0 ? tasks[tasks.length - 1].id : 0) + 1;

    const padId = (num) => {
      num = id;
      num = num.toString();
      while (num.length < 9) num = '0' + num;
      newTask.id = num;
    };

    padId();

    console.log(newTask);
    console.log('submit FORM', e.target.id, e.target.value);
    setTasks([...tasks, newTask]);
    console.log(tasks);
    console.log('Event', e);

    setTaskForm({ title: '', description: '' });

    handleClose();
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        console.log('Prev', prev);

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

  const handelFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleDetails = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    console.log(index);
    
    navigate('/details/' + index)
  }

  return (
    <>
      <Row className="my-3 row-cols-12">
        <Col className="d-flex justify-content-center m-0 p-0">
          <Button
            variant="outline-light border border-3"
            className="bg-primary fw-semibold"
            onClick={handleShow}
          >
            Aggiungi attività
          </Button>

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
                    defaultValue={taskForm.title}
                    onBlur={handleInput}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="TaskDescription">
                  <Form.Label>Descrizione attività</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    defaultValue={taskForm.description}
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
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-sm-2 justify-content-center gap-1">
      {tasks.length !== 0 && (<Row className="d-flex justify-content-center m-0 p-0">
          <Form.Select
            aria-label="select"
            className="bg-primary text-light fw-semibold w-50 object-fit-scale"
            value={filter}
            onChange={handelFilter}
          >
            <option value="tutte">Tutte le attività</option>
            <option value="true">Complete</option>
            <option value="false">Da completare</option>
          </Form.Select>
          {console.log('Form Select form', filter)}
        </Row>)
      }
        {tasks
          .filter((task) => {
            if (filter === 'tutte') return true;
            return task.completed.toString() === filter;
          })
          .reverse()
          .map((t) => (
            <Col className="" key={t.id}>
              <Card
                className={
                  selected == t.id
                    ? 'border border-5 border-warning py-1 px-2 mt-3'
                    : 'py-1 px-2 mt-3'
                }
                onClick={() => setSelected(() => selected != t.id ? t.id : '')}
              >
                <Card.Body>
                  <Card.Title className="hstack">
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      id={`chekbox-${t.id}`}
                      className="me-2"
                      checked={t.completed}
                      onChange={() => toggleComplete(t.id)}
                    />
                    {t.title}
                  </Card.Title>
                  <hr />
                  {/* <Card.Text>{t.description}</Card.Text> */}
                  <Card.Text className="d-flex row-cols-2">
                    <span className="fw-semibold">added : {t.date}</span>{' '}
                    {t.completed && (
                      <span className="fw-semibold">
                        completed : {t.completedDate}
                      </span>
                    )}
                  </Card.Text>
                  <hr />
                  <div className="d-flex row-cols-12 row-cols-lg-6 flex-wrap flex-md-nowrap justify-content-start gap-3">
                    <Button onClick={() => handleDetails(t.id)}>Dettagli</Button>
                    <Button onClick={() => removeTask(t.id)}>Elimina</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Tasks;
