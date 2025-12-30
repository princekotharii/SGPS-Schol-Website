import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@components/shared/Button';
import Modal from '@components/shared/Modal';
import Loader from '@components/shared/Loader';
import Table from '@components/shared/Table';
import { contactAPI } from '@api/endpoints';
import { CONTACT_SUBJECTS } from '@utils/constants';
import { formatDate, getRelativeTime } from '@utils/helpers';
import {
  FaEye,
  FaTrash,
  FaEnvelope,
  FaEnvelopeOpen,
  FaFilter,
} from 'react-icons/fa';
import styles from './ContactManagement.module.css';

const ContactManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSubject, setFilterSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Contact Management - Admin Panel';
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch messages');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);

    // Mark as read if unread
    if (!message.isRead) {
      try {
        await contactAPI.markAsRead(message._id);
        fetchMessages();
      } catch (error) {
        console.error('Failed to mark as read:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?'))
      return;

    try {
      await contactAPI.delete(id);
      toast.success('Message deleted successfully!');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  // Filter and search
  const filteredMessages = messages.filter((message) => {
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Read' && message.isRead) ||
      (filterStatus === 'Unread' && !message.isRead);
    const matchesSubject =
      filterSubject === 'All' || message.subject === filterSubject;
    const matchesSearch =
      searchQuery === '' ||
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSubject && matchesSearch;
  });

  // Table columns
  const columns = [
    {
      key: 'isRead',
      label: '',
      render: (value) =>
        value ? (
          <FaEnvelopeOpen className={styles.readIcon} />
        ) : (
          <FaEnvelope className={styles.unreadIcon} />
        ),
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'subject', label: 'Subject' },
    {
      key: 'message',
      label: 'Message',
      render: (value) => (
        <span className={styles.messagePreview}>
          {value.substring(0, 50)}...
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Received',
      render: (value) => (
        <span title={formatDate(value)}>{getRelativeTime(value)}</span>
      ),
    },
    {
      key: '_id',
      label: 'Actions',
      render: (value, row) => (
        <div className={styles.tableActions}>
          <button
            className={styles.viewBtn}
            onClick={() => handleView(row)}
            title="View Message"
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
    return <Loader fullScreen text="Loading messages..." />;
  }

  return (
    <div className={styles.contactManagement}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Contact Management</h1>
          <p>View and respond to contact messages</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>{messages.length}</h3>
          <p>Total Messages</p>
        </div>
        <div className={styles.statCard}>
          <h3>{messages.filter((m) => !m.isRead).length}</h3>
          <p>Unread</p>
        </div>
        <div className={styles.statCard}>
          <h3>{messages.filter((m) => m.isRead).length}</h3>
          <p>Read</p>
        </div>
        <div className={styles.statCard}>
          <h3>
            {
              messages.filter(
                (m) =>
                  new Date(m.createdAt) >
                  new Date(Date.now() - 24 * 60 * 60 * 1000)
              ).length
            }
          </h3>
          <p>Today</p>
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
            <option value="All">All Messages</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
          </select>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className={styles.select}
          >
            <option value="All">All Subjects</option>
            {CONTACT_SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Table */}
      {filteredMessages.length === 0 ? (
        <div className={styles.emptyState}>
          <FaEnvelope className={styles.emptyIcon} />
          <h3>No Messages Found</h3>
          <p>
            {searchQuery || filterStatus !== 'All' || filterSubject !== 'All'
              ? 'Try adjusting your filters'
              : 'No contact messages yet'}
          </p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <Table
            columns={columns}
            data={filteredMessages}
            emptyMessage="No messages found"
          />
        </div>
      )}

      {/* View Message Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Message Details"
        size="medium"
      >
        {selectedMessage && (
          <div className={styles.messageDetails}>
            <div className={styles.messageHeader}>
              <div className={styles.senderInfo}>
                <h3>{selectedMessage.name}</h3>
                <p>
                  <a href={`mailto:${selectedMessage.email}`}>
                    {selectedMessage.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${selectedMessage.phone}`}>
                    {selectedMessage.phone}
                  </a>
                </p>
              </div>
              <div className={styles.messageTime}>
                <span>{formatDate(selectedMessage.createdAt)}</span>
                <span>{getRelativeTime(selectedMessage.createdAt)}</span>
              </div>
            </div>

            <div className={styles.messageSubject}>
              <label>Subject:</label>
              <span>{selectedMessage.subject}</span>
            </div>

            <div className={styles.messageBody}>
              <label>Message:</label>
              <p>{selectedMessage.message}</p>
            </div>

            <div className={styles.messageActions}>
              <Button
                icon={<FaEnvelope />}
                onClick={() =>
                  (window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)
                }
              >
                Reply via Email
              </Button>
              <Button
                variant="danger"
                icon={<FaTrash />}
                onClick={() => {
                  handleDelete(selectedMessage._id);
                  closeModal();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactManagement;