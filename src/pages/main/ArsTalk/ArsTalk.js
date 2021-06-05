//! ============================== ARSTALK ======================== */

//* =========================== Import React ====================== */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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
//* ============================ End =============================== */

//* ===================== Import REDUX ACTION ====================== */
import { logout } from "../../../redux/action/auth";
import {
  foundUserByEmail,
  addFriendContact,
  deleteContact,
  getAllcontact,
  getContactId,
} from "../../../redux/action/contact";
import { getUserById, updateProfile } from "../../../redux/action/user";
import { getAllRoomChat } from "../../../redux/action/roomchat";
import {
  getHistoryChat,
  sendChat,
  getHistoryChatById,
} from "../../../redux/action/chat";
//* ================================= End ========================== */

//* ============================ Import CSS STYLE ================== */
import styles from "./ArsTalk.module.css";
//* ================================== End ========================= */

//* ============================ Import Image ====================== */
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
import Menu from "../../../assets/img/menu.png";
import Emoticon from "../../../assets/img/emoticon.png";
import Video from "../../../assets/img/video.png";
import Images from "../../../assets/img/Image.png";
import Documents from "../../../assets/img/Documents.png";
import Locations from "../../../assets/img/Location.png";
import ProfileDefault from "../../../assets/img/img-not-found.png";
import PageSearch from "../../../assets/img/chat.png";
//* =========================== End ================================ */

//* ================ Import Component ============================== */
import AllContact from "../../../components/AllContact/AllContact";
import ChatBubleComponent from "../../../components/ChatBuble/ChatBuble";
//* =============================== End ============================ */

