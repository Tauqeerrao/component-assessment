import { ThemeProvider } from '../src/contexts/ThemeContext';
import { AuthProvider } from '../src/contexts/AuthContext'; // 🛑 Import AuthProvider
import '../src/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider> 
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
