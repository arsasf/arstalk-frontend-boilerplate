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
import styles from "./ForgotPassword.module.css";
import Google from "../../../assets/img/google.png";
import Back from "../../../assets/img/back.png";

function ForgotPassword(props) {
  const [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("token", username);
    props.history.push("/chat");
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
            <Col className={styles.rowHeader}>
              <Link to="/login" className={styles.iconBack}>
                <Image src={Back} />
              </Link>
              <h1 className={styles.register}>Forgot Password</h1>
            </Col>

            {/* <hr /> */}
            <p className={styles.letsCreateAccount}>
              You’ll get messages soon on your e-mail
            </p>
            <Form onSubmit={handleLogin}>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.textLabel}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={username}
                  onChange={(event) => changeText(event)}
                  required
                  className={styles.placeholder}
                />
              </Form.Group>

              <Row className={styles.rowButton}>
                <Button
                  className={styles.buttonRegister}
                  variant="fff"
                  type="submit"
                >
                  Send
                </Button>
              </Row>

              <Col className={styles.rowLine}>
                <span className={styles.line}></span>
                <span className={styles.textLoginWith}>Register with</span>
                <span className={styles.line}></span>
              </Col>
              <Row>
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
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ForgotPassword;
