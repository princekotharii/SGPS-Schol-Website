import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@components/shared/Button';
import Modal from '@components/shared/Modal';
import Loader from '@components/shared/Loader';
import { eventsAPI } from '@api/endpoints';
import { EVENT_TYPES } from '@utils/constants';
import { formatDate, getImageURL } from '@utils/helpers';
import {
  validateRequired,
  validateDate,
  validateFutureDate,
  validateImage,
} from '@utils/validators';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import styles from './EventManagement.module.css';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    time: '',
    venue: '',
    eventType: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    document.title = 'Event Management - Admin Panel';
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch events');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const titleError = validateRequired(formData.title, 'Title');
    if (titleError) newErrors.title = titleError;

    const descError = validateRequired(formData.description, 'Description');
    if (descError) newErrors.description = descError;

    const dateError = validateDate(formData.eventDate);
    if (dateError) newErrors.eventDate = dateError;

    const venueError = validateRequired(formData.venue, 'Venue');
    if (venueError) newErrors.venue = venueError;

    const typeError = validateRequired(formData.eventType, 'Event Type');
    if (typeError) newErrors.eventType = typeError;

    if (!editMode && !formData.image) {
      newErrors.image = 'Please select an image';
    } else if (formData.image) {
      const imageError = validateImage(formData.image);
      if (imageError) newErrors.image = imageError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('eventDate', formData.eventDate);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('venue', formData.venue);
      formDataToSend.append('eventType', formData.eventType);

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (editMode) {
        await eventsAPI.update(currentEvent._id, formDataToSend);
        toast.success('Event updated successfully!');
      } else {
        await eventsAPI.create(formDataToSend);
        toast.success('Event created successfully!');
      }

      fetchEvents();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event) => {
    setEditMode(true);
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      eventDate: event.eventDate ? event.eventDate.split('T')[0] : '',
      time: event.time || '',
      venue: event.venue,
      eventType: event.eventType,
      image: null,
    });
    setImagePreview(getImageURL(event.image));
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await eventsAPI.delete(id);
      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await eventsAPI.updateStatus(id, newStatus);
      toast.success(
        `Event ${newStatus === 'active' ? 'activated' : 'deactivated'}`
      );
      fetchEvents();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openModal = () => {
    setEditMode(false);
    setCurrentEvent(null);
    setFormData({
      title: '',
      description: '',
      eventDate: '',
      time: '',
      venue: '',
      eventType: '',
      image: null,
    });
    setImagePreview(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      eventDate: '',
      time: '',
      venue: '',
      eventType: '',
      image: null,
    });
    setImagePreview(null);
    setErrors({});
  };

  const filteredEvents =
    filterType === 'All'
      ? events
      : events.filter((event) => event.eventType === filterType);

  if (loading) {
    return <Loader fullScreen text="Loading events..." />;
  }

  return (
    <div className={styles.eventManagement}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Event Management</h1>
          <p>Create and manage school events</p>
        </div>
        <Button icon={<FaPlus />} onClick={openModal}>
          Add New Event
        </Button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.typeFilter}>
          <label>Filter by Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.select}
          >
            <option value="All">All Types</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.stats}>
          <span>Total: {events.length}</span>
          <span>
            Active: {events.filter((e) => e.status === 'active').length}
          </span>
          <span>
            Upcoming:{' '}
            {
              events.filter(
                (e) => new Date(e.eventDate) >= new Date()
              ).length
            }
          </span>
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className={styles.emptyState}>
          <FaCalendar className={styles.emptyIcon} />
          <h3>No Events Found</h3>
          <p>Start by creating your first event</p>
          <Button icon={<FaPlus />} onClick={openModal}>
            Create Event
          </Button>
        </div>
      ) : (
        <div className={styles.eventsList}>
          {filteredEvents.map((event) => {
            const isPast = new Date(event.eventDate) < new Date();
            return (
              <div key={event._id} className={styles.eventCard}>
                <div className={styles.eventImage}>
                  <img
                    src={getImageURL(event.image)}
                    alt={event.title}
                  />
                  <span
                    className={`${styles.statusBadge} ${styles[event.status]}`}
                  >
                    {event.status}
                  </span>
                  {isPast && (
                    <span className={styles.pastBadge}>Past Event</span>
                  )}
                </div>

                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <div>
                      <h3>{event.title}</h3>
                      <span className={styles.eventType}>
                        {event.eventType}
                      </span>
                    </div>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleEdit(event)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleDelete(event._id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() =>
                          handleToggleStatus(event._id, event.status)
                        }
                        title={
                          event.status === 'active'
                            ? 'Deactivate'
                            : 'Activate'
                        }
                      >
                        {event.status === 'active' ? (
                          <FaEye />
                        ) : (
                          <FaEyeSlash />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className={styles.description}>{event.description}</p>

                  <div className={styles.eventDetails}>
                    <div className={styles.detailItem}>
                      <FaCalendar />
                      <span>{formatDate(event.eventDate)}</span>
                    </div>
                    {event.time && (
                      <div className={styles.detailItem}>
                        <FaClock />
                        <span>{event.time}</span>
                      </div>
                    )}
                    <div className={styles.detailItem}>
                      <FaMapMarkerAlt />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editMode ? 'Edit Event' : 'Create New Event'}
        size="large"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Event Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? styles.error : ''}
                placeholder="Enter event title"
              />
              {errors.title && (
                <span className={styles.errorText}>{errors.title}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="eventType">Event Type *</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={errors.eventType ? styles.error : ''}
              >
                <option value="">Select Type</option>
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.eventType && (
                <span className={styles.errorText}>{errors.eventType}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={errors.description ? styles.error : ''}
              placeholder="Enter event description"
            />
            {errors.description && (
              <span className={styles.errorText}>{errors.description}</span>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="eventDate">Event Date *</label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className={errors.eventDate ? styles.error : ''}
              />
              {errors.eventDate && (
                <span className={styles.errorText}>{errors.eventDate}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g., 10:00 AM"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="venue">Venue *</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className={errors.venue ? styles.error : ''}
              placeholder="Enter event venue"
            />
            {errors.venue && (
              <span className={styles.errorText}>{errors.venue}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Event Image {!editMode && '*'}</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className={errors.image ? styles.error : ''}
            />
            {errors.image && (
              <span className={styles.errorText}>{errors.image}</span>
            )}
            {imagePreview && (
              <div className={styles.preview}>
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className={styles.modalActions}>
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {editMode ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventManagement;