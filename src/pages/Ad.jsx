import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Ad = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setAd({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  const renderMedia = () => {
    if (ad.videoUrl) {
      return (
        <div className="w-full h-full aspect-video">
          <iframe
            src={ad.videoUrl}
            className="w-full h-full rounded-xl"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded Drive Video"
          />
        </div>
      );
    } else if (ad.imageUrl) {
      return (
        <img
          src={ad.imageUrl}
          alt={ad.product}
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            console.error('Image failed to load:', ad.imageUrl);
            e.target.src = '/path/to/default-image.jpg'; // Add a fallback image
          }}
        />
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <p className="text-gray-500">No media available</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-primaryContent">Loading...</div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-primaryContent">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Media Section */}
        <div className="md:w-1/2">
          <div className="aspect-w-16 aspect-h-12 rounded-xl overflow-hidden bg-gray-100">
            {renderMedia()}
          </div>
        </div>

        {/* Right Side - Content Section */}
        <div className="md:w-1/2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-primaryContent">{ad.product}</h1>
            <p className="mt-2 text-sm text-primaryContent opacity-75">Posted by {ad.fullName}</p>
            <p className="mt-1 text-sm text-primaryContent opacity-75">
              {new Date(ad.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-primaryContent">Description</h3>
            <div className="mt-4 prose prose-sm text-primaryContent opacity-90">
              {ad.description}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Drive Link */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="text-lg font-medium text-primaryContent mb-4">
          Word and PowerPoint Presentation
        </h3>
        <a
          href={ad.mediaUrl2}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-actions text-primaryContent rounded-lg hover:opacity-90 transition-opacity"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          View Presentation
        </a>
      </div>
    </div>
  );
};

export default Ad;
