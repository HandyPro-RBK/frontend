import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const AddServiceModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    providerId: 1,
    description: '',
    categoryId: '',
    price: '',
    duration: '',
    isActive: true,
    image: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/service/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Service name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Valid duration is required';
    if (!imageFile) newErrors.image = 'Image is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataImage = new FormData();
    formDataImage.append('file', imageFile);
    formDataImage.append('upload_preset', 'ml_default2');

    try {
      const uploadRes = await fetch(
        'https://api.cloudinary.com/v1_1/dlg8j6m69/image/upload',
        {
          method: 'POST',
          body: formDataImage
        }
      );

      if (!uploadRes.ok) {
        throw new Error(`HTTP error! status: ${uploadRes.status}`);
      }

      const imageData = await uploadRes.json();
      const imageUrl = imageData.secure_url;

      // Calculate total price based on hourly rate and duration
      const totalPrice = parseFloat(formData.price) * parseFloat(formData.duration);
      
      const fullData = {
        ...formData,
        image: imageUrl,
        totalPrice: totalPrice
      };

      const response = await fetch('http://127.0.0.1:3001/service/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      onClose();
      // Reset form
      setFormData({
        name: '',
        providerId: 1,
        description: '',
        categoryId: '',
        price: '',
        duration: '',
        isActive: true,
        image: ""
      });
      setImageFile(null);
      setErrors({});
    } catch (error) {
      console.error('Error:', error);
      setErrors(prev => ({ ...prev, submit: 'Error submitting form. Please try again.' }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Add New Service</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className={`mt-1 block w-full rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} p-2`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price (Hour)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (Hour)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              min="1"
              className={`mt-1 block w-full rounded-md border ${errors.duration ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            {formData.price && formData.duration && (
              <p className="text-sm text-gray-600 mt-1">
                Total Price: ${(parseFloat(formData.price) * parseFloat(formData.duration)).toFixed(2)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className={`mt-1 block w-full ${errors.image ? 'text-red-500' : ''}`}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Service
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddServiceModal;