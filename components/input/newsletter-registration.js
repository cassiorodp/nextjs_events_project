import axios from 'axios';
import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const inputRef = useRef(null);

  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = inputRef.current.value;

    const { data } = await axios.post('/api/newsletter', {
      email: enteredEmail,
    });

    console.log(data.message);
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
