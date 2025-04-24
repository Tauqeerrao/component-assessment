import styles from '../styles/UserCard.module.css';

export default function UserCard({ user, onViewProfile }) {
  return (
    <div className={styles.card}>
      <img src={user.avatar} alt={user.name} className={styles.avatar} />
      <div className={styles.info}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
        <span className={`${styles.status} ${user.isActive ? styles.active : styles.inactive}`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <button onClick={() => onViewProfile(user)} className={styles.button}>
        View Profile
      </button>
    </div>
  );
}
