import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@components/shared/Button';
import Modal from '@components/shared/Modal';
import Loader from '@components/shared/Loader';
import Table from '@components/shared/Table';
import { admissionsAPI } from '@api/endpoints';
import { ADMISSION_CLASSES } from '@utils/constants';
import { formatDate } from '@utils/helpers';
import {
  FaEye,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaFilter,
} from 'react-icons/fa';
import styles from './AdmissionManagement.module.css';

const AdmissionManagement = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterClass, setFilterClass] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Admission Management - Admin Panel';
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const response = await admissionsAPI.getAll();
      setAdmissions(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch admissions');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (admission) => {
    setSelectedAdmission(admission);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?'))
      return;

    try {
      await admissionsAPI.delete(id);
      toast.success('Application deleted successfully!');
      fetchAdmissions();
    } catch (error) {
      toast.error('Failed to delete application');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await admissionsAPI.updateStatus(id, status);
      toast.success(`Application ${status}!`);
      fetchAdmissions();
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleExport = async () => {
    try {
      const response = await admissionsAPI.exportToCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `admissions_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Export successful!');
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmission(null);
  };

  // Filter and search
  const filteredAdmissions = admissions.filter((admission) => {
    const matchesStatus =
      filterStatus === 'All' || admission.status === filterStatus.toLowerCase();
    const matchesClass =
      filterClass === 'All' || admission.classApplying === filterClass;
    const matchesSearch =
      searchQuery === '' ||
      admission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admission.phone.includes(searchQuery);

    return matchesStatus && matchesClass && matchesSearch;
  });

  // Table columns
  const columns = [
    { key: 'studentName', label: 'Student Name' },
    {
      key: 'dateOfBirth',
      label: 'DOB',
      render: (value) => formatDate(value),
    },
    { key: 'classApplying', label: 'Class' },
    { key: 'fatherName', label: 'Father Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`${styles.statusBadge} ${styles[value]}`}>
          {value}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Applied On',
      render: (value) => formatDate(value),
    },
    {
      key: '_id',
      label: 'Actions',
      render: (value, row) => (
        <div className={styles.tableActions}>
          <button
            className={styles.viewBtn}
            onClick={() => handleView(row)}
            title="View Details"
          >
            <FaEye />
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => handleDelete(value)}
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loader fullScreen text="Loading admissions..." />;
  }

  return (
    <div className={styles.admissionManagement}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Admission Management</h1>
          <p>View and manage admission applications</p>
        </div>
        <Button icon={<FaDownload />} onClick={handleExport}>
          Export to CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>{admissions.length}</h3>
          <p>Total Applications</p>
        </div>
        <div className={styles.statCard}>
          <h3>
            {admissions.filter((a) => a.status === 'pending').length}
          </h3>
          <p>Pending</p>
        </div>
        <div className={styles.statCard}>
          <h3>
            {admissions.filter((a) => a.status === 'approved').length}
          </h3>
          <p>Approved</p>
        </div>
        <div className={styles.statCard}>
          <h3>
            {admissions.filter((a) => a.status === 'rejected').length}
          </h3>
          <p>Rejected</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <FaFilter />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.select}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className={styles.select}
          >
            <option value="All">All Classes</option>
            {ADMISSION_CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Table */}
      {filteredAdmissions.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No Applications Found</h3>
          <p>
            {searchQuery || filterStatus !== 'All' || filterClass !== 'All'
              ? 'Try adjusting your filters'
              : 'No admission applications yet'}
          </p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <Table
            columns={columns}
            data={filteredAdmissions}
            emptyMessage="No admissions found"
          />
        </div>
      )}

      {/* View Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Admission Details"
        size="large"
      >
        {selectedAdmission && (
          <div className={styles.detailsContainer}>
            {/* Status Badge */}
            <div className={styles.detailsHeader}>
              <span
                className={`${styles.statusBadge} ${
                  styles[selectedAdmission.status]
                }`}
              >
                {selectedAdmission.status}
              </span>
              <span className={styles.appliedDate}>
                Applied on: {formatDate(selectedAdmission.createdAt)}
              </span>
            </div>

            {/* Student Details */}
            <div className={styles.detailsSection}>
              <h3>Student Information</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label>Student Name:</label>
                  <span>{selectedAdmission.studentName}</span>
                </div>
                <div className={styles.detailItem}>
                  <label>Date of Birth:</label>
                  <span>{formatDate(selectedAdmission.dateOfBirth)}</span>
                </div>
                <div className={styles.detailItem}>
                  <label>Gender:</label>
                  <span>{selectedAdmission.gender}</span>
                </div>
                <div className={styles.detailItem}>
                  <label>Class Applying For:</label>
                  <span>{selectedAdmission.classApplying}</span>
                </div>
                {selectedAdmission.previousSchool && (
                  <div className={styles.detailItem}>
                    <label>Previous School:</label>
                    <span>{selectedAdmission.previousSchool}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Parent Details */}
            <div className={styles.detailsSection}>
              <h3>Parent/Guardian Information</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label>Father's Name:</label>
                  <span>{selectedAdmission.fatherName}</span>
                </div>
                <div className={styles.detailItem}>
                  <label>Mother's Name:</label>
                  <span>{selectedAdmission.motherName}</span>
                </div>
                <div className={styles.detailItem}>
                  <label>Email:</label>
                  <span>
                    <a href={`mailto:${selectedAdmission.email}`}>
                      {selectedAdmission.email}
                    </a>
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <label>Phone:</label>
                  <span>
                    <a href={`tel:${selectedAdmission.phone}`}>
                      {selectedAdmission.phone}
                    </a>
                  </span>
                </div>
                <div
                  className={`${styles.detailItem} ${styles.fullWidth}`}
                >
                  <label>Address:</label>
                  <span>{selectedAdmission.address}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {selectedAdmission.status === 'pending' && (
              <div className={styles.modalActions}>
                <Button
                  variant="success"
                  icon={<FaCheckCircle />}
                  onClick={() =>
                    handleUpdateStatus(
                      selectedAdmission._id,
                      'approved'
                    )
                  }
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  icon={<FaTimesCircle />}
                  onClick={() =>
                    handleUpdateStatus(
                      selectedAdmission._id,
                      'rejected'
                    )
                  }
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdmissionManagement;