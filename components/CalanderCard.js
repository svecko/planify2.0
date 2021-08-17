import styles from '../styles/CalendarCard.module.css';
import moment from 'moment';

export default function CalandarCard() {
  return (
    <div className={styles.container}>
      <div className={styles.text__container}>
        <p className={styles.date}>
          {moment(new Date()).format('DD. MMM YYYY')}
        </p>
        <p className={styles.today}>Today</p>
      </div>
    </div>
  );
}
