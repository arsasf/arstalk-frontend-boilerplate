import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";
import {
  Button,
  Container,
  Form,
  Card,
  Row,
  Image,
  Col,
  Modal,
  Spinner,
} from "react-bootstrap";
import styles from "./Login.module.css";
import Google from "../../../assets/img/google.png";

function Login(props) {
  const [form, setForm] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    console.log("Login Run");
    setTimeout(() => {
      setIsLogin(false);
    }, 2000);
  }, []);

  const handleClose = () => setShow(false);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(form);
    props
      .login(form)
      .then((result) => {
        localStorage.setItem("token", result.value.data.data.token);
        setShow(true);
        setMsg(result.value.data.msg);
        setTimeout(() => {
          props.history.push("/arstalk");
        }, 3000);
      })
      .catch((err) => {
        setShow(true);
        setMsg(err.response.data.msg);
        props.history.push("/");
        console.log(err);
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
      {isLogin === true ? (
        <Container fluid className={styles.spinner}>
          <Spinner animation="border" variant="light" />
          <p className={styles.loading}>Loading...</p>
        </Container>
      ) : (
        <Container>
          <Card className={`${styles.card} mt-5 mb-5 mx-auto shadow `}>
            <Card.Body>
              <h1 className={styles.login}>Login</h1>
              <p className={styles.welcomeBack}>Hi, Welcomeback !</p>
              <Form onSubmit={handleLogin}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.textLabel}>Email</Form.Label>
                  <Form.Control
                    type="Email"
                    placeholder="Enter Email"
                    name="userEmail"
                    value={form.userEmail}
                    onChange={(event) => changeText(event)}
                    required
                    className={styles.placeholder}
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.textLabel}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    className={styles.placeholder}
                    name="userPassword"
                    value={form.userPassword}
                    onChange={(event) => changeText(event)}
                  />
                </Form.Group>
                <Link className={styles.forgotPassword} to="/forgot-password">
                  <p>Forgot Password?</p>
                </Link>
                <Row className={styles.rowButton}>
                  <Button
                    className={styles.buttonLogin}
                    variant="fff"
                    type="submit"
                  >
                    Login
                  </Button>
                </Row>

                <Col className={styles.rowLine}>
                  <span className={styles.line}></span>
                  <span className={styles.textLoginWith}>Login With</span>
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

                <Col className={styles.accountSignUp}>
                  <p className={styles.textDont}>Don’t have an account? </p>{" "}
                  <Link to="/register" className={styles.textSignUp}>
                    Sign Up
                  </Link>
                </Col>
              </Form>
              <Modal show={show} className={styles.modal}>
                <Modal.Header className={styles.modalHeader}>
                  <Modal.Title className={styles.modalTitle}>
                    INFO LOGIN
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
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { login };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
