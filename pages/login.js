import { useState, useContext } from 'react';
import { AuthContext } from '../src/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useTheme } from '../src/contexts/ThemeContext';
import styles from '../src/styles/Login.module.css';

export default function Login() {
  const { login } = useContext(AuthContext); // <-- using context properly
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      // you can add more user details here if needed (like name, id, etc.)
    };

    login(userData); // use context login (saves to localStorage too)
    router.push('/user-dashboard'); // redirect after login
  };

  return (
    <div className={`${styles.pageWrapper} ${styles[theme]}`}>
      <div className={`${styles.loginContainer}`}></div>

      <button onClick={toggleTheme} className={styles.themeToggle}>
        {theme === 'light' ? (
          <>🌙 Switch to Dark Theme</>
        ) : (
          <>☀️ Switch to Light Theme</>
        )}
      </button>

      <div className={styles.loginCard}>
        <h1 className={styles.title}>Welcome Back</h1>

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.showHideButton}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}