import React, { useState } from "react";
import styles from "../pages/main/ArsTalk/ArsTalk.module.css";
import { Col, Form, Image, Button } from "react-bootstrap";
import Back from "../assets/img/back.png";

function ChangePassword(props) {
  const [form] = useState(props.form);
  const [changeText] = useState(props.changeText);
  return (
    <>
      <Col lg={4} md={12} sm={12} xs={12} className={styles.left}>
        <Col className={styles.rowHeaderInfoCard3}>
          <Image
            src={Back}
            onClick={() => props.handleBack(false)}
            className={styles.iconBack}
          />
          <h1 className={styles.username}>{form.userName}</h1>
        </Col>
        <Col className={styles.rowHeaderInfoCard7}>
          <Form.Group className={styles.formGroupPassword}>
            <Form.Label className={styles.textLabel}>New Password</Form.Label>
            <Form.Control
              type="Password"
              placeholder="Enter New Password"
              // value={form.username}
              onChange={(event) => changeText(event)}
              required
              className={styles.placeholderPassword}
            />
          </Form.Group>

          <Form.Group className={styles.formGroupPassword}>
            <Form.Label className={styles.textLabel}>
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              className={styles.placeholderPassword}
            />
          </Form.Group>
          <Col className={styles.rowButton}>
            <Button className={styles.buttonLogin} variant="fff" type="submit">
              Login
            </Button>
          </Col>
        </Col>
      </Col>
    </>
  );
}

export default ChangePassword;
