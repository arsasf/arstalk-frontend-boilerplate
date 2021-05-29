import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../../redux/action/auth";
import {
  Button,
  Container,
  Form,
  Card,
  Row,
  Image,
  Col,
  Modal,
} from "react-bootstrap";
import styles from "./SignUp.module.css";
import Google from "../../../assets/img/google.png";
import Back from "../../../assets/img/back.png";

function SignUp(props) {
  console.log(props);
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(false);

  const handleRegister = (event) => {
    event.preventDefault();
    console.log(form);
    props
      .register(form)
      .then((result) => {
        setShow(true);
        setMsg(result.value.data.msg);
        setTimeout(() => {
          props.history.push("/");
        }, 5000);
      })
      .catch((err) => {
        setShow(true);
        setMsg(err.response.data.msg);
        console.log(err);
        props.history.push("/register");
      });
  };

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {console.log(msg)}
      <Container>
        <Card className={`${styles.card} mt-5 mb-5 mx-auto shadow `}>
          <Card.Body>
            <Col className={styles.rowHeader}>
              <Link to="/login" className={styles.iconBack}>
                <Image src={Back} />
              </Link>
              <h1 className={styles.register}>Register</h1>
            </Col>
            <p className={styles.letsCreateAccount}>
              Let’s create your account!
            </p>
            <Form onSubmit={handleRegister}>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.textLabel}>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="userName"
                  value={form.userName}
                  onChange={(event) => changeText(event)}
                  placeholder="Enter Name"
                  className={styles.placeholder}
                />
              </Form.Group>

              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.textLabel}>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="userEmail"
                  value={form.userEmail}
                  onChange={(event) => changeText(event)}
                  placeholder="Enter Email"
                  className={styles.placeholder}
                />
              </Form.Group>

              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.textLabel}>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="userPassword"
                  value={form.userPassword}
                  onChange={(event) => changeText(event)}
                  placeholder="Enter Password"
                  className={styles.placeholder}
                />
              </Form.Group>
              <Row className={styles.rowButton}>
                <Button
                  className={styles.buttonRegister}
                  variant="fff"
                  type="submit"
                  // onClick={() => handleRegister()}
                  onClick={handleShow}
                >
                  Register
                </Button>
              </Row>
              <Col className={styles.rowLine}>
                <span className={styles.line}></span>
                <span className={styles.textLoginWith}>Register with</span>
                <span className={styles.line}></span>
              </Col>
              <Row className={styles.rowButton}>
                <Button
                  className={styles.buttonGoogle}
                  variant="fff"
                  type="submit"
                >
                  <Image src={Google} className={styles.imgGoogle} />
                  <h1 className={styles.textGoogle}>Google</h1>
                </Button>
              </Row>
            </Form>
            <Modal show={show} className={styles.modal}>
              <Modal.Header className={styles.modalHeader}>
                <Modal.Title className={styles.modalTitle}>
                  INFO REGISTER
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className={styles.modalBody}>{msg}</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="fff"
                  className={styles.modalFooter}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { register };
// (null, mapDispatchToProps)
// (mapStateToProps)
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

// export default SignUp;
