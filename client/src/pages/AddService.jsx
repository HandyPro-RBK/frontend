import React, { useState, useEffect } from 'react';
import ProviderNavBar from '../components/serviceProvider/ProviderNavBar'

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    providerId:1,
    description: '',
    categoryId: '',
    price: '',
    duration: '',
    isActive: true,
    image: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); 
  };
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Service name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Valid duration is required';
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
  
    const formDataImage = new FormData();
    formDataImage.append('file', imageFile); 
    formDataImage.append('upload_preset', 'ml_default2'); 
    try {
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/dlg8j6m69/image/upload`,
        {
          method: 'POST',
          body: formDataImage // Send FormData directly without headers
        }
      );
  
      // Check if the response is OK
      if (!uploadRes.ok) {
        throw new Error(`HTTP error! status: ${uploadRes.status}`);
      }
  
     
      const imageData = await uploadRes.json();
      const imageUrl = imageData.secure_url;   
      const fullData = {
        ...formData,
        image: imageUrl 
      };
  
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      // Log form data for debugging
      Object.entries(fullData).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
  
      // Send fullData to your backend
      const response = await fetch('http://127.0.0.1:3001/service/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullData) // Send the full data with image URL
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Updated to access response.status
      }
  
      setShowPopup(true);
      console.log("Response from backend:", await response.json()); // Log the backend response
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <ProviderNavBar/>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow mt-2">
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
            <label className="block text-sm font-medium text-gray-700">Price</label>
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
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              min="1"
              className={`mt-1 block w-full rounded-md border ${errors.duration ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
          </div>
          <input
        type="file"
        onChange={handleFileChange}
      />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Service
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
          Service added successfully!
        </div>
      )}
    </div>
  );
};

export default AddServiceForm;