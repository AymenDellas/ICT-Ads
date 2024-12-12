import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";

const ProductForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    product: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    mediaUrl2: "",
    mediaType: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.product.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.mediaUrl2.trim() !== "" &&
      formData.mediaType !== ""
    );
  };

  const convertDriveLink = (url) => {
    try {
      if (url.includes('drive.google.com')) {
        const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (fileId && fileId[1]) {
          return `https://drive.google.com/file/d/${fileId[1]}/preview`;
        }
      }
      return url;
    } catch (error) {
      console.error("Error converting Drive link:", error);
      return url;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.imageUrl && !formData.videoUrl) {
        throw new Error("Please provide either an image or video link");
      }

      const processedData = {
        ...formData,
        videoUrl: formData.videoUrl ? convertDriveLink(formData.videoUrl) : "",
      };

      await addDoc(collection(db, "products"), {
        ...processedData,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      });

      alert("Product added successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      setError(error.message || "Failed to submit product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMediaChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      mediaType: type,
      imageUrl: type === 'image' ? value : '',
      videoUrl: type === 'video' ? value : '',
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="mediaType"
                value="image"
                checked={formData.mediaType === 'image'}
                onChange={(e) => handleMediaChange('image', '')}
                className="mr-2"
              />
              Image
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="mediaType"
                value="video"
                checked={formData.mediaType === 'video'}
                onChange={(e) => handleMediaChange('video', '')}
                className="mr-2"
              />
              Video
            </label>
          </div>

          {formData.mediaType === 'image' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Link
              </label>
              <input
                type="url"
                placeholder="Enter image URL..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.imageUrl}
                onChange={(e) => handleMediaChange('image', e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload your image to PostImages and paste the direct link here
              </p>
            </div>
          )}

          {formData.mediaType === 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video Link (Google Drive)
              </label>
              <input
                type="url"
                placeholder="Enter Google Drive video link..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.videoUrl}
                onChange={(e) => handleMediaChange('video', e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">
                Share your video on Google Drive and paste the link here
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Word and PowerPoint Presentation Link
            </label>
            <input
              type="url"
              required
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.mediaUrl2}
              onChange={(e) => setFormData({ ...formData, mediaUrl2: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                (loading || !isFormValid()) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
