const {
  Container,
  Col,
  Button,
  Dropdown,
  Form,
  InputGroup,
} = require("react-bootstrap");
const styles = require("./Chat.module.css");
const {
  Gear,
  List,
  User,
  UserPlus,
  Question,
  Plus,
  MagnifyingGlass,
} = require("phosphor-react");
const { useState } = require("react");

function Chat(props) {
  console.log(props);
  return (
    <>
      <Container fluid className={styles.fullArea}>
        <Col lg={4} md={12} sm={12} xs={12} className={`${styles.left}`}>
          <div className={styles.navMenu}>
            <h3>ArsTalk</h3>
            <Dropdown className={styles.dropdownSort}>
              <Dropdown.Toggle variant="#fff" className={styles.titleSort}>
                <List size={30} color="#7e98df" />
              </Dropdown.Toggle>
              <Dropdown.Menu align="right" className={styles.menuDropdown}>
                <Dropdown.Item className={styles.listSort}>
                  <Gear size={25} color="white" />
                  <p className={styles.textIcon}>Settings</p>
                </Dropdown.Item>
                <Dropdown.Item className={styles.listSort}>
                  <User size={25} color="white" />
                  <p className={styles.textIcon}>Contacts</p>
                </Dropdown.Item>
                <Dropdown.Item className={styles.listSort}>
                  <UserPlus size={25} color="white" />
                  <p className={styles.textIcon}>Invite Friends</p>
                </Dropdown.Item>
                <Dropdown.Item className={styles.listSort}>
                  <Question size={25} color="white" />
                  <p className={styles.textIcon}>ArsTalk FAQ</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className={styles.navSearch}>
            <Form.Group className={styles.formGroup}>
              <InputGroup>
                <Button variant="fff" className={styles.buttonSearch}>
                  <MagnifyingGlass size={30} color="#7e98df" />
                </Button>
                <Form.Control
                  type="text"
                  placeholder="Type Your Message..."
                  className={styles.placeholder}
                />
              </InputGroup>
            </Form.Group>
            <Button variant="fff" className={styles.buttonPlus}>
              <Plus size={30} color="#7e98df" />
            </Button>
          </div>
        </Col>
      </Container>
    </>
  );
}

export default Chat;
