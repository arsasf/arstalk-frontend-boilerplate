import { useState } from "react";
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
  ButtonGroup,
  Modal,
} from "react-bootstrap";
import Setting from "../../../assets/img/setting.png";
import Contact from "../../../assets/img/contact.png";
import InviteFriends from "../../../assets/img/invite-friends.png";
import FAQ from "../../../assets/img/FAQ.png";
import Search from "../../../assets/img/Search.png";
import Plus from "../../../assets/img/Plus.png";
import ImgProfile from "../../../assets/img/img-profile.png";
import Back from "../../../assets/img/back.png";
import Key from "../../../assets/img/key.png";
import Logout from "../../../assets/img/logout.png";
import Information from "../../../assets/img/info.png";
import Chat from "../../../assets/img/chat (1).png";
import Menu from "../../../assets/img/menu.png";
import Emoticon from "../../../assets/img/emoticon.png";
import Video from "../../../assets/img/video.png";
import Images from "../../../assets/img/Image.png";
import Documents from "../../../assets/img/Documents.png";
import Locations from "../../../assets/img/Location.png";

function ArsTalk(props) {
  const [setting, setSetting] = useState(false);
  const [contact, setContact] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  const [chat, setChat] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [bubleMessage, setBubleMessage] = useState(false);
  const [accountContact, setAccountContact] = useState(false);
  const [tabLocation, setTabLocation] = useState(false);
  const [tabImage, setTabImage] = useState(false);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const handleClose = () => setShow(false);
  const [form, setForm] = useState({
    fullName: "Gloria Mckinney",
    username: "@wdlam",
    phone: "+375(29)9638433",
    bio: "I’m Senior Frontend Developer from Microsoft",
  });

  const handleSettings = (param1, param2, param3, param4, param5) => {
    setSetting(param1);
    setContact(param2);
    setAddFriend(param3);
    setChat(param4);
    setChangePassword(param5);
  };

  const changeText = (event) => {
    console.log({ [event.target.name]: event.target.value });
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const updateData = () => {
    alert("if back, your data will be updating");
    console.log("update data running");
    // console.log(form);
    setSetting(false);
  };

  const showMessage = (param1, param2) => {
    setBubleMessage(param1);
    setAccountContact(param2);
  };

  const showTabAccount = (param1, param2) => {
    setTabLocation(param1);
    setTabImage(param2);
  };

  const handleLogout = () => {
    setShow(true);
    setMsg("Success Logout !");
    setInfo("LOGOUT");
    setTimeout(() => {
      localStorage.clear();
      props.history.push("/");
    }, 3000);
  };

  // console.log( props);
  return (
    <Container fluid className={styles.container}>
      <Modal show={show} className={styles.modal}>
        <Modal.Header className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>INFO {info}</Modal.Title>
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
                  <Dropdown.Item
                    onClick={() =>
                      handleSettings(true, false, false, false, false)
                    }
                    className={styles.listSort}
                  >
                    <Image src={Setting} className={styles.icon} />
                    <p className={styles.textIcon}>Settings</p>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listSort}
                    onClick={() =>
                      handleSettings(true, true, false, false, false)
                    }
                  >
                    <Image src={Contact} className={styles.icon} />
                    <p className={styles.textIcon}>Contacts</p>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listSort}
                    onClick={() =>
                      handleSettings(true, true, true, false, false)
                    }
                  >
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
              <Button
                variant="fff"
                className={styles.buttonPlus}
                onClick={() => handleSettings(true, true, true, true, false)}
              >
                <Image src={Plus} />
              </Button>
            </Col>
            <Button
              variant="fff"
              className={styles.rowHeaderInfoCard2}
              onClick={() => showMessage(true, false)}
            >
              <Image src={ImgProfile} className={styles.iconFriend} />
              <Col className={styles.colRoom}>
                <Col className={styles.titleNameTime}>
                  <p className={styles.nameReceiver}>Nama Receiver</p>
                  <p className={styles.time}>Time</p>
                </Col>
                <Col className={styles.titleNameTime}>
                  <p className={styles.messageReceiver}>Message Receiver</p>
                  <p className={styles.boxNotif}>5</p>
                </Col>
              </Col>
            </Button>
          </Col>
        ) : contact === false ? (
          <Col lg={4} className={styles.left}>
            <Col className={styles.rowHeaderInfoCard3}>
              <Image
                src={Back}
                onClick={() => updateData()}
                className={styles.iconBack}
              />
              <h1 className={styles.username}>@wdlam</h1>
            </Col>
            <Col className={styles.rowHeaderInfoCard4}>
              <Form.Group className={styles.formUserImage}>
                <Form.Label htmlFor="files" className={styles.boxUpdateImage}>
                  Jangan di hapus !
                </Form.Label>
                <Form.Control
                  type="file"
                  id="files"
                  // onChange={(event) => this.handleImage(event)}
                  className={styles.updateImage}
                />
                <Image src={ImgProfile} className={styles.profileUser} />
              </Form.Group>
              <Form.Control
                className={styles.placeholderFullname}
                name="fullName"
                value={form.fullName}
                onChange={(event) => changeText(event)}
              />
              <p className={styles.usernameProfile}>@wdlam</p>
            </Col>
            <Col className={styles.rowHeaderInfoCard5}>
              <p className={styles.account}>Account</p>
              <Form.Control
                className={styles.placeholderPhone}
                name="phone"
                placeholder="input phone number"
                value={form.phone}
                onChange={(event) => changeText(event)}
              />
              <p className={styles.changePhone}>Tap to change phone number</p>
            </Col>
            <Col className={styles.rowHeaderInfoCard5}>
              <hr className={styles.lineAccount} />
              <Form.Control
                className={styles.placeholderUsername}
                name="username"
                placeholder="input username"
                value={form.username}
                onChange={(event) => changeText(event)}
              />
              <p className={styles.titleInputUsername}>username</p>
              <hr className={styles.lineAccount} />
            </Col>
            <Col className={styles.rowHeaderInfoCard5}>
              <Form.Control
                className={styles.placeholderBio}
                name="bio"
                placeholder="input biodata"
                value={form.bio}
                onChange={(event) => changeText(event)}
              />
              <p className={styles.titleInputBio}>Bio</p>
            </Col>
            <Col className={styles.rowHeaderInfoCard5}>
              <p className={styles.userSetting}>Settings</p>
              <Col
                className={styles.colChangeLogout}
                onClick={() => handleSettings(true, true, true, true, true)}
              >
                <Image src={Key} className={styles.iconChange} />
                <p className={styles.titleUserSetting}>Change Password</p>
              </Col>
              <Col className={styles.colChangeLogout} onClick={handleLogout}>
                <Image src={Logout} className={styles.iconChange} />
                <p className={styles.titleUserSetting}>Logout</p>
              </Col>
            </Col>
          </Col>
        ) : addFriend === false ? (
          <Col lg={4} className={styles.left}>
            <Col className={styles.rowHeaderInfoCard3}>
              <Image
                src={Back}
                onClick={() => updateData()}
                className={styles.iconBack}
              />
              <h1 className={styles.username}>@wdlam</h1>
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
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Button variant="fff" className={styles.rowHeaderInfoCard6}>
              <Image src={ImgProfile} className={styles.iconFriend} />
              <Col className={styles.colRoom1}>
                <p className={styles.contactName}>Name Receiver</p>
                <Button
                  variant="fff"
                  className={styles.buttonImgContact}
                  onClick={() => showMessage(true, true)}
                >
                  <Image src={Information} />
                </Button>
              </Col>
            </Button>
          </Col>
        ) : chat === false ? (
          <Col lg={4} className={styles.left}>
            <Col className={styles.rowHeaderInfoCard3}>
              <Image
                src={Back}
                onClick={() => updateData()}
                className={styles.iconBack}
              />
              <h1 className={styles.username}>@wdlam</h1>
            </Col>
            <Col className={styles.rowHeaderInfoCard1}>
              <Form.Group className={styles.formGroup}>
                <InputGroup>
                  <Button variant="fff" className={styles.buttonSearch}>
                    <Image src={Search} className={styles.iconSearch} />
                  </Button>
                  <Form.Control
                    type="text"
                    placeholder="Type your friend's email..."
                    className={styles.placeholder}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Button variant="fff" className={styles.rowHeaderInfoCard6}>
              <Image src={ImgProfile} className={styles.iconFriend} />
              <Col className={styles.colRoom1}>
                <p className={styles.contactName}>Name Receiver</p>
                <Button variant="fff" className={styles.bgImgAddFriend}>
                  <Image src={InviteFriends} />
                </Button>
              </Col>
            </Button>
          </Col>
        ) : changePassword === false ? (
          <Col lg={4} className={styles.left}>
            <Col className={styles.rowHeaderInfoCard3}>
              <Image
                src={Back}
                onClick={() => updateData()}
                className={styles.iconBack}
              />
              <h1 className={styles.username}>@wdlam</h1>
            </Col>
            <Col className={styles.rowHeaderInfoCard1}>
              <Form.Group className={styles.formGroup}>
                <InputGroup>
                  <Button variant="fff" className={styles.buttonSearch}>
                    <Image src={Search} className={styles.iconSearch} />
                  </Button>
                  <Form.Control
                    type="text"
                    placeholder="Type your friend's name..."
                    className={styles.placeholder}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Button variant="fff" className={styles.rowHeaderInfoCard6}>
              <Image src={ImgProfile} className={styles.iconFriend} />
              <Col className={styles.colRoom1}>
                <p className={styles.contactName}>Name Receiver</p>
                <Button variant="fff" className={styles.bgImgAddFriend}>
                  <Image src={Chat} />
                </Button>
              </Col>
            </Button>
          </Col>
        ) : (
          <Col lg={4} className={styles.left}>
            <Col className={styles.rowHeaderInfoCard3}>
              <Image
                src={Back}
                onClick={() => updateData()}
                className={styles.iconBack}
              />
              <h1 className={styles.username}>@wdlam</h1>
            </Col>
            <Col className={styles.rowHeaderInfoCard7}>
              <Form.Group className={styles.formGroupPassword}>
                <Form.Label className={styles.textLabel}>
                  New Password
                </Form.Label>
                <Form.Control
                  type="Password"
                  placeholder="Enter New Password"
                  // value={username}
                  // onChange={(event) => changeText(event)}
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
                <Button
                  className={styles.buttonLogin}
                  variant="fff"
                  type="submit"
                >
                  Login
                </Button>
              </Col>
            </Col>
          </Col>
        )}

        {bubleMessage === false ? (
          <Col lg={8} className={styles.right}>
            <p className={styles.textSelect}>
              Please select a chat to start messaging
            </p>
          </Col>
        ) : accountContact === false ? (
          <Col lg={8} className={styles.right}>
            <Col className={styles.rightProfile}>
              <Col className={styles.rowHeaderInfoCard8} lg={11}>
                <Image src={ImgProfile} className={styles.iconFriend} />
                <Col className={styles.colRoom2}>
                  <p className={styles.contactNameRight}>Name Receiver</p>
                  <p className={styles.online}>Online</p>
                </Col>
              </Col>
              <Col lg={1}>
                <Button
                  variant="fff"
                  className={styles.colMenu}
                  onClick={() => showMessage(true, true)}
                >
                  <Image src={Menu} className={styles.menu} />
                </Button>
              </Col>
            </Col>
            <Col className={styles.colright}>
              <Row className={styles.buble}>
                <Col className={styles.colRightLeft}>
                  <p className={styles.bubleReceiver}>
                    <Image
                      src={ImgProfile}
                      className={styles.iconBubleReceiver}
                    />
                    <p className={styles.bubleMessageReceiver}>
                      Hello ! How are you today?
                      <p className={styles.timeBubleReceiver}>08:00</p>
                    </p>
                  </p>
                  <p className={styles.bubleSender}>
                    <Image
                      src={ImgProfile}
                      className={styles.iconBubleSender}
                    />
                    <p className={styles.bubleMessageSender}>
                      Hi, not bad...
                      <p className={styles.timeBubleSender}>08:05</p>
                    </p>
                  </p>
                </Col>
              </Row>
            </Col>
            <Col className={styles.rowHeaderInfoCard9}>
              <Form.Group className={styles.formGroupRight}>
                <InputGroup className={styles.inputGroupRight}>
                  <Form.Control
                    type="text"
                    placeholder="Type Your Message..."
                    className={styles.placeholderRight}
                  />
                  <p className={styles.colAttachment}>
                    <Dropdown className={styles.dropdownSort}>
                      <Dropdown.Toggle
                        variant="#fff"
                        title="sort"
                        id="dropdown-basic"
                        className={styles.titleSort}
                      >
                        <Image src={Plus} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        align="left"
                        className={styles.menuDropdownRight}
                      >
                        <Dropdown.Item className={styles.listSort}>
                          <Image src={Images} className={styles.icon} />
                          <p className={styles.textIcon}>Image</p>
                        </Dropdown.Item>
                        <Dropdown.Item className={styles.listSort}>
                          <Image src={Documents} className={styles.icon} />
                          <p className={styles.textIcon}>Documents</p>
                        </Dropdown.Item>
                        <Dropdown.Item className={styles.listSort}>
                          <Image src={Contact} className={styles.icon} />
                          <p className={styles.textIcon}>Contact</p>
                        </Dropdown.Item>
                        <Dropdown.Item className={styles.listSort}>
                          <Image src={Locations} className={styles.icon} />
                          <p className={styles.textIcon}>Location</p>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Image src={Emoticon} className={styles.emoticon} />
                    <Image src={Video} className={styles.video} />
                  </p>
                </InputGroup>
              </Form.Group>
            </Col>
          </Col>
        ) : (
          <Col lg={8} className={styles.right}>
            <Col className={styles.rightProfileAccount}>
              <Col className={styles.rowHeaderInfoCard8} lg={12}>
                <Image src={ImgProfile} className={styles.iconFriend} />
                <Col className={styles.colRoom2}>
                  <p className={styles.contactNameRight}>Name Receiver</p>
                  <p className={styles.online}>Online</p>
                </Col>
              </Col>
            </Col>
            <Col className={styles.colright} lg={8}>
              <Row className={styles.buble}>
                <Col className={styles.colRightLeft}>
                  <p className={styles.bubleReceiver}>
                    <Image
                      src={ImgProfile}
                      className={styles.iconBubleReceiver}
                    />
                    <p className={styles.bubleMessageReceiver}>
                      Hello ! How are you today?
                      <p className={styles.timeBubleReceiver}>08:00</p>
                    </p>
                  </p>
                  <p className={styles.bubleSender}>
                    <Image
                      src={ImgProfile}
                      className={styles.iconBubleSender}
                    />
                    <p className={styles.bubleMessageSender}>
                      Hi, not bad...
                      <p className={styles.timeBubleSender}>08:05</p>
                    </p>
                  </p>
                </Col>
              </Row>
            </Col>
            <Col className={styles.colRightContact}>
              <Row className={styles.right}>
                <Col className={styles.colAccountContact}>
                  <Col className={styles.rowHeaderInfoCard11}>
                    <Image
                      src={Back}
                      onClick={() => showMessage(true, false)}
                      className={styles.iconBack}
                    />
                    <h1 className={styles.username}>@wdlam</h1>
                  </Col>
                  <Col className={styles.rowHeaderInfoCard4}>
                    <Image
                      src={ImgProfile}
                      className={styles.profileUserFriend}
                    />
                    <Row className={styles.rowInfoAccountFriend}>
                      <Col lg={10} className={styles.colNameAccout}>
                        <p className={styles.friendsName}>Name Friend</p>
                        <p className={styles.friendOnline}>Online</p>
                      </Col>
                      <Col lg={2} className={styles.colMenuAccout}>
                        <Image src={Menu} />
                      </Col>
                    </Row>
                  </Col>
                  <Col className={styles.rowHeaderInfoCard12}>
                    <p className={styles.friendsPhone}>Phone Number</p>
                    <p>+375(29)92390038</p>
                    <hr className={styles.lineAccount} />
                  </Col>
                  <Col className={styles.rowHeaderInfoCard13}>
                    <Col className={styles.buttonGroupAccount}>
                      <ButtonGroup className={styles.boxButtonGroup}>
                        <Button
                          variant="fff"
                          className={styles.buttonAccount}
                          onClick={() => showTabAccount(false, false)}
                        >
                          Location
                        </Button>
                        <Button
                          variant="fff"
                          className={styles.buttonAccount}
                          onClick={() => showTabAccount(true, false)}
                        >
                          Image
                        </Button>
                        <Button
                          variant="fff"
                          className={styles.buttonAccount}
                          onClick={() => showTabAccount(true, true)}
                        >
                          Documents
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Col>
                  {tabLocation === false ? (
                    <Col className={styles.rowHeaderInfoCard13}>
                      <p className={styles.tabAccountProfile}>
                        This is location
                      </p>
                    </Col>
                  ) : tabImage === false ? (
                    <Col className={styles.rowHeaderInfoCard13}>
                      <p className={styles.tabAccountProfile}>This is Image</p>
                    </Col>
                  ) : (
                    <Col className={styles.rowHeaderInfoCard13}>
                      <p className={styles.tabAccountProfile}>
                        This is Documents
                      </p>
                    </Col>
                  )}
                </Col>
              </Row>
            </Col>
            <Col className={styles.rowHeaderInfoCard10} lg={8}>
              <Form.Group className={styles.formGroupRight}>
                <InputGroup className={styles.inputGroupRight}>
                  <Form.Control
                    type="text"
                    placeholder="Type Your Message..."
                    className={styles.placeholderRight}
                  />
                  <p className={styles.colAttachment}>
                    <Dropdown className={styles.dropdownSort}>
                      <Dropdown.Toggle
                        variant="#fff"
                        title="sort"
                        id="dropdown-basic"
                        className={styles.titleSort}
                      >
                        <Image src={Plus} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        align="left"
                        className={styles.menuDropdownRight}
                      >
                        <Dropdown.Item className={styles.listSort}>
                          <Image src={Images} className={styles.icon} />
                          <p className={styles.textIcon}>Image</p>
                        </Dropdown.Item>
                        <Dropdown.Item className={styles.listSort}>
                          <Image src={Documents} className={styles.icon} />
                          <p className={styles.textIcon}>Documents</p>
                        </Dropdown.Item>
                        <Dropdown.Item className={styles.listSort}>
                          <Image src={Contact} className={styles.icon} />
                          <p className={styles.textIcon}>Contact</p>
                        </Dropdown.Item>
                        <Dropdown.Item className={styles.listSort}>
                          <Image src={Locations} className={styles.icon} />
                          <p className={styles.textIcon}>Location</p>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Image src={Emoticon} className={styles.emoticon} />
                    <Image src={Video} className={styles.video} />
                  </p>
                </InputGroup>
              </Form.Group>
            </Col>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default ArsTalk;
