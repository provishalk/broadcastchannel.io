import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaEllipsisV } from "react-icons/fa";

const Chat = ({
  username,
  selectedUser,
  messages,
  addMessage,
  markMessagesAsRead,
  clearMessages,
}) => {
  const [message, setMessage] = useState("");
  const [showMenuForIndex, setShowMenuForIndex] = useState(null);

  // useEffect(() => {
  //   markMessagesAsRead(selectedUser);
  // }, [selectedUser, markMessagesAsRead]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        from: username,
        to: selectedUser,
        text: message,
        time: timestamp,
        chatClearedForToUser: false,
        chatClearedForFromUser: false,
      });
      setMessage("");
    }
  };

  const handleMenuClick = (index) => {
    setShowMenuForIndex(index === showMenuForIndex ? null : index);
  };

  const handleDeleteMessage = (messageId, deleteForEveryone = false) => {
    const updatedMessages = messages
      .map((msg) => {
        if (msg.id === messageId) {
          if (deleteForEveryone) {
            return null; // Remove the message completely
          } else if (msg.from === username) {
            return { ...msg, chatClearedForFromUser: true };
          } else {
            return { ...msg, chatClearedForToUser: true };
          }
        }
        return msg;
      })
      .filter((msg) => msg !== null); // Remove any null messages

    clearMessages(updatedMessages);
    setShowMenuForIndex(null); // Close menu after action
  };

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.from === username &&
        msg.to === selectedUser &&
        !msg.chatClearedForFromUser) ||
      (msg.from === selectedUser &&
        msg.to === username &&
        !msg.chatClearedForToUser)
  );

  return (
    <div className="chat">
      <div className="chat-window">
        {filteredMessages.map((msg, index) => (
          <div
            key={msg.id}
            className={`message-container ${
              msg.from === username ? "sent" : "received"
            }`}
          >
            <div className="message">
              <div className="message-content">
                <span className="message-chat">
                  <strong className="font-semibold">{msg.from} :</strong>{" "}
                  {msg.text}
                </span>
                <span className="timestamp">
                  {msg.time}
                  {msg.from === username && (
                    <div className="message-options">
                      <button
                        className="menu-button"
                        onClick={() => handleMenuClick(index)}
                      >
                        <FaEllipsisV />
                      </button>
                      {showMenuForIndex === index && (
                        <div className="options-menu">
                          <button
                            onClick={() => handleDeleteMessage(msg.id, false)}
                          >
                            Delete for me
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id, true)}
                          >
                            Delete for everyone
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit" className="send-button">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Chat;
