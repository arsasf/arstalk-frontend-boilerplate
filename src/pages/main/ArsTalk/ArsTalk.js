import { useState } from "react";
// import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";
import styles from "./ArsTalk.module.css";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Image,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import Setting from "../../../assets/img/setting.png";
import Contact from "../../../assets/img/contact.png";
import InviteFriends from "../../../assets/img/invite-friends.png";
import FAQ from "../../../assets/img/FAQ.png";
import Search from "../../../assets/img/Search.png";
import Plus from "../../../assets/img/Plus.png";
import ImgProfile from "../../../assets/img/img-profile.png";

function ArsTalk(props) {
  const [setting, setSetting] = useState(false);

  const handleSettings = (params) => {
    setSetting(true);
  };
  console.log(setting);
  return (
    <Container fluid className={styles.container}>
      <Row>
        {setting === false ? (
          <Col lg={4} className={`${styles.left}`}>
            <Col className={styles.rowHeaderInfoCard}>
              <Link to="#" className={styles.infoCard}>
                ArsTalk
              </Link>
              <Dropdown className={styles.dropdownSort}>
                <Dropdown.Toggle
                  variant="#fff"
                  title="sort"
                  id="dropdown-basic"
                  className={styles.titleSort}
                >
                  <span className={styles.line}></span>
                  <span className={styles.lineMid}></span>
                  <span className={styles.line}></span>
                </Dropdown.Toggle>
                <Dropdown.Menu align="right" className={styles.menuDropdown}>
                  <Dropdown.Item className={styles.listSort}>
                    <Image src={Setting} className={styles.icon} />
                    <p
                      className={styles.textIcon}
                      onClick={handleSettings(true)}
                    >
                      Settings
                    </p>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.listSort}>
                    <Image src={Contact} className={styles.icon} />
                    <p className={styles.textIcon}>Contacts</p>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.listSort}>
                    <Image src={InviteFriends} className={styles.icon} />
                    <p className={styles.textIcon}>Invite Friends</p>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.listSort}>
                    <Image src={FAQ} className={styles.icon} />
                    <p className={styles.textIcon}>Telegram FAQ</p>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
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
              <Button variant="fff" className={styles.buttonPlus}>
                <Image src={Plus} />
              </Button>
            </Col>
            <Button variant="fff" className={styles.rowHeaderInfoCard2}>
              <Image src={ImgProfile} className={styles.iconFriend} />
              <Col className={styles.colRoom}>
                <Col className={styles.titleNameTime}>
                  <p className={styles.nameReceiver}>Nama Receiver</p>
                  <p classname={styles.time}>Time</p>
                </Col>
                <Col className={styles.titleNameTime}>
                  <p className={styles.messageReceiver}>Message Receiver</p>
                  <p className={styles.boxNotif}>5</p>
                </Col>
              </Col>
            </Button>
          </Col>
        ) : (
          <Col lg={4}> ini col</Col>
        )}

        <Col lg={8} className={styles.right}>
          <p className={styles.textSelect}>
            Please select a chat to start messaging
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default ArsTalk;
