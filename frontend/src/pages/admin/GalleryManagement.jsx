import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@components/shared/Button';
import Modal from '@components/shared/Modal';
import Loader from '@components/shared/Loader';
import { galleryAPI } from '@api/endpoints';
import { GALLERY_CATEGORIES } from '@utils/constants';
import { formatDate, getImageURL } from '@utils/helpers';
import { validateRequired, validateImage } from '@utils/validators';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaImage } from 'react-icons/fa';
import styles from './GalleryManagement.module.css';

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    document.title = 'Gallery Management - Admin Panel';
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await galleryAPI.getAll();
      setImages(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch gallery images');
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
      
      // Create preview
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

    const categoryError = validateRequired(formData.category, 'Category');
    if (categoryError) newErrors.category = categoryError;

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
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (editMode) {
        await galleryAPI.update(currentImage._id, formDataToSend);
        toast.success('Image updated successfully!');
      } else {
        await galleryAPI.create(formDataToSend);
        toast.success('Image uploaded successfully!');
      }

      fetchGallery();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (image) => {
    setEditMode(true);
    setCurrentImage(image);
    setFormData({
      title: image.title,
      category: image.category,
      description: image.description || '',
      image: null,
    });
    setImagePreview(getImageURL(image.image));
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await galleryAPI.delete(id);
      toast.success('Image deleted successfully!');
      fetchGallery();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await galleryAPI.updateStatus(id, newStatus);
      toast.success(`Image ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      fetchGallery();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openModal = () => {
    setEditMode(false);
    setCurrentImage(null);
    setFormData({ title: '', category: '', description: '', image: null });
    setImagePreview(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', category: '', description: '', image: null });
    setImagePreview(null);
    setErrors({});
  };

  const filteredImages = filterCategory === 'All' 
    ? images 
    : images.filter(img => img.category === filterCategory);

  if (loading) {
    return <Loader fullScreen text="Loading gallery..." />;
  }

  return (
    <div className={styles.galleryManagement}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Gallery Management</h1>
          <p>Upload and manage gallery images</p>
        </div>
        <Button icon={<FaPlus />} onClick={openModal}>
          Add New Image
        </Button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.categoryFilter}>
          <label>Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={styles.select}
          >
            <option value="All">All Categories</option>
            {GALLERY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.stats}>
          <span>Total: {images.length}</span>
          <span>Active: {images.filter(img => img.status === 'active').length}</span>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div className={styles.emptyState}>
          <FaImage className={styles.emptyIcon} />
          <h3>No Images Found</h3>
          <p>Start by uploading your first image</p>
          <Button icon={<FaPlus />} onClick={openModal}>
            Upload Image
          </Button>
        </div>
      ) : (
        <div className={styles.galleryGrid}>
          {filteredImages.map((image) => (
            <div key={image._id} className={styles.imageCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={getImageURL(image.image)}
                  alt={image.title}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleEdit(image)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleDelete(image._id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleToggleStatus(image._id, image.status)}
                      title={image.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {image.status === 'active' ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
                <span className={`${styles.statusBadge} ${styles[image.status]}`}>
                  {image.status}
                </span>
              </div>
              <div className={styles.imageInfo}>
                <h3>{image.title}</h3>
                <span className={styles.category}>{image.category}</span>
                {image.description && (
                  <p className={styles.description}>{image.description}</p>
                )}
                <span className={styles.date}>
                  {formatDate(image.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editMode ? 'Edit Image' : 'Add New Image'}
        size="medium"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? styles.error : ''}
              placeholder="Enter image title"
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? styles.error : ''}
            >
              <option value="">Select Category</option>
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className={styles.errorText}>{errors.category}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter image description (optional)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Image {!editMode && '*'}</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className={errors.image ? styles.error : ''}
            />
            {errors.image && <span className={styles.errorText}>{errors.image}</span>}
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
              {editMode ? 'Update Image' : 'Upload Image'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GalleryManagement;