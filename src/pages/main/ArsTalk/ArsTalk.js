//! ============================== ARSTALK ======================== */

//* =========================== Import React ====================== */
import React, { useState, useEffect } from "react";
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
  Toast,
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
import Contact from "../../../assets/img/contact.png";
import Plus from "../../../assets/img/Plus.png";
import ImgProfile from "../../../assets/img/img-profile.png";
import Back from "../../../assets/img/back.png";
import Menu from "../../../assets/img/menu.png";
import Emoticon from "../../../assets/img/emoticon.png";
import Video from "../../../assets/img/video.png";
import Images from "../../../assets/img/Image.png";
import Documents from "../../../assets/img/Documents.png";
import Locations from "../../../assets/img/Location.png";
//* =========================== End ================================ */

//* ================ Import Component ============================== */
import AllContact from "../../../components/AllContact/AllContact";
import NavMenu from "../../../components/NavMenu";
import MenuSearch from "../../../components/MenuSearch";
import MenuContact from "../../../components/Contact";
import MenuChat from "../../../components/Chat";
import MenuChangePassword from "../../../components/ChangePassword";
import MenuAddFriend from "../../../components/AddFriend";
import MenuAccountSetting from "../../../components/AccountSetting";
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
    receiver_name: "",
  });
  const [notif, setNotif] = useState({
    show: false,
  });
  const [typing, setTyping] = useState({ isTyping: false });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(
    props.chat.length > 0 ? props.chat : []
  );
  const [userOnline, setUserOnline] = useState([]);
  const [connectedRooms, setConnectedRooms] = useState({
    room: "",
    oldRoom: "",
    isChannel: false,
  });
  //* ============================== End ========================= */

  let [getData] = useState([]);
  let [getDataContact] = useState([]);
  let [getRoomChat] = useState([]);
  let [getAllHistoryChat] = useState([]);

  useEffect(() => {
    getData();
    getDataContact();
    getRoomChat();
    getAllHistoryChat();
    if (props.socket) {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getData,
    getDataContact,
    getRoomChat,
    getAllHistoryChat,
    props.socket,
    message,
  ]);
  const connect = () => {
    const id = props.auth.data.user_id;
    props.socket.emit("connect-server", id);
    props.socket.on("list-user-online", (listUserOnline) => {
      setUserOnline(listUserOnline);
    });
    props.socket.on("chat-message", (dataMessage) => {
      console.log();
      setMessages([...messages, dataMessage]);
    });
    props.socket.on("notif-message", (data) => {
      setNotif(data);
    });
    props.socket.on("typing-message", (data) => {
      setTyping(data);
    });
  };
  //* ======================Integration User ====================== */
  getData = () => {
    const id = props.auth.data.user_id;
    props
      .getUserById(id)
      .then((result) => {
        props.history.push("/arstalk");
      })
      .catch((err) => {
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
      userImage: URL.createObjectURL(event),
      image: event,
    });
    const id = props.auth.data.user_id;
    const formData = new FormData();
    formData.append("image", event);

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
    console.log(event);
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
        props.socket.emit("disconnect-server", {
          id,
          room: connectedRooms.room,
        });
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
  getDataContact = () => {
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
  getRoomChat = () => {
    const id = props.auth.data.user_id;
    props.getAllRoomChat(id);
  };
  //*======================== End ================================= */

  //* ================= Integration Chat ===================== */
  getAllHistoryChat = () => {
    const id = props.auth.data.user_id;
    props.getHistoryChat(id);
  };

  const setDataChat = (param1, param2, param3, param4) => {
    props.socket.emit("join-room", {
      room: param1,
      oldRoom: connectedRooms.oldRoom,
    });
    setFormChat({
      room_chat: param1,
      receiver_id: param2,
      image: param3,
      receiver_name: param4,
    });
    setConnectedRooms({ ...connectedRooms, room: param1, oldRoom: param1 });
    console.log(props);

    props
      .getHistoryChatById(param1)
      .then((res) => {
        setMessages(res.value.data.data);
      })
      .catch((err) => {
        setMessages([]);
      });
  };

  const changeMessage = (event) => {
    setMessage(event.target.value);
    props.socket.emit("typing-message", {
      room: connectedRooms.room,
      isTyping: true,
    });
  };

  const handleAddMessage = (param) => {
    const id = props.auth.data.user_id;
    const data = {
      room: connectedRooms.room,
      senderId: id,
      receiverId: formChat.receiver_id,
      image: props.auth.data.image,
      message: param,
      show: true,
      username: props.auth.data.user_fullname,
    };

    props.socket.emit("send-message", data);
    props.socket.emit("notif-message", data);
    props.sendChat(data);
    setMessage("");
  };

  const handleStopTyping = () => {
    setTimeout(() => {
      props.socket.emit("typing-message", {
        room: connectedRooms.room,
        isTyping: false,
      });
    }, 3000);
  };
  //*======================== End ================================= */

  return (
    <Container fluid className={styles.container}>
      {console.log(notif.show)}
      <div className={styles.boxToast}>
        <Toast
          onClose={() => setNotif({ ...notif, show: false })}
          show={notif.show}
          delay={3000}
          autohide
          className={styles.toast}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">{notif.username}'s Message</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body className={styles.bodyToast}>{notif.message}</Toast.Body>
        </Toast>
      </div>
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
          <Col lg={4} md={12} sm={12} xs={12} className={`${styles.left}`}>
            <NavMenu
              showMessage={showMessage.bind()}
              handleSettings={handleSettings.bind()}
            />
            <MenuSearch
              handleSettings={handleSettings.bind()}
              getDataContact={getDataContact.bind()}
            />
            {props.roomchat.roomchat.map((item, index) => {
              return (
                <Col key={index}>
                  <AllContact
                    dataRoomChat={item}
                    showMessage={showMessage.bind()}
                    setData={setDataChat.bind()}
                  />
                </Col>
              );
            })}
          </Col>
        ) : //! INI SUDAH DI INTEGRASI == SETTINGS ==  (MINUS CHANGE PASSWORD)
        contact === false ? (
          <Col lg={4} md={12} sm={12} xs={12} className={styles.left}>
            <MenuAccountSetting
              handleBack={handleBack.bind()}
              handleImage={handleImage.bind()}
              handleSettings={handleSettings.bind()}
              handleLogout={handleLogout.bind()}
              changeText={changeText.bind()}
              user={props.user}
              form={form}
              update={update}
              resetData={resetData.bind()}
              updateData={updateData.bind()}
            />
          </Col>
        ) : // ! INI SUDAH DI INTEGRASI == CONTACT == (FIX ALL)
        addFriend === false ? (
          <MenuContact
            handleBack={handleBack.bind()}
            search={search}
            changeInputSearch={changeInputSearch.bind()}
            getDataContact={getDataContact.bind()}
            contact={props.contact.contact}
          />
        ) : // ! INI SUDAH DI INTEGRASI == ADD FRIEND == (FIX ALL)
        chat === false ? (
          <MenuAddFriend
            handleBack={handleBack.bind()}
            search={search}
            changeInputSearch={changeInputSearch.bind()}
            foundUserByEmail={foundUserByEmail.bind()}
            error={error}
            changeButtonFriend={changeButtonFriend}
            pageAddFriend={pageAddFriend}
            msg={msg}
            contact={props.contact.contact}
          />
        ) : //! INI SUDAH DI INTEGRASI == CHOOSE CONTACT FOR CHAT== (FIX ALL)
        changePassword === false ? (
          <MenuChat
            handleBack={handleBack.bind()}
            search={search}
            changeInputSearch={changeInputSearch.bind()}
            getDataContact={getDataContact.bind()}
            contact={props.contact.contact}
          />
        ) : (
          //! BELUM DI INTEGRASI

          <MenuChangePassword handleBack={handleBack.bind()} form={form} />
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
          <Col lg={8} md={12} xs={12} sm={12} className={styles.right}>
            <Col className={styles.rightProfile}>
              <Col
                className={styles.rowHeaderInfoCard8}
                lg={11}
                md={11}
                xs={11}
                sm={11}
              >
                <Image
                  src={`${process.env.REACT_APP_IMAGE_URL}${formChat.image}`}
                  className={styles.iconFriend}
                />
                <Col className={styles.colRoom2}>
                  <p className={styles.contactNameRight}>
                    {formChat.receiver_name}
                  </p>
                  <p className={styles.online}>
                    {userOnline.includes(formChat.receiver_id)
                      ? "Online"
                      : "Offline"}
                    {typing.isTyping && (
                      // <p>
                      <em> writing a message...</em>
                    )}
                  </p>
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
                  {messages.length > 0 &&
                    messages.map((item, index) => (
                      <div
                        className={
                          item.senderId === props.auth.data.user_id ||
                          item.sender_id === props.auth.data.user_id
                            ? styles.boxChatBubbleSender
                            : styles.boxChatBubbleReceiver
                        }
                      >
                        <Image
                          src={`${process.env.REACT_APP_IMAGE_URL}${item.image}`}
                          className={styles.iconFriend}
                        />
                        <h6
                          key={index}
                          className={
                            item.senderId === props.auth.data.user_id ||
                            item.sender_id === props.auth.data.user_id
                              ? styles.textMessageSender
                              : styles.textMessageReceiver
                          }
                        >
                          {item.message}
                        </h6>
                      </div>
                    ))}
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
                    onChange={(event) => {
                      changeMessage(event);
                      handleStopTyping();
                    }}
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
                onClick={() => handleAddMessage(message)}
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
                <Image
                  src={`${process.env.REACT_APP_IMAGE_URL}${formChat.image}`}
                  className={styles.iconFriend}
                />
                <Col className={styles.colRoom2}>
                  <p className={styles.contactNameRight}>
                    {formChat.receiver_name}
                  </p>
                  <p className={styles.online}>
                    {userOnline.includes(formChat.receiver_id)
                      ? "Online"
                      : "Offline"}
                    {typing.isTyping && <em> writing a message...</em>}
                  </p>
                </Col>
              </Col>
            </Col>
            <Col className={styles.colright} lg={8}>
              <Row className={styles.buble}>
                <Col className={styles.colRightLeft}>
                  {messages.length > 0 &&
                    messages.map((item, index) => (
                      <div
                        className={
                          item.senderId === props.auth.data.user_id ||
                          item.sender_id === props.auth.data.user_id
                            ? styles.boxChatBubbleSender
                            : styles.boxChatBubbleReceiver
                        }
                      >
                        <Image
                          src={`${process.env.REACT_APP_IMAGE_URL}${item.image}`}
                          className={styles.iconFriend}
                        />
                        <h6
                          key={index}
                          className={
                            item.senderId === props.auth.data.user_id ||
                            item.sender_id === props.auth.data.user_id
                              ? styles.textMessageSender
                              : styles.textMessageReceiver
                          }
                        >
                          {item.message}
                        </h6>
                      </div>
                    ))}
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
                      src={`${process.env.REACT_APP_IMAGE_URL}${formChat.image}`}
                      className={styles.profileUserFriend}
                    />
                    <Row className={styles.rowInfoAccountFriend}>
                      <Col lg={10} className={styles.colNameAccout}>
                        <p className={styles.friendsName}>
                          {formChat.receiver_name}
                        </p>
                        <p className={styles.friendOnline}>
                          {userOnline.includes(formChat.receiver_id)
                            ? "Online"
                            : "Offline"}
                        </p>
                      </Col>
                      <Col lg={2} className={styles.colMenuAccout}>
                        <Image src={Menu} />
                      </Col>
                    </Row>
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
