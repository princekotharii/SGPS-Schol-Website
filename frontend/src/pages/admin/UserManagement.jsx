import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@components/shared/Button';
import Modal from '@components/shared/Modal';
import Loader from '@components/shared/Loader';
import Table from '@components/shared/Table';
import { usersAPI } from '@api/endpoints';
import { USER_ROLES } from '@utils/constants';
import { formatDate } from '@utils/helpers';
import {
  validateRequired,
  validateEmail,
  validatePassword,
  validateUsername,
} from '@utils/validators';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaUserTie,
  FaUser,
  FaUserCheck,
  FaUserSlash,
} from 'react-icons/fa';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    document.title = 'User Management - Admin Panel';
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;

    const nameError = validateRequired(formData.name, 'Name');
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    if (!editMode) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    const roleError = validateRequired(formData.role, 'Role');
    if (roleError) newErrors.role = roleError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      const dataToSend = { ...formData };
      if (editMode && !dataToSend.password) {
        delete dataToSend.password;
      }

      if (editMode) {
        await usersAPI.update(currentUser._id, dataToSend);
        toast.success('User updated successfully!');
      } else {
        await usersAPI.create(dataToSend);
        toast.success('User created successfully!');
      }

      fetchUsers();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?'))
      return;

    try {
      await usersAPI.delete(id);
      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await usersAPI.updateStatus(id, newStatus);
      toast.success(
        `User ${newStatus === 'active' ? 'activated' : 'deactivated'}`
      );
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openModal = () => {
    setEditMode(false);
    setCurrentUser(null);
    setFormData({
      username: '',
      name: '',
      email: '',
      password: '',
      role: 'admin',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      username: '',
      name: '',
      email: '',
      password: '',
      role: 'admin',
    });
    setErrors({});
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FaUserShield className={styles.roleIconAdmin} />;
      case 'teacher':
        return <FaUserTie className={styles.roleIconTeacher} />;
      case 'student':
        return <FaUser className={styles.roleIconStudent} />;
      default:
        return <FaUser />;
    }
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Active' && user.status === 'active') ||
      (filterStatus === 'Inactive' && user.status === 'inactive');

    return matchesRole && matchesStatus;
  });

  // Table columns
  const columns = [
    {
      key: 'role',
      label: '',
      render: (value) => getRoleIcon(value),
    },
    { key: 'username', label: 'Username' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className={`${styles.roleBadge} ${styles[value]}`}>
          {value}
        </span>
      ),
    },
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
      label: 'Created',
      render: (value) => formatDate(value),
    },
    {
      key: '_id',
      label: 'Actions',
      render: (value, row) => (
        <div className={styles.tableActions}>
          <button
            className={styles.editBtn}
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            className={styles.toggleBtn}
            onClick={() => handleToggleStatus(value, row.status)}
            title={row.status === 'active' ? 'Deactivate' : 'Activate'}
          >
            {row.status === 'active' ? <FaUserSlash /> : <FaUserCheck />}
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
    return <Loader fullScreen text="Loading users..." />;
  }

  return (
    <div className={styles.userManagement}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>User Management</h1>
          <p>Manage admin users and their permissions</p>
        </div>
        <Button icon={<FaPlus />} onClick={openModal}>
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>{users.length}</h3>
          <p>Total Users</p>
        </div>
        <div className={styles.statCard}>
          <h3>
            {users.filter((u) => u.role === 'admin').length}
          </h3>
          <p>Admins</p>
        </div>
        <div className={styles.statCard}>
          <h3>
            {users.filter((u) => u.status === 'active').length}
          </h3>
          <p>Active</p>
        </div>
        <div className={styles.statCard}>
          <h3>
            {users.filter((u) => u.status === 'inactive').length}
          </h3>
          <p>Inactive</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className={styles.select}
          >
            <option value="All">All Roles</option>
            {Object.values(USER_ROLES).map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.select}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <div className={styles.emptyState}>
          <FaUser className={styles.emptyIcon} />
          <h3>No Users Found</h3>
          <p>Start by creating your first user</p>
          <Button icon={<FaPlus />} onClick={openModal}>
            Add User
          </Button>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <Table
            columns={columns}
            data={filteredUsers}
            emptyMessage="No users found"
          />
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editMode ? 'Edit User' : 'Create New User'}
        size="medium"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? styles.error : ''}
              placeholder="Enter username"
              disabled={editMode}
            />
            {errors.username && (
              <span className={styles.errorText}>{errors.username}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? styles.error : ''}
              placeholder="Enter full name"
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.error : ''}
              placeholder="Enter email address"
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
              Password {editMode && '(leave blank to keep current)'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.error : ''}
              placeholder={editMode ? 'Enter new password' : 'Enter password'}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">Role *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={errors.role ? styles.error : ''}
            >
              {Object.values(USER_ROLES).map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className={styles.errorText}>{errors.role}</span>
            )}
          </div>

          <div className={styles.modalActions}>
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {editMode ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;