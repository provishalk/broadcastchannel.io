import React from 'react';
import { FaTrash } from 'react-icons/fa';

const UserList = ({ users, selectedUser, setSelectedUser, unreadMessages, clearChat }) => {
  return (
    <div className="user-list">
      <p className="user-list-heading px-2">Chat With</p>
      {users.length === 0 ? (
        <p className="no-friends-message" style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
          Sorry you don't have friends, kindly add 😞
        </p>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user.username}
              onClick={() => setSelectedUser(user.username)}
              className={selectedUser === user.username ? 'selected' : ''}
            >
              <div className="user-info">
                <div className="profile-icon">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="username">
                  {user.username}
                  {unreadMessages[user.username] > 0 && (
                    <span className="notification-badge">{unreadMessages[user.username]}</span>
                  )}
                </div>
                <FaTrash
                  className="trash-icon"
                  style={{ color: 'red' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    clearChat(user.username);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
