import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";

const Notification = ({ setHasUnreadNotification }) => {
  const { user } = useStateContext();
  const [notifications, setNotifications] = useState([]);
  const username = useMemo(() => user.name, [user.name]);
  const imageUrl = useMemo(() => `http://localhost:8000/storage/users/${user.photo}`, [user.photo]);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications/user/${user.id}`
      );
      const sortedNotifications = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setNotifications(sortedNotifications);
      const hasUnread = sortedNotifications.some(
        (notification) => !notification.is_read
      );
      setHasUnreadNotification(hasUnread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [user.id, setHasUnreadNotification]);

  useEffect(() => {
    let isMounted = true;

    const intervalId = setInterval(fetchNotifications, 5000);

    return () => {
      clearInterval(intervalId);
      isMounted = false;
    };
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications/${notificationId}`,
        {
          is_read: true,
        }
      );

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );

      const hasUnread = notifications.some(
        (notification) => !notification.is_read
      );
      setHasUnreadNotification(hasUnread);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, [notifications, setHasUnreadNotification]);

  return (
    <div className="notification-container">
      <div className="notification-title">
        <h3>Notifications</h3>
      </div>

      {notifications.length === 0 ? (
        <h4>Aucune notification</h4>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={notification.is_read ? "read" : "unread"}
            >
              <div className="notification-list-image">
                <img src={imageUrl} alt={username} />
              </div>
              <div className="notification-list-information">
                <h5>{username}</h5>
                <p onClick={() => markAsRead(notification.id)}>
                  {notification.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