function ArsTalk(props) {
  //* ================= State for side Left ====================== */
  const [setting, setSetting] = useState(false);
  const [contact, setContact] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  const [chat, setChat] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeButtonFriend, setChangeButtonFriend] = useState(false);
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [pageAddFriend, setPageAddFriend] = useState(false);
  //* ==================== End =================================== */

  //*======================= State Menu side right =============== */
  const [bubleMessage, setBubleMessage] = useState(false);
  const [accountContact, setAccountContact] = useState(false);
  const [tabLocation, setTabLocation] = useState(false);
  const [tabImage, setTabImage] = useState(false);
  //* ============================ End =========================== */

  //* =================== State Modal Integration ================ */
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const handleClose = () => setShow(false);
  //* =========================== End ============================ */

  //* ====================== State Integration CRUD ============== */
  const [form, setForm] = useState({
    userImage: `${process.env.REACT_APP_IMAGE_URL}${props.user.data.image}`,
    userFullname: props.user.data.user_fullname,
    userPhone: props.user.data.user_phone,
    userName: props.user.data.user_name,
    userBio: props.user.data.user_bio,
    image: props.user.data.image,
  });

  const [formChat, setFormChat] = useState({
    room_chat: null,
    receiver_id: null,
    image: "",
  });

  const [message, setMessage] = useState("");

  //* ============================== End ========================= */

  useEffect(() => {
    console.log("GET DATA RUNNING");
    getData();
    getDataContact();
    getRoomChat();
    getAllHistoryChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //* ======================Integration User ====================== */
  const getData = () => {
    const id = props.auth.data.user_id;
    props
      .getUserById(id)
      .then((result) => {
        setShow(false);
        setInfo("GET DATA");
        setMsg(result.value.data.msg);
        props.history.push("/arstalk");
      })
      .catch((err) => {
        setShow(false);
        setMsg(err.response.data.msg);
        props.history.push("/arstalk");
      });
  };

  const resetImage = () => {
    setForm({
      ...form,
      userImage: `${process.env.REACT_APP_IMAGE_URL}${props.user.data.image}`,
      image: null,
    });
  };

  const handleImage = (event) => {
    setForm({
      ...form,
      userImage: URL.createObjectURL(event.target.files[0]),
      image: event.target.files[0],
    });
    const id = props.auth.data.user_id;
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    //* ==================== Check Form Data ===================== */
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    //* ======================== End ============================== */

    props
      .updateProfile(id, formData)
      .then((result) => {
        setShow(true);
        setInfo("UPDATE PROFILE IMAGE");
        setMsg(result.value.data.msg);
        props.getUserById(id);
        setTimeout(() => {
          setShow(false);
          props.history.push("/arstalk");
        }, 5000);
      })
      .catch((err) => {
        setShow(true);
        setInfo("ERROR : UPDATE IMAGE PROFILE");
        setMsg(err.response.data.msg);
        resetImage();
        setTimeout(() => {
          setShow(false);
          props.getUserById(id);
          props.history.push("/arstalk");
        }, 5000);
      });
  };

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setUpdate(true);
  };

  const resetData = () => {
    setForm({
      ...form,
      userFullname: props.user.data.user_fullname,
      userPhone: props.user.data.user_phone,
      userName: props.user.data.user_name,
      userBio: props.user.data.user_bio,
    });
  };

  const updateData = () => {
    const id = props.auth.data.user_id;
    const formData = new FormData();
    formData.append("userFullname", form.userFullname);
    formData.append("userPhone", form.userPhone);
    formData.append("userName", form.userName);
    formData.append("userBio", form.userBio);

    //* ==================== Check Form Data ===================== */
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    //* ======================== End ============================== */

    props
      .updateProfile(id, formData)
      .then((result) => {
        setShow(true);
        setInfo("UPDATE BIODATA PROFILE");
        setMsg(result.value.data.msg);
        setUpdate(false);
        setTimeout(() => {
          setShow(false);
          props.getUserById(id);
          props.history.push("/arstalk");
        }, 2000);
      })
      .catch((err) => {
        setShow(true);
        setInfo("UPDATE BIODATA PROFILE");
        setMsg(err.response.data.msg);
        resetData();
        props.history.push("/arstalk");
      });
  };

  const handleLogout = () => {
    const id = props.auth.data.user_id;
    props
      .logout(id)
      .then((result) => {
        setShow(true);
        setInfo("LOGOUT");
        setMsg(result.value.data.msg);
        setTimeout(() => {
          props.history.push("/");
          localStorage.clear();
        }, 5000);
      })
      .catch((err) => {
        setShow(true);
        setMsg(err.response.data.msg);
        props.history.push("/");
      });
  };

  //* ========================= End Integration User ============== */

  //*=============================== Contact ======================= */
  const getDataContact = () => {
    const id = props.auth.data.user_id;
    props
      .getAllcontact(id, search)
      .then((result) => {
        setSearch("");
        setShow(false);
        setInfo("GET DATA");
        setMsg(result.value.data.msg);
        props.history.push(`/arstalk`);
      })
      .catch((err) => {
        setSearch("");
        setShow(false);
        setMsg(err.response.data.msg);
        props.history.push("/arstalk");
      });
  };

  //?============= Integration Menu Contact and Search ============ ?/
  const handleSettings = (param1, param2, param3, param4, param5) => {
    setSetting(param1);
    setContact(param2);
    setAddFriend(param3);
    setChat(param4);
    setChangePassword(param5);
  };

  const changeInputSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleBack = (params) => {
    setSetting(params);
    setSearch("");
  };

  const showMessage = (param1, param2) => {
    setBubleMessage(param1);
    setAccountContact(param2);
  };

  const showTabAccount = (param1, param2) => {
    setTabLocation(param1);
    setTabImage(param2);
  };

  const foundUserByEmail = () => {
    const email = props.auth.data.user_email;
    props
      .foundUserByEmail(search)
      .then((result) => {
        if (search === email) {
          setChangeButtonFriend(true);
          setSearch("");
        } else {
          setChangeButtonFriend(false);
          setShow(false);
          setPageAddFriend(true);
          setError(false);
          setSearch("");
        }
      })
      .catch((err) => {
        setSearch("");
        setError(true);
        setShow(false);
        setMsg(err.response.data.msg);
      });
  };

  //?? ======= End Menu Integration Contact and Search ============ ?/

  //* ================ End Integration Contact ==================== */

  //* ================= Integration Room Chat ===================== */
  const getRoomChat = () => {
    const id = props.auth.data.user_id;
    props.getAllRoomChat(id);
  };
  //*======================== End ================================= */

  //* ================= Integration Chat ===================== */
  const getAllHistoryChat = () => {
    const id = props.auth.data.user_id;
    props.getHistoryChat(id);
  };

  const setDataChat = (param1, param2, param3) => {
    setFormChat({
      room_chat: param1,
      receiver_id: param2,
      image: param3,
    });
  };

  const changeMessage = (event) => {
    setMessage(event.target.value);
  };

  console.log(formChat);
  console.log(message);

  const handleAddMessage = () => {
    console.log("running send msg");
    const id = props.auth.data.user_id;
    const setData = {
      receiverId: formChat.receiver_id,
      message: message,
    };
    props
      .sendChat(id, setData)
      .then((result) => {
        setMessage("");
        setShow(false);
        setInfo("ADD ROOM CHAT");
        setMsg(result.value.data.msg);
        props.getHistoryChat(id);
      })
      .catch((err) => {
        setMessage("");
        setShow(true);
        setInfo("ERROR : ADD ROOM FRIEND");
        setMsg(err.response.data.msg);
      });
    console.log(id, setData);
  };

  const getChatRoomId = (room) => {
    console.log(room);
    const id = props.receiver_id;
    const setData = {
      room: formChat.room_chat,
    };
    console.log(setData);
    props
      .getHistoryChatById(id, setData)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //*======================== End ================================= */

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
        {/* // ! PROSES INTEGRASI CREATE ROOM CHAT == LIST ROOM CHAT ==*/}
        {setting === false ? (
          <Col lg={4} className={`${styles.left}`}>
            <Col className={styles.rowHeaderInfoCard}>
              <Link
                to="#"
                className={styles.infoCard}
                onClick={() => showMessage(false, false)}
              >
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
                    <p className={styles.textIcon}>ArsTalk FAQ</p>
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
                onClick={() => {
                  handleSettings(true, true, true, true, false);
                  getDataContact();
                }}
              >
                <Image src={Plus} />
              </Button>
            </Col>
            {props.roomchat.roomchat.map((item, index) => {
              return (
                <Col key={index}>
                  <AllContact
                    dataRoomChat={item}
                    showMessage={showMessage.bind()}
                    setData={setDataChat.bind()}
                    // dataChatHistoryId={getChatRoomId.bind()}
                  />
                </Col>
              );
            })}
          </Col>
        ) : //! INI SUDAH DI INTEGRASI == SETTINGS ==  (MINUS CHANGE PASSWORD)
        contact === false ? (
          <Col lg={4} className={styles.left}>
            <Col className={styles.rowHeaderInfoCard3}>
              <Image
                src={Back}
                onClick={() => handleBack(false)}
                className={styles.iconBack}
              />
              <h1 className={styles.username}>Account Settings</h1>
            </Col>
            <Col className={styles.rowHeaderInfoCard16}>
              <Form.Group className={styles.formUserImage}>
                <Form.Label htmlFor="files" className={styles.boxUpdateImage}>
                  Jangan di hapus !
                </Form.Label>
                <Form.Control
                  type="file"
                  id="files"
                  onChange={(event) => handleImage(event)}
                  className={styles.updateImage}
                />
                {form.image === "" ? (
                  <Image src={ProfileDefault} className={styles.profileUser} />
                ) : (
                  <Image src={form.userImage} className={styles.profileUser} />
                )}
              </Form.Group>
              <Form.Control
                className={styles.placeholderFullname}
                name="userFullname"
                value={form.userFullname}
                onChange={(event) => changeText(event)}
              />
              <p className={styles.usernameProfile}>{form.userName}</p>
            </Col>
            <Col className={styles.rowHeaderInfoCard5}>
              <p className={styles.account}>Account</p>
              <Form.Control
                className={styles.placeholderPhone}
                name="userPhone"
                placeholder="input phone number"
                value={form.userPhone}
                onChange={(event) => changeText(event)}
              />
              <p className={styles.changePhone}>Tap to change phone number</p>
            </Col>
            <Col className={styles.rowHeaderInfoCard5}>
              <hr className={styles.lineAccount} />
              <Form.Control
                className={styles.placeholderUsername}
                name="userName"
                placeholder="input username"
                value={form.userName}
                onChange={(event) => changeText(event)}
              />
              <p className={styles.titleInputUsername}>username</p>
              <hr className={styles.lineAccount} />
            </Col>
            <Col className={styles.rowHeaderInfoCard5}>
              <Form.Control
                className={styles.placeholderBio}
                name="userBio"
                placeholder="input biodata"
                value={form.userBio}
                onChange={(event) => changeText(event)}
              />
              <p className={styles.titleInputBio}>Bio</p>
            </Col>
            {update === true ? (
              <Col className={styles.boxButtonUpdate}>
                <Button
                  variant="dark"
                  className={styles.buttonCancel}
                  onClick={() => resetData()}
                >
                  Cancel
                </Button>
                <Button
                  variant="fff"
                  className={styles.buttonUpdate}
                  onClick={() => updateData()}
                >
                  Update Profile
                </Button>
              </Col>
            ) : (
              console.log(false)
            )}
            <Col className={styles.rowHeaderInfoCard5}>
              <p className={styles.userSetting}>Settings</p>
              <Col
                className={styles.colChangeLogout}
                onClick={() => handleSettings(true, true, true, true, true)}
              >
                <Image src={Key} className={styles.iconChange} />
                <p className={styles.titleUserSetting}>Change Password</p>
              </Col>
              <Col className={styles.colChangeLogout1} onClick={handleLogout}>
                <Image src={Logout} className={styles.iconChange} />
                <p className={styles.titleUserSetting}>Logout</p>
              </Col>
            </Col>
          </Col>
        ) : // ! INI SUDAH DI INTEGRASI == CONTACT == (FIX ALL)
        addFriend === false ? (
          <Col lg={4} className={styles.left}>
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
            {props.contact.contact.map((item, index) => {
              return (
                <Col key={index}>
                  <AllContact contactList={item} />
                </Col>
              );
            })}
          </Col>
        ) : // ! INI SUDAH DI INTEGRASI == ADD FRIEND == (FIX ALL)
        chat === false ? (
          <Col lg={4} className={styles.left}>
            <Col className={styles.rowHeaderInfoCard3}>
              <Image
                src={Back}
                onClick={() => handleBack(false)}
                className={styles.iconBack}
              />
              <h1 className={styles.username}>Add Friends</h1>
            </Col>
            <Col className={styles.rowHeaderInfoCard1}>
              <Form.Group className={styles.formGroup}>
                <InputGroup>
                  <Button variant="fff" className={styles.buttonSearch}>
                    <Image src={Search} className={styles.iconSearch} />
                  </Button>
                  <Form.Control
                    type="text"
                    placeholder="Type Your Friend's Email..."
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
                onClick={() => foundUserByEmail()}
              >
                <Image src={Contact} />
              </Button>
            </Col>
            {error === false ? (
              props.contact.contact.map((item, index) => {
                return (
                  <Col key={index}>
                    <AllContact
                      dataSearch={item}
                      search={search}
                      changeButtonFriend={changeButtonFriend}
                    />
                  </Col>
                );
              })
            ) : (
              <Col className={styles.colResponse}>
                <Image className={styles.textResponse} src={PageSearch} />
                <p className={styles.textResponse}>
                  {pageAddFriend === false
                    ? "Search your friend here ..."
                    : msg}
                </p>
              </Col>
            )}
          </Col>
        ) : //! INI SUDAH DI INTEGRASI == CHOOSE CONTACT FOR CHAT== (FIX ALL)
        changePassword === false ? (
          <Col lg={4} className={styles.left}>
            <Col className={styles.rowHeaderInfoCard3}>
              <Image
                src={Back}
                onClick={() => handleBack(false)}
                className={styles.iconBack}
              />
              <h1 className={styles.username}>Choose Contact</h1>
            </Col>
            <Col className={styles.rowHeaderInfoCard1}>
              <Form.Group className={styles.formGroup}>
                <InputGroup>
                  <Button variant="fff" className={styles.buttonSearch}>
                    <Image src={Search} className={styles.iconSearch} />
                  </Button>
                  <Form.Control
                    type="text"
                    placeholder="Type Your Friend's Name..."
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
            {props.contact.contact.map((item, index) => {
              return (
                <Col key={index}>
                  <AllContact
                    dataContact={item}
                    handleBack={handleBack.bind()}
                  />
                </Col>
              );
            })}
          </Col>
        ) : (
          //! BELUM DI INTEGRASI
          <Col lg={4} className={styles.left}>
            <Col className={styles.rowHeaderInfoCard3}>
              <Image
                src={Back}
                onClick={() => handleBack(false)}
                className={styles.iconBack}
              />
              <h1 className={styles.username}>{form.userName}</h1>
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

        {/* // ! BELUM DI INTEGRASI */}

        {bubleMessage === false ? (
          <Col lg={8} className={styles.right}>
            <p className={styles.textSelect}>
              Please select a chat to start messaging
            </p>
          </Col>
        ) : //! BELUM DI INTEGRASI
        accountContact === false ? (
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
                  {props.chat.chat.map((item, index) => {
                    if (item.room_chat === formChat.room_chat) {
                      return (
                        <Col key={index}>
                          <ChatBubleComponent
                            dataChatHistoryId={item}
                            formChat={formChat}
                          />
                        </Col>
                      );
                    } else {
                      // return (
                      //   <Col key={index}>
                      //     <ChatBubleComponent
                      //       dataChatHistoryId={item}
                      //       formChat={formChat}
                      //     />
                      //   </Col>
                      // );
                    }
                  })}
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
                    value={message}
                    onChange={(event) => changeMessage(event)}
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
              <Button
                variant="dark"
                type="submit"
                onClick={() => handleAddMessage()}
              >
                Send
              </Button>
            </Col>
          </Col>
        ) : (
          //! BELUM DI INTEGRASI
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
                      src={form.userImage}
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
                    <h1 className={styles.username}>{form.userName}</h1>
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

//* ================================= MapStateToProps=============== */
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  contact: state.contact,
  roomchat: state.roomchat,
  chat: state.chat,
});
//* ==================================== End ======================= */

//* ============================== MapDispatchToProps=============== */
const mapDispatchToProps = {
  logout,
  getUserById,
  updateProfile,
  foundUserByEmail,
  addFriendContact,
  deleteContact,
  getAllcontact,
  getContactId,
  getAllRoomChat,
  getHistoryChat,
  sendChat,
  getHistoryChatById,
};
//* ==================================== End ======================= */

export default connect(mapStateToProps, mapDispatchToProps)(ArsTalk);

//! ================================== END ARSTALK================== */
