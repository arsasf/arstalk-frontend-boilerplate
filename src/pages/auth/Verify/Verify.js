import { useState } from "react";

import { connect } from "react-redux";
import { verify } from "../../../redux/action/auth";
import { Container, Button, Modal, Col } from "react-bootstrap";
import styles from "./Verify.module.css";

function Verify(props) {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);

  const handleClose = () => setShow(false);

  const handleVerify = () => {
    const id = props.match.params.id;
    props
      .verify(id)
      .then((result) => {
        setShow(true);
        setLogin(true);
        setMsg(result.value.data.msg);
      })
      .catch((err) => {
        setShow(true);
        setMsg(err.response.data.msg);
        props.history.push(`/verify-register/${id}`);
      });
  };

  const handleLogin = () => {
    props.history.push("/");
  };

  return (
    <>
      <Container fluid className={styles.fullArea}>
        <Container className={styles.container}>
          <h1 className={styles.arstalk}>ArsTalk Team</h1>
          {login === false ? (
            <Col className={styles.colContent}>
              <h3>Verification Email</h3>
              <p>Please Click Button for verification your email</p>
              <Button
                variant="fff"
                className={styles.button}
                onClick={() => handleVerify()}
              >
                Verification Now
              </Button>
            </Col>
          ) : (
            <Col className={styles.colContent}>
              <h3>Email Verified</h3>
              <p>Please Click Button for login</p>
              <Button
                variant="fff"
                className={styles.button}
                onClick={() => handleLogin()}
              >
                Login Now
              </Button>
            </Col>
          )}

          <Modal show={show} className={styles.modal}>
            <Modal.Header className={styles.modalHeader}>
              <Modal.Title className={styles.modalTitle}>
                INFO VERIFICATION
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
        </Container>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { verify };
// (null, mapDispatchToProps)
// (mapStateToProps)
export default connect(mapStateToProps, mapDispatchToProps)(Verify);
