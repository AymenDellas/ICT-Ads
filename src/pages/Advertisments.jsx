import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Advertisments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch ads from Firebase
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const adsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAds(adsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Highlight matching text
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="bg-yellow-200 text-gray-900">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  // Filter and sort ads
  const getFilteredAds = () => {
    let filteredResults = [...ads];

    // Search filter
    if (searchTerm) {
      filteredResults = filteredResults.filter(
        (ad) =>
          ad.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "name":
        filteredResults.sort((a, b) => a.product.localeCompare(b.product));
        break;
      case "recent":
        filteredResults.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filteredResults;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6 mt-32">
      {/* Search and Sort Controls */}
      <div className="mb-8 flex justify-end gap-4">
        <input
          type="text"
          placeholder="Search by product or student name..."
          className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-actions text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-40 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-actions text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default Sort</option>
          <option value="name">Name</option>
          <option value="recent">Most Recent</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {getFilteredAds().map((ad) => (
          <div
            key={ad.id}
            onClick={() => navigate(`/ad/${ad.id}`)}
            className="cursor-pointer group bg-white rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={ad.mediaUrl1}
                alt={ad.product}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 bg-actions">
              <h3 className="font-semibold text-primaryContent text-sm mb-1 truncate">
                {highlightText(ad.product, searchTerm)}
              </h3>
              <div className="flex justify-between items-center">
                <p className="text-primaryContent text-xs truncate">
                  {highlightText(ad.fullName, searchTerm)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getFilteredAds().length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
};

export default Advertisments;
