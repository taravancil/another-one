import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Dropdown from "./Dropdown";
import useSession from "../hooks/session";

function Login(props) {
  const session = useSession();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(null);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // let passwordInput = null;
  // useEffect(() => {
  //   if (passwordInput) {
  //     passwordInput.focus();
  //   }
  // });

  const logout = () => {
    fetch("https://api.taravancil.com/tasks/logout");

    document.dispatchEvent(
      new CustomEvent("session-change", {
        detail: { session: null }
      })
    );
  };

  const submitLogin = e => {
    e.preventDefault();

    setIsSubmitting(true);

    fetch("https://api.taravancil.com/tasks/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ password })
    }).then(function(res) {
      setIsSubmitting(false);
      switch (res.status) {
        case 200:
          document.dispatchEvent(
            new CustomEvent("session-change", {
              detail: {
                session: { name: "Tara", avatar: "/images/avatar.jpg" }
              }
            })
          );
          setFormErrors({});
          setIsLoginModalOpen(false);
          break;
        case 400:
          setFormErrors(
            Object.assign(formErrors, { password: "Enter a password" })
          );
          break;
        case 401:
          setFormErrors(
            Object.assign(formErrors, { password: "Invalid password" })
          );
          break;
        case 500:
          setFormErrors({ form: "Server error. Try again?" });
          break;
      }
    });
  };

  if (session && session.name) {
    const dropdownButton = (
      <button className="dropdown-toggle-btn">
        <img src={session.avatar} className="avatar" alt="" />
      </button>
    );

    return (
      <Dropdown toggleButton={dropdownButton}>
        <div className="dropdown-items">
          Hi, {session.name}
          <hr />
          <button
            onClick={logout}
            type="button"
            className="btn btn--full-width"
          >
            Log out
          </button>
        </div>
      </Dropdown>
    );
  } else {
    const loginModalProps = {
      title: "Log in",
      visible: isLoginModalOpen,
      close: () => setIsLoginModalOpen(false),
      submit: submitLogin,
      submitLabel: "Log in",
      feedbackMessage: isSubmitting ? "Submitting..." : null
    };

    return (
      <div className="login-controls">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="btn btn--plain"
        >
          Log in
        </button>

        <Modal {...loginModalProps}>
          <div className="modal-info center">
            <p>
              This is a single-user system for{" "}
              <a href="https://taravancil.com">Tara</a> only. You can't log in,
              but you can still use the app! <strong>Note:</strong> your tasks
              will be stored in <code>localStorage</code>, and{" "}
              <em>may get deleted by your browser</em>.
            </p>

            <img alt="" src="/images/warning.png" />
            <img alt="" src="/images/no-entry.png" />
            <img alt="" src="/images/warning.png" />
          </div>

          <form>
            <label htmlFor="password">Password</label>

            <div className="input-feedback input-feedback--error tiny-text">
              {formErrors.password || ""}
            </div>

            <input
              // ref={input => {
              //   passwordInput = input;
              // }}
              name="password"
              type="password"
              className="big-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              aria-invalid={formErrors.password ? true : false}
            />
          </form>
        </Modal>
      </div>
    );
  }
}

export default Login;
