import styles from "./Message.module.css";

function Message({ message, emoji = '👍' }) {
  return (
    <p className={styles.message}>
      {message}
      <span role="img"> { emoji }</span>
    </p>
  );
}

export default Message;
