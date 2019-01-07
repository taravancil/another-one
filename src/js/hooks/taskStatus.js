import { useState, useEffect } from "react";

function useTaskStatus(taskID) {
  const [isCompleted, setIsCompleted] = useState(null);

  function handleStatusChange(isCompleted) {
    setIsCompleted(isCompleted);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isCompleted;
}
