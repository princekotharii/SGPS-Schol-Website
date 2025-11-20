import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '@context/AuthContext';
import Button from '@components/shared/Button';
import { authAPI } from '@api/endpoints';
import { validateEmail, validatePassword } from '@utils/validators';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login - SGPS School';
    
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { token, user } = response.data;

      login(token, user);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {/* Left Side - Branding */}
        <div className={styles.brandingSide}>
          <div className={styles.brandingContent}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>DPS</div>
              <h1>DPS School</h1>
            </div>
            <h2>Admin Panel</h2>
            <p>
              Manage your school's content, monitor admissions, and handle
              administrative tasks efficiently.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Manage Gallery & Events</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Handle Admissions</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                <span>View Contact Messages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={styles.formSide}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2>Welcome Back</h2>
              <p>Sign in to access the admin panel</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.inputWrapper}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.error : ''}
                    placeholder="admin@sgps.edu"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? styles.error : ''}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className={styles.errorText}>{errors.password}</span>
                )}
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkbox}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className={styles.forgotLink}>
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" loading={loading} fullWidth size="large">
                Sign In
              </Button>
            </form>

            <div className={styles.demoCredentials}>
              {/* <p className={styles.demoTitle}>Demo Credentials:</p> */}
              <p>
                {/* <strong>Email:</strong> admin@sgps.edu */}
              </p>
              <p>
                {/* <strong>Password:</strong> admin123 */}
              </p>
            </div>

            <div className={styles.backLink}>
              <Link to="/">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;