import { useEffect, useState } from 'react';
import PageHeader from '@components/shared/PageHeader';
import Loader from '@components/shared/Loader';
import { galleryAPI } from '@api/endpoints';
import { GALLERY_CATEGORIES } from '@utils/constants';
import { getImageURL } from '@utils/helpers';
import styles from './Gallery.module.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    document.title = 'Gallery - SGPS School';
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await galleryAPI.getAll({ status: 'active' });
      setImages(response.data.data || []);
      setFilteredImages(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
      // Use dummy data for demo
      const dummyImages = [
        {
          _id: '1',
          title: 'Annual Day Celebration',
          category: 'Events',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
        },
        {
          _id: '2',
          title: 'Sports Day',
          category: 'Sports',
          image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
        },
        {
          _id: '3',
          title: 'Science Exhibition',
          category: 'Academic',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600',
        },
        {
          _id: '4',
          title: 'Cultural Fest',
          category: 'Cultural',
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
        },
        {
          _id: '5',
          title: 'School Infrastructure',
          category: 'Infrastructure',
          image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600',
        },
        {
          _id: '6',
          title: 'Award Ceremony',
          category: 'Achievements',
          image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600',
        },
        {
          _id: '7',
          title: 'Inter-School Competition',
          category: 'Sports',
          image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600',
        },
        {
          _id: '8',
          title: 'Art Exhibition',
          category: 'Cultural',
          image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600',
        },
      ];
      setImages(dummyImages);
      setFilteredImages(dummyImages);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.category === category));
    }
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Gallery' },
  ];

  if (loading) {
    return <Loader fullScreen text="Loading Gallery..." />;
  }

  return (
    <div className={styles.gallery}>
      <PageHeader
        title="Photo Gallery"
        subtitle="Capturing memorable moments and achievements"
        breadcrumbs={breadcrumbs}
      />

      <div className="container">
        {/* Category Filter */}
        <div className={styles.filterSection}>
          <h3>Filter by Category</h3>
          <div className={styles.categoryButtons}>
            <button
              className={`${styles.categoryBtn} ${
                selectedCategory === 'All' ? styles.active : ''
              }`}
              onClick={() => handleCategoryChange('All')}
            >
              All
            </button>
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category ? styles.active : ''
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No images found in this category</p>
          </div>
        ) : (
          <div className={styles.galleryGrid}>
            {filteredImages.map((image, index) => (
              <div
                key={image._id}
                className={styles.galleryItem}
                onClick={() => openLightbox(image)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={getImageURL(image.image)}
                  alt={image.title}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <h4>{image.title}</h4>
                  <span className={styles.category}>{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox}>
            ×
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={getImageURL(selectedImage.image)}
              alt={selectedImage.title}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxInfo}>
              <h3>{selectedImage.title}</h3>
              <span className={styles.lightboxCategory}>
                {selectedImage.category}
              </span>
              {selectedImage.description && (
                <p>{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
