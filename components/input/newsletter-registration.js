import axios from 'axios';
import { useContext, useRef } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const inputRef = useRef(null);

  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = inputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    try {
      await axios.post('/api/newsletter', {
        email: enteredEmail,
      });
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter!',
        status: 'success',
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={inputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
