import { Image } from "react-bootstrap";
import styles from "./ChatBuble.module.css";
import ProfileDefault from "../../assets/img/img-not-found.png";
import { connect } from "react-redux";

function ChatBuble(props) {
  console.log(props);
  return (
    <>
      {props.auth.data.user_id !== props.dataChatHistoryId.receiver_id ? (
        props.dataChatHistoryId.sender_id === props.dataChatHistoryId.user_id ||
        props.formChat.receiver_id === props.dataChatHistoryId.user_id ? (
          <p className={styles.bubleReceiver1}>
            {console.log(true)}

            {props.formChat.image === "" ? (
              <Image src={ProfileDefault} className={styles.iconBubleSender} />
            ) : (
              <Image
                src={`${process.env.REACT_APP_IMAGE_URL}${props.formChat.image}`}
                className={styles.iconBubleSender}
              />
            )}
            {props.dataChatHistoryId.message === "" ? (
              console.log(true)
            ) : (
              <p className={styles.bubleMessageReceiver}>
                {props.dataChatHistoryId.message}
                {/* <p className={styles.timeBubleReceiver}>
                  {props.dataChatHistoryId.chat_created_at}
                </p> */}
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

          // console.log(false)
        )
      ) : props.dataChatHistoryId.sender_id ===
          props.dataChatHistoryId.user_id ||
        props.formChat.receiver_id === props.dataChatHistoryId.user_id ? (
        <p className={styles.bubleReceiver}>
          {console.log(true)}

          {props.formChat.image === "" ? (
            <Image src={ProfileDefault} className={styles.iconBubleSender} />
          ) : (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}${props.formChat.image}`}
              className={styles.iconBubleSender}
            />
          )}
          {props.dataChatHistoryId.message === "" ? (
            console.log(true)
          ) : (
            <p className={styles.bubleMessageReceiver}>
              {props.dataChatHistoryId.message}
              {/* <p className={styles.timeBubleReceiver}>
                  {props.dataChatHistoryId.chat_created_at}
                </p> */}
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

        // console.log(false)
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
