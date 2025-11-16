import { useEffect, useState } from 'react';
import PageHeader from '@components/shared/PageHeader';
import Card from '@components/shared/Card';
import Loader from '@components/shared/Loader';
import { eventsAPI } from '@api/endpoints';
import { formatDate, getImageURL } from '@utils/helpers';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Events.module.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    document.title = 'Events - SGPS School';
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll({ status: 'active' });
      setEvents(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // Use dummy data for demo
      const dummyEvents = [
        {
          _id: '1',
          title: 'Annual Sports Day 2025',
          description:
            'Join us for an exciting day of sports competitions, athletic performances, and team spirit.',
          eventDate: '2025-12-15',
          time: '09:00 AM',
          venue: 'School Sports Ground',
          eventType: 'Sports',
          image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
        },
        {
          _id: '2',
          title: 'Science Exhibition',
          description:
            'Students showcase innovative science projects and experiments in this annual exhibition.',
          eventDate: '2025-11-25',
          time: '10:00 AM',
          venue: 'School Auditorium',
          eventType: 'Academic',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600',
        },
        {
          _id: '3',
          title: 'Cultural Fest 2025',
          description:
            'A celebration of art, music, dance, and drama featuring performances by talented students.',
          eventDate: '2025-12-20',
          time: '05:00 PM',
          venue: 'School Auditorium',
          eventType: 'Cultural',
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
        },
        {
          _id: '4',
          title: 'Parent-Teacher Meeting',
          description:
            'Important meeting to discuss student progress and academic performance.',
          eventDate: '2025-11-20',
          time: '02:00 PM',
          venue: 'Respective Classrooms',
          eventType: 'Meeting',
          image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600',
        },
        {
          _id: '5',
          title: 'Republic Day Celebration',
          description:
            'Celebrating the spirit of Indian Republic with flag hoisting and cultural programs.',
          eventDate: '2026-01-26',
          time: '08:00 AM',
          venue: 'School Ground',
          eventType: 'Holiday',
          image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600',
        },
      ];
      setEvents(dummyEvents);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activeTab === 'upcoming') {
      return events.filter((event) => new Date(event.eventDate) >= today);
    } else {
      return events.filter((event) => new Date(event.eventDate) < today);
    }
  };

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Events' },
  ];

  if (loading) {
    return <Loader fullScreen text="Loading Events..." />;
  }

  const filteredEvents = filterEvents();

  return (
    <div className={styles.events}>
      <PageHeader
        title="School Events"
        subtitle="Stay updated with our upcoming activities and celebrations"
        breadcrumbs={breadcrumbs}
      />

      <div className="container">
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'upcoming' ? styles.active : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'past' ? styles.active : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Events
          </button>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className={styles.emptyState}>
            <p>
              {activeTab === 'upcoming'
                ? 'No upcoming events scheduled'
                : 'No past events available'}
            </p>
          </div>
        ) : (
          <div className={styles.eventsGrid}>
            {filteredEvents.map((event, index) => (
              <Card
                key={event._id}
                className={styles.eventCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.eventImage}>
                  <img
                    src={getImageURL(event.image)}
                    alt={event.title}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600';
                    }}
                  />
                  <span className={styles.eventType}>{event.eventType}</span>
                </div>

                <div className={styles.eventContent}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDescription}>{event.description}</p>

                  <div className={styles.eventDetails}>
                    <div className={styles.detailItem}>
                      <FaCalendar className={styles.detailIcon} />
                      <span>{formatDate(event.eventDate)}</span>
                    </div>

                    {event.time && (
                      <div className={styles.detailItem}>
                        <FaClock className={styles.detailIcon} />
                        <span>{event.time}</span>
                      </div>
                    )}

                    {event.venue && (
                      <div className={styles.detailItem}>
                        <FaMapMarkerAlt className={styles.detailIcon} />
                        <span>{event.venue}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;