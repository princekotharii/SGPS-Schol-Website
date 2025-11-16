import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@components/shared/PageHeader';
import Button from '@components/shared/Button';
import { admissionsAPI } from '@api/endpoints';
import { ADMISSION_CLASSES } from '@utils/constants';
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateAge,
  validateDate,
} from '@utils/validators';
import {
  FaCheckCircle,
  FaFileAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
} from 'react-icons/fa';
import styles from './Admissions.module.css';

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    motherName: '',
    email: '',
    phone: '',
    address: '',
    classApplying: '',
    previousSchool: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Admissions - SGPS School';
  }, []);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Admissions' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const studentNameError = validateRequired(formData.studentName, 'Student Name');
    if (studentNameError) newErrors.studentName = studentNameError;

    const dobError = validateDate(formData.dateOfBirth);
    if (dobError) newErrors.dateOfBirth = dobError;

    const genderError = validateRequired(formData.gender, 'Gender');
    if (genderError) newErrors.gender = genderError;

    const fatherNameError = validateRequired(formData.fatherName, 'Father Name');
    if (fatherNameError) newErrors.fatherName = fatherNameError;

    const motherNameError = validateRequired(formData.motherName, 'Mother Name');
    if (motherNameError) newErrors.motherName = motherNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const addressError = validateRequired(formData.address, 'Address');
    if (addressError) newErrors.address = addressError;

    const classError = validateRequired(formData.classApplying, 'Class');
    if (classError) newErrors.classApplying = classError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await admissionsAPI.create(formData);
      toast.success(
        'Admission form submitted successfully! We will contact you soon.'
      );
      setFormData({
        studentName: '',
        dateOfBirth: '',
        gender: '',
        fatherName: '',
        motherName: '',
        email: '',
        phone: '',
        address: '',
        classApplying: '',
        previousSchool: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.admissions}>
      <PageHeader
        title="Admissions"
        subtitle="Join our school community and embark on a journey of excellence"
        breadcrumbs={breadcrumbs}
      />

      <div className="container">
        {/* Admission Process */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Admission Process</h2>
            <p className={styles.sectionSubtitle}>
              Simple steps to secure your child's admission
            </p>
          </div>

          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <FaFileAlt className={styles.stepIcon} />
              <h3>Fill Application</h3>
              <p>Complete the online admission form with required details</p>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <FaCalendarAlt className={styles.stepIcon} />
              <h3>Schedule Visit</h3>
              <p>Visit our campus for interaction and assessment</p>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <FaCheckCircle className={styles.stepIcon} />
              <h3>Document Verification</h3>
              <p>Submit required documents for verification</p>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <FaMoneyBillWave className={styles.stepIcon} />
              <h3>Fee Payment</h3>
              <p>Complete admission by paying the required fees</p>
            </div>
          </div>
        </section>

        {/* Required Documents */}
        <section className={styles.section}>
          <div className={styles.documentsCard}>
            <h2>Required Documents</h2>
            <div className={styles.documentsList}>
              <div className={styles.documentItem}>
                <FaCheckCircle />
                <span>Birth Certificate (Original + 2 photocopies)</span>
              </div>
              <div className={styles.documentItem}>
                <FaCheckCircle />
                <span>Transfer Certificate (for students from other schools)</span>
              </div>
              <div className={styles.documentItem}>
                <FaCheckCircle />
                <span>Previous School Report Card</span>
              </div>
              <div className={styles.documentItem}>
                <FaCheckCircle />
                <span>Aadhar Card of Student (photocopy)</span>
              </div>
              <div className={styles.documentItem}>
                <FaCheckCircle />
                <span>Parent's ID Proof (Aadhar/Voter ID/Passport)</span>
              </div>
              <div className={styles.documentItem}>
                <FaCheckCircle />
                <span>Passport size photographs (6 copies)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Admission Form */}
        <section className={styles.section}>
          <div className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <h2>Online Admission Form</h2>
              <p>Fill in the details below to apply for admission</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Student Details */}
              <div className={styles.formSection}>
                <h3>Student Details</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="studentName">Student Name *</label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className={errors.studentName ? styles.error : ''}
                    placeholder="Enter student's full name"
                  />
                  {errors.studentName && (
                    <span className={styles.errorText}>{errors.studentName}</span>
                  )}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="dateOfBirth">Date of Birth *</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={errors.dateOfBirth ? styles.error : ''}
                    />
                    {errors.dateOfBirth && (
                      <span className={styles.errorText}>{errors.dateOfBirth}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={errors.gender ? styles.error : ''}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <span className={styles.errorText}>{errors.gender}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="classApplying">Class Applying For *</label>
                  <select
                    id="classApplying"
                    name="classApplying"
                    value={formData.classApplying}
                    onChange={handleChange}
                    className={errors.classApplying ? styles.error : ''}
                  >
                    <option value="">Select Class</option>
                    {ADMISSION_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  {errors.classApplying && (
                    <span className={styles.errorText}>{errors.classApplying}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="previousSchool">Previous School (if any)</label>
                  <input
                    type="text"
                    id="previousSchool"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    placeholder="Enter previous school name"
                  />
                </div>
              </div>

              {/* Parent Details */}
              <div className={styles.formSection}>
                <h3>Parent/Guardian Details</h3>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fatherName">Father's Name *</label>
                    <input
                      type="text"
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      className={errors.fatherName ? styles.error : ''}
                      placeholder="Enter father's name"
                    />
                    {errors.fatherName && (
                      <span className={styles.errorText}>{errors.fatherName}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="motherName">Mother's Name *</label>
                    <input
                      type="text"
                      id="motherName"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      className={errors.motherName ? styles.error : ''}
                      placeholder="Enter mother's name"
                    />
                    {errors.motherName && (
                      <span className={styles.errorText}>{errors.motherName}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? styles.error : ''}
                      placeholder="parent@example.com"
                    />
                    {errors.email && (
                      <span className={styles.errorText}>{errors.email}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? styles.error : ''}
                      placeholder="9876543210"
                    />
                    {errors.phone && (
                      <span className={styles.errorText}>{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="address">Residential Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? styles.error : ''}
                    rows="3"
                    placeholder="Enter complete address"
                  ></textarea>
                  {errors.address && (
                    <span className={styles.errorText}>{errors.address}</span>
                  )}
                </div>
              </div>

              <Button type="submit" loading={loading} fullWidth size="large">
                Submit Application
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admissions;