import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useContext, useState } from 'react';
import { UserContext } from '../lib/context';
import { useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Redirect from '../components/Redirect';
import styles from '../styles/Enter.module.css';

export default function Enter() {
  const { user, username } = useContext(UserContext);

  return (
    <main className={styles.container}>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <Redirect to="/dashboard" />
        )
      ) : (
        <div className={styles.button__container}>
          <div className={styles.sign__container}>
            <h1 className={styles.title}>Sign in to Planify</h1>
            <SignInButton />
          </div>
        </div>
      )}
    </main>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className={styles.button__sign} onClick={signInWithGoogle}>
      <img src="google-logo.png" className={styles.logo} />
      Sign in with Google
    </button>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
      job: 'Member',
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section className={styles.form}>
        <div className={styles.form__container}>
          <h1 className={styles.form__title}>Almost there...</h1>
          <label className={styles.label}>Choose Username</label>
          <form onSubmit={onSubmit} className={styles.form__form}>
            <input
              className={styles.input}
              name="username"
              placeholder="myname"
              value={formValue}
              onChange={onChange}
            />
            <UsernameMessage
              username={formValue}
              isValid={isValid}
              loading={loading}
            />
            <button
              type="submit"
              className={styles.form__button}
              disabled={!isValid}
            >
              Choose
            </button>
          </form>
        </div>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p className={styles.status}>Checking...</p>;
  } else if (isValid) {
    return <p className={styles.status__success}>{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className={styles.status__error}>That username is taken!</p>;
  } else {
    return <p className={styles.status}></p>;
  }
}
