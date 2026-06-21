import { getMessaging, getToken } from 'firebase/messaging';
import { app } from './firebase';

function App() {
  const handleEnableNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        alert('Permission denied');
        return;
      }

      const messaging = getMessaging(app);

      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      console.log('FCM Token:', token);

      await fetch('http://localhost:3000/api/push-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '123',
          token,
        }),
      });

      alert('Token registered');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Push Notification Test</h1>

      <button onClick={handleEnableNotifications}>Enable Notifications</button>
    </div>
  );
}

export default App;
