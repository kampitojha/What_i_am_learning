import { useState } from 'react';
import { Heart } from 'lucide-react';

interface ProductProps {
  image: string;
  category: string;
  title: string;
  price: number;
}

const ProductCard = ({ image, category, title, price }: ProductProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="wishlist-btn"
          aria-label="Add to wishlist"
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-300 ${
              isWishlisted 
                ? 'fill-rose-500 text-rose-500 scale-110' 
                : 'text-gray-600'
            }`}
          />
        </button>
      </div>
      
      <div className="p-6">
        <p className="category-badge">{category}</p>
        <h3 className="product-title">{title}</h3>
        <p className="price-tag">₹{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
