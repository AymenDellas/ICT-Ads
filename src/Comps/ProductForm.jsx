import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";

const ProductForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    product: "",
    description: "",
    mediaUrl1: "",
    mediaUrl2: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate first URL (media link)
      const mediaUrlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      
      // Special pattern for Google Drive links
      const driveUrlPattern = /^https:\/\/drive\.google\.com\/(file\/d\/|drive\/folders\/|open\?id=)[-\w]+/;
      
      if (!mediaUrlPattern.test(formData.mediaUrl1)) {
        throw new Error("Please enter a valid media URL");
      }

      if (!driveUrlPattern.test(formData.mediaUrl2)) {
        throw new Error("Please enter a valid Google Drive link");
      }

      // Check if user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to submit a product");
      }

      // Add to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        ...formData,
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

  // Validate form before submission
  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.product.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.mediaUrl1.trim() !== "" &&
      formData.mediaUrl2.trim() !== ""
    );
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Media Link
            </label>
            <input
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.mediaUrl1}
              onChange={(e) => setFormData({ ...formData, mediaUrl1: e.target.value })}
            />
          </div>

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
            <p className="mt-1 text-sm text-gray-500">
              Please share a Google Drive link with viewing access
            </p>
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
