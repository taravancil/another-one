import { useState, useEffect } from "react";

let isFirstLoad = true;

export default function useSession() {
  const [session, setSession] = useState(null);

  function handleSessionChange(e) {
    localStorage.setItem("session", JSON.stringify(e.detail.session));
    setSession(e.detail.session);
  }

  useEffect(() => {
    if (isFirstLoad) {
      fetch("https://api.taravancil.com/session", { credentials: "include" })
        .then(res => res.json())
        .then(data => {
          if (data !== {}) {
            localStorage.setItem("session", JSON.stringify(data));
            setSession(data);
          }
        });
      isFirstLoad = false;
    } else if (session === null) {
      const cachedSession = localStorage.getItem("session");
      if (cachedSession) {
        setSession(JSON.parse(cachedSession));
      }
    }

    document.addEventListener("session-change", handleSessionChange);
    return () => {
      document.removeEventListener("session-change", handleSessionChange);
    };
  });

  return session;
}
