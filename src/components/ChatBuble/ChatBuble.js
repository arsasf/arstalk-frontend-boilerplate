import { Image } from "react-bootstrap";
import styles from "./ChatBuble.module.css";
import ProfileDefault from "../../assets/img/img-not-found.png";
import { connect } from "react-redux";

function ChatBuble(props) {
  return (
    <>
      {props.auth.data.user_id !== props.dataChatHistoryId.receiver_id ? (
        props.dataChatHistoryId.sender_id === props.dataChatHistoryId.user_id ||
        props.formChat.receiver_id === props.dataChatHistoryId.user_id ? (
          <p className={styles.bubleReceiver1}>
            {props.formChat.image === "" ? (
              <Image src={ProfileDefault} className={styles.iconBubleSender} />
            ) : (
              <Image
                src={`${process.env.REACT_APP_IMAGE_URL}${props.formChat.image}`}
                className={styles.iconBubleSender}
              />
            )}
            {props.dataChatHistoryId.message === "" ? (
              ""
            ) : (
              <p className={styles.bubleMessageReceiver}>
                {props.dataChatHistoryId.message}
              </p>
            )}
          </p>
        ) : (
          <p className={styles.bubleSender}>
            {props.auth.data.image === "" ? (
              <Image src={ProfileDefault} className={styles.iconBubleSender} />
            ) : (
              <Image
                src={`${process.env.REACT_APP_IMAGE_URL}${props.auth.data.image}`}
                className={styles.iconBubleSender}
              />
            )}

            <p className={styles.bubleMessageSender}>
              {props.dataChatHistoryId.message}
              <p className={styles.timeBubleSender}>08:05</p>
            </p>
          </p>
        )
      ) : props.dataChatHistoryId.sender_id ===
          props.dataChatHistoryId.user_id ||
        props.formChat.receiver_id === props.dataChatHistoryId.user_id ? (
        <p className={styles.bubleReceiver}>
          {props.formChat.image === "" ? (
            <Image src={ProfileDefault} className={styles.iconBubleSender} />
          ) : (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${props.formChat.image}`}
              className={styles.iconBubleSender}
            />
          )}
          {props.dataChatHistoryId.message === "" ? (
            ""
          ) : (
            <p className={styles.bubleMessageReceiver}>
              {props.dataChatHistoryId.message}
            </p>
          )}
        </p>
      ) : (
        <p className={styles.bubleSender}>
          {props.auth.data.image === "" ? (
            <Image src={ProfileDefault} className={styles.iconBubleSender} />
          ) : (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${props.auth.data.image}`}
              className={styles.iconBubleSender}
            />
          )}

          <p className={styles.bubleMessageSender}>
            {props.dataChatHistoryId.message}
            <p className={styles.timeBubleSender}>08:05</p>
          </p>
        </p>
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

export default connect(mapStateToProps)(ChatBuble);
