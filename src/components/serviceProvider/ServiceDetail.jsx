import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProviderNavBar from './ProviderNavBar';
import Footer from '../Homepage/Footer';
import { Star, Clock, ArrowLeft, Upload, CheckCircle, Loader } from 'lucide-react';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ uploading: false, complete: false });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image: ""
  });

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://127.0.0.1:3001/serviceDetail/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch service details');
      }

      const data = await response.json();
      setService(data);
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
        image: data.image
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadStatus({ uploading: true, complete: false });
      const formDataImage = new FormData();
      formDataImage.append('file', file);
      formDataImage.append('upload_preset', 'ml_default2');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dlg8j6m69/image/upload',
        {
          method: 'POST',
          body: formDataImage
        }
      );

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        image: data.secure_url
      }));
      setUploadStatus({ uploading: false, complete: true });
      
      setTimeout(() => {
        setUploadStatus({ uploading: false, complete: false });
      }, 3000);
    } catch (error) {
      console.error('Image upload error:', error);
      setUploadStatus({ uploading: false, complete: false });
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://127.0.0.1:3001/serviceDetail/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      setService({
        ...service,
        ...formData
      });
      
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setEditMode(false);
      }, 2000);

    } catch (error) {
      setError('Failed to update service');
      console.error('Update error:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://127.0.0.1:3001/serviceDetail/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      navigate('/provider/dashboard');
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete service');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0A165E] to-[#2B4DFF]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FF9202] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <p className="text-gray-800 font-medium">Service updated successfully!</p>
          </div>
        </div>
      )}
      <ProviderNavBar />
      <div className="min-h-screen bg-gradient-to-r from-[#0A165E] to-[#2B4DFF] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/ServiceProvider')}
            className="text-white flex items-center gap-2 mb-6 hover:text-[#FF9202] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="flex gap-8">
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-xl p-8">
                {editMode ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Service Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#2B4DFF] focus:ring focus:ring-[#2B4DFF]/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Duration (hours)</label>
                        <input
                          type="number"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#2B4DFF] focus:ring focus:ring-[#2B4DFF]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Price per Hour</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#2B4DFF] focus:ring focus:ring-[#2B4DFF]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#2B4DFF] focus:ring focus:ring-[#2B4DFF]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Service Image</label>
                      <div className="mt-2 flex items-center gap-6">
                        {formData.image && (
                          <div className="w-48 h-48 overflow-hidden rounded-lg shadow-md">
                            <img
                              src={formData.image}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <label className="relative flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2B4DFF]">
                          {uploadStatus.uploading ? (
                            <div className="flex flex-col items-center">
                              <Loader className="w-8 h-8 text-[#2B4DFF] animate-spin" />
                              <span className="mt-2 text-sm text-gray-500">Uploading...</span>
                            </div>
                          ) : uploadStatus.complete ? (
                            <div className="flex flex-col items-center">
                              <CheckCircle className="w-8 h-8 text-green-500" />
                              <span className="mt-2 text-sm text-gray-500">Upload Complete</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                            </>
                          )}
                          <input
                            type="file"
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdate}
                        className="px-6 py-2 bg-[#FF9202] text-white rounded-lg hover:bg-[#FF9202]/90"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-8">
                      <h1 className="text-4xl font-bold text-[#0A165E]">{service?.name}</h1>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setEditMode(true)}
                          className="px-6 py-3 bg-[#FF9202] text-white rounded-lg hover:bg-[#FF9202]/90"
                        >
                          To modify
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                        <Star className="w-8 h-8 text-[#FF9202]" />
                        <div>
                          <div className="text-xl font-bold">{service?.averageRating || 0}/5</div>
                          <div className="text-gray-500">{service?.reviews?.length || 0} reviews</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                        <Clock className="w-8 h-8 text-[#2B4DFF]" />
                        <div>
                          <div className="text-xl font-bold">{service?.duration}h</div>
                          <div className="text-gray-500">Duration</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                        <div className="text-xl font-bold">{service?.price} DT</div>
                        <div className="text-gray-500">per hour</div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-[#0A165E] mb-4">Description</h2>
                      <p className="text-gray-600 leading-relaxed">{service?.description}</p>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-[#0A165E] mb-4">Service Image</h2>
                      {service?.image && (
                        <div className="w-48 h-48 mx-auto">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-8">
                      <h2 className="text-2xl font-bold text-[#0A165E] mb-6">Reviews</h2>
                      <div className="grid grid-cols-1 gap-6">
                        {service?.reviews?.map((review) => (
                          <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <img 
                                src={review.user.photoUrl || '/default-avatar.png'} 
                                alt={review.user.username}
                                className="w-12 h-12 rounded-full object-cover border-2 border-[#FF9202]"
                              />
                              <div>
                                <div className="font-medium text-[#0A165E]">
                                  {review.user.username}
                                </div>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? 'text-[#FF9202] fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                        </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Ratings Summary */}
            {!editMode && (
              <div className="w-80 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-xl p-6 sticky top-6">
                  <h2 className="text-2xl font-bold text-[#0A165E] mb-6">Reviews Summary</h2>
                  <div className="text-5xl font-bold text-[#0A165E] mb-6 flex items-baseline gap-2">
                    {service?.averageRating || 0}
                    <span className="text-2xl text-gray-500">/5</span>
                  </div>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3 mb-3">
                      <span className="w-4 text-gray-600">{rating}</span>
                      <Star className="w-5 h-5 text-[#FF9202] fill-current" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF9202] rounded-full transition-all duration-500"
                          style={{
                            width: `${((service?.reviews?.filter(r => r.rating === rating).length || 0) / (service?.reviews?.length || 1)) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12 text-right">
                        {service?.reviews?.filter(r => r.rating === rating).length || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetail;