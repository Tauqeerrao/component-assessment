import styles from '../styles/UserProfile.module.css';

export default function UserProfile({ user, onBack, onEdit }) {
  return (
    <div className={styles.profile}>
      <button onClick={onBack} className={styles.backButton}>
        ← Back to List
      </button>

      <div className={styles.header}>
        <img src={user.avatar} alt={user.name} className={styles.profileAvatar} />
        <div>
          <h1>{user.name}</h1>
          <span className={`${styles.status} ${user.isActive ? styles.active : styles.inactive}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>
        <div className={styles.detailItem}>
          <h3>Role</h3>
          <p>{user.role}</p>
        </div>
        <div className={styles.detailItem}>
          <h3>User ID</h3>
          <p>{user.id}</p>
        </div>
      </div>

      <button onClick={onEdit} className={styles.editButton}>
        Edit Profile
      </button>
    </div>
  );
}
