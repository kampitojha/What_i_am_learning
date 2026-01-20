// Yeh ek React Component ka example hai jo Backend se baat karega

import React, { useState, useEffect } from 'react';

const SpicesCategoryPage = () => {
  // 1. STATE: Data ko store karne ke liye dabba
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);

  // 2. EFFECT: Jab page load ho, tab data mango
  useEffect(() => {
    // Backend ko call lagayi
    fetch('http://localhost:5000/api/categories/spices')
      .then(response => response.json()) // Jawab ko JSON mein badla
      .then(result => {
        // Result wahi hai jo humne server.js mein bheja tha
        // result.data = wo 3 cards wala array
        setCategories(result.data); 
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Spices...</div>;

  return (
    <div className="category-container">
      <h1>Shop By Category (Powered by Backend)</h1>
      
      <div className="cards-grid">
        {/*
            3. MAPPING: Array ke har item ke liye Loop chalana
            Backend ne 3 items bheje, to ye loop 3 baar chalega
        */}
        {categories.map((item) => (
          <div key={item.id} className="card">
            
            {/* Image URL Backend se aaya */}
            <img src={item.imageUrl} alt={item.title} />
            
            <div className="card-content">
              {/* Title aur Count Backend se aaya */}
              <h3>{item.title}</h3>
              <p>{item.productCount} Products</p>
              
              <button>VIEW arrow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpicesCategoryPage;
