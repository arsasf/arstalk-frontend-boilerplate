import styles from "../pages/main/ArsTalk/ArsTalk.module.css";
import { Col, Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Setting from "../assets/img/setting.png";
import Contact from "../assets/img/contact.png";
import InviteFriends from "../assets/img/invite-friends.png";
import FAQ from "../assets/img/FAQ.png";

function NavMenu(props) {
  return (
    <>
      <Col className={styles.rowHeaderInfoCard}>
        <Link
          to="#"
          className={styles.infoCard}
          onClick={() => props.showMessage(false, false)}
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
                props.handleSettings(true, false, false, false, false)
              }
              className={styles.listSort}
            >
              <Image src={Setting} className={styles.icon} />
              <p className={styles.textIcon}>Settings</p>
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.listSort}
              onClick={() =>
                props.handleSettings(true, true, false, false, false)
              }
            >
              <Image src={Contact} className={styles.icon} />
              <p className={styles.textIcon}>Contacts</p>
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.listSort}
              onClick={() =>
                props.handleSettings(true, true, true, false, false)
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
    </>
  );
}

export default NavMenu;
