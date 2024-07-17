import React, { useEffect, useState } from "react";
import "./Login.css"; // Import your custom styles for Login

const Login = ({
  users,
  addUser,
  setUsername,
  setMessages,
  setUsers,
  messages,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [showCreate, setShowCreate] = useState(true); // Initially show Create User form
  const [showLogin, setShowLogin] = useState(false); // State to manage showing Login form
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (
      users.some(
        (user) => user.username.toLowerCase() === newUsername.toLowerCase()
      )
    ) {
      setErrorMessage("Username already exists");
      return;
    }
    addUser({ firstName, lastName, username: newUsername });
    setFirstName("");
    setLastName("");
    setNewUsername("");
    setErrorMessage("");
    setShowCreate(false); // Hide Create User form after successful creation
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername.trim() === "") {
      setErrorMessage("Please enter a username");
      return;
    }

    const user = users.find(
      (user) => user.username.toLowerCase() === loginUsername.toLowerCase()
    );
    if (user) {
      setUsername(user.username);
      setErrorMessage(""); // Clear error message if user is found
    } else {
      setErrorMessage("No user found with this username");
    }
  };

  const toggleCreateForm = () => {
    setShowCreate(true);
    setShowLogin(false);
    setErrorMessage("");
  };

  const toggleLoginForm = () => {
    setShowCreate(false);
    setShowLogin(true);
    setErrorMessage("");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-image"></div>
        <div className="login-forms">
          <h1 style={{ textAlign: "center" }}>Welcome to Chatter Box</h1>
          <p className="slogan">Connect with friends and start chatting!</p>

          {/* Conditional rendering of toggle buttons after at least one user is created */}
          {users.length > 0 && (
            <div className="toggle-buttons">
              {!showCreate && (
                <button className="create-button" onClick={toggleCreateForm}>
                  Create
                </button>
              )}
              {!showLogin && (
                <button className="login-button" onClick={toggleLoginForm}>
                  Login
                </button>
              )}
            </div>
          )}

          {/* Layout for the login forms */}
          <div className="login-form">
            {/* Conditional rendering of Create User form */}
            {showCreate && (
              <form onSubmit={handleCreateUser} className="create-user-form">
                <h2>Create User</h2>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
                <button className="create-button" type="submit">
                  Let's Create
                </button>
                {errorMessage && <p className="error">{errorMessage}</p>}
              </form>
            )}

            {/* Conditional rendering of Login form */}
            {showLogin && (
              <div className="login-section">
                <h2>Login</h2>
                <input
                  type="text"
                  placeholder="Username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
                <button
                  className="login-button"
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
                {errorMessage && <p className="error">{errorMessage}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
