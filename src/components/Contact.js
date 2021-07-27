import React, { useState } from "react";
import styles from "../pages/main/ArsTalk/ArsTalk.module.css";
import { Col, Form, Image, Button, InputGroup } from "react-bootstrap";
import Search from "../assets/img/Search.png";
import Back from "../assets/img/back.png";
import AllContact from "../components/AllContact/AllContact";

function Contact(props) {
  const [handleBack] = useState(props.handleBack);
  const [search] = useState(props.search);
  const [changeInputSearch] = useState(props.changeInputSearch);
  const [getDataContact] = useState(props.getDataContact);
  const [contact] = useState(props.contact);
  return (
    <>
      <Col lg={4} md={12} sm={12} xs={12} className={styles.left}>
        <Col className={styles.rowHeaderInfoCard3}>
          <Image
            src={Back}
            onClick={() => handleBack(false)}
            className={styles.iconBack}
          />
          <h1 className={styles.username}>Contacts</h1>
        </Col>
        <Col className={styles.rowHeaderInfoCard1}>
          <Form.Group className={styles.formGroup}>
            <InputGroup>
              <Button variant="fff" className={styles.buttonSearch}>
                <Image src={Search} className={styles.iconSearch} />
              </Button>
              <Form.Control
                type="text"
                placeholder="Type your name friend..."
                className={styles.placeholder}
                name="search"
                value={search}
                onChange={(event) => changeInputSearch(event)}
              />
            </InputGroup>
          </Form.Group>
          <Button
            variant="fff"
            className={styles.buttonContact}
            onClick={() => getDataContact()}
          >
            <Image src={Contact} />
          </Button>
        </Col>
        {contact.length > 0
          ? contact.map((item, index) => {
              return (
                <Col key={index}>
                  <AllContact contactList={item} />
                </Col>
              );
            })
          : ""}
      </Col>
    </>
  );
}

export default Contact;
