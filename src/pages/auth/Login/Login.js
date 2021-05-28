import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Card,
  Row,
  Image,
  Col,
} from "react-bootstrap";
import styles from "./Login.module.css";
import Google from "../../../assets/img/google.png";

function Login(props) {
  const [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("token", username);
    props.history.push("/arstalk");
  };

  const changeText = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <Container>
        <Card
          // className="mt-5 mx-auto"
          // style={{ width: "25rem" }}
          className={`${styles.card} mt-5 mb-5 mx-auto shadow `}
        >
          <Card.Body>
            <h1 className={styles.login}>Login</h1>
            {/* <hr /> */}
            <p className={styles.welcomeBack}>Hi, Welcomeback !</p>
            <Form onSubmit={handleLogin}>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.textLabel}>Email</Form.Label>
                <Form.Control
                  type="Email"
                  placeholder="Enter Email"
                  value={username}
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
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
