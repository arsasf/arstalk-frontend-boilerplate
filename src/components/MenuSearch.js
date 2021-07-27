import styles from "../pages/main/ArsTalk/ArsTalk.module.css";
import { Col, Form, Image, Button, InputGroup } from "react-bootstrap";
import Search from "../assets/img/Search.png";
import Plus from "../assets/img/Plus.png";

function MenuSearch(props) {
  return (
    <>
      <Col className={styles.rowHeaderInfoCard1}>
        <Form.Group className={styles.formGroup}>
          <InputGroup>
            <Button variant="fff" className={styles.buttonSearch}>
              <Image src={Search} className={styles.iconSearch} />
            </Button>
            <Form.Control
              type="text"
              placeholder="Type Your Message..."
              className={styles.placeholder}
            />
          </InputGroup>
        </Form.Group>
        <Button
          variant="fff"
          className={styles.buttonPlus}
          onClick={() => {
            props.handleSettings(true, true, true, true, false);
            props.getDataContact();
          }}
        >
          <Image src={Plus} />
        </Button>
      </Col>
    </>
  );
}

export default MenuSearch;
