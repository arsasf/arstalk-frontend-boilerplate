//! ============================== COMPENENT ======================= !/

//* ======================== Import React ========================== */
import { useState } from "react";
import { connect } from "react-redux";
import { Button, Image, Col, Modal } from "react-bootstrap";
//* ============================= End ============================== */

//* ========================= Import REDUX ACTION ================== */
import { getUserById } from "../../redux/action/user";
import { addRoomChat } from "../../redux/action/roomchat";
import { sendChat, getHistoryChatById } from "../../redux/action/chat";
import {
  deleteContact,
  getAllcontact,
  addFriendContact,
  foundUserByEmail,
} from "../../redux/action/contact";

//* ============================= End ============================== */

//* ========================= Import Image ========================= */
import PageSearch from "../../assets/img/chat.png";
import styles from "./AllContact.module.css";
import ImgProfile from "../../assets/img/img-not-found.png";
import Info from "../../assets/img/info.png";
import Chat from "../../assets/img/chat (1).png";
import Delete from "../../assets/img/delete.png";
import InviteFriends from "../../assets/img/invite-friends.png";
//* ============================= End ============================== */

function AllContact(props) {
  //* ========================== State Modal ======================= */
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  //* ============================= End ============================ */

  //* ========================= State Condition ==================== */
  const [changeDelete, setChangeDelete] = useState(false);
  const [changeBodyMsg, setChangeBodyMsg] = useState(false);
  const [pageAddFriend, setPageAddFriend] = useState(true);
  //* ============================= End ============================ */

  //* ========================== Handle Close Modal ================ */
  const handleClose = () => {
    const id = props.auth.data.user_id;

    if (props.dataSearch) {
      setTimeout(() => {
        setPageAddFriend(true);
        setShow(false);
        props.foundUserByEmail(id, "");
      }, 3000);
    } else {
      setTimeout(() => {
        setPageAddFriend(true);
        setShow(false);
        props.getAllcontact(id, "");
      }, 1000);
    }
  };

  const handleCloseSearch = () => {
    setTimeout(() => {
      setShow(false);
      props.foundUserByEmail("");
    }, 1000);
  };

  //? ====================== Integration DELETE ==================== ?/
  const handleDelete = (friendId) => {
    setChangeDelete(true);
    setTimeout(() => {
      setShow(true);
      setInfo("DELETE CONTACT");
      setMsg("Are you sure to delete ?");
    }, 1000);
  };

  const handleCloseDelete = (friendId) => {
    const id = props.auth.data.user_id;
    props
      .deleteContact(id, friendId)
      .then((result) => {
        setShow(true);
        setInfo("DELETE CONTACT");
        setMsg(result.value.data.msg);
        setTimeout(() => {
          setShow(false);
          props.getAllcontact(id, "");
        }, 3000);
      })
      .catch((err) => {
        setShow(true);
        setMsg(err.response.data.msg);
        setTimeout(() => {
          setShow(false);
          props.getAllcontact(id, "");
        }, 3000);
      });
  };

  const handleCloseCancel = () => {
    const id = props.auth.data.user_id;
    setTimeout(() => {
      setShow(false);
      props.getAllcontact(id, "");
    }, 3000);
  };
  //? =================== End Integration DELETE ===================== ?/
  // * ================================== End ======================== */

  //* ============================Integration ADD FRIEND ============= */
  const handleInfo = (params) => {
    setShow(params);
    setChangeBodyMsg(params);
    setInfo("PROFILE");
  };

  const handleAddFriend = (params) => {
    const id = props.auth.data.user_id;
    const setData = {
      contactUserId: id,
      contactFriendId: params,
    };
    props
      .addFriendContact(setData, id)
      .then((result) => {})
      .catch((err) => {});
  };
  //* =============================== End ============================ */

  //* ======================== Integration ADD ROOM CHAT ============= */
  const HandleCreateChat = (friendId) => {
    const idUser = props.auth.data.user_id;
    const setData = {
      contactFriendId: friendId,
    };
    props
      .addRoomChat(idUser, setData)
      .then((result) => {
        props.handleBack(false);
        setShow(false);
        setInfo("ADD ROOM CHAT");
        setMsg(result.value.data.msg);
      })
      .catch((err) => {
        props.handleBack(false);
        setShow(false);
        setInfo("ERROR : ADD ROOM FRIEND");
        setMsg(err.response.data.msg);
      });
  };

  const handleShowMessage = (
    params1,
    params2,
    param3,
    param4,
    param5,
    param6
  ) => {
    props.showMessage(params1, params2);
    props.setData(param3, param4, param5, param6);
  };
  //* =============================== End ============================ */

  // console.log(props.messages[props.messages.length - 1].message);

  return (
    <>
      <Modal show={show} className={styles.modal}>
        <Modal.Header className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>INFO {info}</Modal.Title>
        </Modal.Header>
        {changeBodyMsg === true ? (
          <Modal.Body className={styles.modalBody1}>
            <Col className={styles.colBodyMsg}>
              {props.dataSearch.image === "" ? (
                <Image src={ImgProfile} className={styles.iconFriend1} />
              ) : (
                <Image
                  src={`${process.env.REACT_APP_IMAGE_URL}${props.dataSearch.image}`}
                  className={styles.iconFriend1}
                />
              )}
            </Col>
            <Col className={styles.colBodyMsg1}>
              <h1 className={styles.textInfo}>
                {props.dataSearch.user_fullname}
              </h1>
            </Col>
            <Col className={styles.colBodyMsg2}>
              <h1 className={styles.textInfo1}>{props.dataSearch.user_name}</h1>
            </Col>
            <br />
            <Col className={styles.colBodyMsg3}>
              <h1 className={styles.textInfo3}>
                Email : {props.dataSearch.user_email}
              </h1>
            </Col>
            <Col className={styles.colBodyMsg3}>
              <h1 className={styles.textInfo3}>
                Phone : {props.dataSearch.user_phone}
              </h1>
            </Col>
            <Col className={styles.colBodyMsg3}>
              <h1 className={styles.textInfo3}>
                Bio : {props.dataSearch.user_bio}
              </h1>
            </Col>
          </Modal.Body>
        ) : (
          <Modal.Body className={styles.modalBody}>{msg}</Modal.Body>
        )}
        <Modal.Footer>
          {changeBodyMsg === true ? (
            <Button
              variant="fff"
              className={styles.modalFooter}
              onClick={handleCloseSearch}
            >
              Close
            </Button>
          ) : changeDelete === false ? (
            <Button
              variant="fff"
              className={styles.modalFooter}
              onClick={handleClose}
            >
              Close
            </Button>
          ) : (
            <Col className={styles.chooseDelete}>
              <Button
                variant="fff"
                className={styles.modalFooter1}
                onClick={handleCloseCancel}
              >
                Cancel
              </Button>
              <Button
                variant="fff"
                className={styles.modalFooter}
                onClick={() => handleCloseDelete(props.contactList.user_id)}
              >
                Delete
              </Button>
            </Col>
          )}
        </Modal.Footer>
      </Modal>
      {props.contactList ? (
        <Button variant="fff" className={styles.rowHeaderInfoCard6}>
          {props.contactList.image === "" ? (
            <Image src={ImgProfile} className={styles.iconFriend} />
          ) : (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${props.contactList.image}`}
              className={styles.iconFriend}
            />
          )}

          <Col className={styles.colRoom1}>
            <Col className={styles.colName}>
              <p className={styles.contactName2}>
                {props.contactList.user_fullname}
              </p>
              <p className={styles.username}>{props.contactList.user_name}</p>
            </Col>

            <Button
              variant="fff"
              className={styles.buttonImgContact}
              onClick={() => {
                handleDelete(props.contactList.user_id);
                handleInfo(false);
              }}
            >
              <Image src={Delete} />
            </Button>
          </Col>
        </Button>
      ) : props.dataContact ? (
        <Button variant="fff" className={styles.rowHeaderInfoCard6}>
          {props.dataContact.image === "" ? (
            <Image src={ImgProfile} className={styles.iconFriend} />
          ) : (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${props.dataContact.image}`}
              className={styles.iconFriend}
            />
          )}

          <Col className={styles.colRoom1}>
            <Col className={styles.colName}>
              <p className={styles.contactName}>
                {props.dataContact.user_fullname}
              </p>
              <p className={styles.username}>{props.dataContact.user_name}</p>
            </Col>
            <Button
              variant="fff"
              className={styles.buttonImgContact}
              onClick={() => HandleCreateChat(props.dataContact.user_id)}
            >
              <Image src={Chat} />
            </Button>
          </Col>
        </Button>
      ) : props.dataSearch ? (
        <Button variant="fff" className={styles.rowHeaderInfoCard6}>
          {props.dataSearch.image === "" ? (
            <Image src={ImgProfile} className={styles.iconFriend} />
          ) : (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${props.dataSearch.image}`}
              className={styles.iconFriend}
            />
          )}

          <Col className={styles.colRoom1}>
            <Col className={styles.colName}>
              <p className={styles.contactName}>
                {props.dataSearch.user_fullname}
              </p>
              <p className={styles.username}>{props.dataSearch.user_name}</p>
            </Col>
            {props.changeButtonFriend === true ? (
              <Button
                variant="fff"
                className={styles.buttonImgContact}
                onClick={() => handleInfo(true)}
              >
                <Image src={Info} />
              </Button>
            ) : (
              <Button
                variant="fff"
                className={styles.buttonImgContact}
                onClick={() => {
                  handleAddFriend(props.dataSearch.user_id);
                  handleInfo(false);
                }}
              >
                <Image src={InviteFriends} />
              </Button>
            )}
          </Col>
        </Button>
      ) : props.dataRoomChat ? (
        <Button
          variant="fff"
          className={styles.rowHeaderInfoCard2}
          onClick={() => {
            handleShowMessage(
              true,
              false,
              props.dataRoomChat.room_chat,
              props.dataRoomChat.friend_id,
              props.dataRoomChat.image,
              props.dataRoomChat.user_fullname
            );
          }}
        >
          {props.dataRoomChat.image === "" ? (
            <Image src={ImgProfile} className={styles.iconFriend} />
          ) : (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${props.dataRoomChat.image}`}
              className={styles.iconFriend}
            />
          )}
          <Col className={styles.colRoom}>
            <Col className={styles.titleNameTime}>
              <h1 className={styles.nameReceiver}>
                {props.dataRoomChat.user_fullname}
              </h1>
            </Col>
            <Col className={styles.titleNameTime}>
              <h1 className={styles.messageReceiver}>
                {props.messages.length > 0
                  ? props.messages[0].room_chat === props.dataRoomChat.room_chat
                    ? props.messages[props.messages.length - 1].message
                    : "Message..."
                  : "No Message..."}
              </h1>
            </Col>
          </Col>
        </Button>
      ) : pageAddFriend === true ? (
        <Col className={styles.colResponse}>
          <Image className={styles.textResponse} src={PageSearch} />
          <p className={styles.textResponse}>
            {pageAddFriend === false ? "Search your friend here ..." : msg}
          </p>
        </Col>
      ) : (
        ""
      )}
    </>
  );
}

//* ============================ mapStateToProps =================== */
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  contact: state.contact,
});
//* ==================================== End ======================= */

//* =========================== mapDispatchToProps ================= */
const mapDispatchToProps = {
  deleteContact,
  getAllcontact,
  addFriendContact,
  getUserById,
  foundUserByEmail,
  addRoomChat,
  sendChat,
  getHistoryChatById,
};
//* ==================================== End ======================= */

export default connect(mapStateToProps, mapDispatchToProps)(AllContact);

//! =============================== END COMPONENT ================== !/
