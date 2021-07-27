import React, { useState } from "react";
import styles from "../pages/main/ArsTalk/ArsTalk.module.css";
import { Col, Form, Image, Button } from "react-bootstrap";
import Back from "../assets/img/back.png";
import Key from "../assets/img/key.png";
import Logout from "../assets/img/logout.png";
import ProfileDefault from "../assets/img/img-not-found.png";

function AccountSetting(props) {
  const [form, setForm] = useState({
    userImage: `${process.env.REACT_APP_IMAGE_URL}${props.user.data.image}`,
    userFullname: props.user.data.user_fullname,
    userPhone: props.user.data.user_phone,
    userName: props.user.data.user_name,
    userBio: props.user.data.user_bio,
    image: props.user.data.image,
  });
  const [update, setUpdate] = useState(props.update);
  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setUpdate(true);
  };
  const handleImage = (event) => {
    props.handleImage(event.target.files[0]);
  };
  return (
    <>
      <Col className={styles.rowHeaderInfoCard3}>
        <Image
          src={Back}
          onClick={() => props.handleBack(false)}
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
            onClick={() => props.resetData()}
          >
            Cancel
          </Button>
          <Button
            variant="fff"
            className={styles.buttonUpdate}
            onClick={() => props.updateData()}
          >
            Update Profile
          </Button>
        </Col>
      ) : (
        ""
      )}
      <Col className={styles.rowHeaderInfoCard5}>
        <p className={styles.userSetting}>Settings</p>
        <Col
          className={styles.colChangeLogout}
          onClick={() => props.handleSettings(true, true, true, true, true)}
        >
          <Image src={Key} className={styles.iconChange} />
          <p className={styles.titleUserSetting}>Change Password</p>
        </Col>
        <Col
          className={styles.colChangeLogout1}
          onClick={() => props.handleLogout()}
        >
          <Image src={Logout} className={styles.iconChange} />
          <p className={styles.titleUserSetting}>Logout</p>
        </Col>
      </Col>
    </>
  );
}

export default AccountSetting;
