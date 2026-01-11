import React from 'react';
import ProductCard from './components/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import TailwindExplainCard from './components/TailwindExplainCard';

const products = [
  {
    id: 1,
    image: '/images/product1.png',
    category: 'Facial Care',
    title: 'Facial Cleanser KANKI Your Skin Bae Kojic Acid 100ml',
    price: 399
  },
  {
    id: 2,
    image: '/images/product2.png',
    category: 'Facial Care',
    title: 'Moisturizer KANKI Your Skin Bae Multi Herbs 15ml',
    price: 349
  },
  {
    id: 3,
    image: '/images/product3.png',
    category: 'Facial Care',
    title: 'Deep Body Cleanser KANKI My Serendipity No.1 200ml',
    price: 499
  },
  {
    id: 4,
    image: '/images/product4.png',
    category: 'Facial Care',
    title: 'Facial Cleanser KANKI Your Skin Bae Spirulina 100ml',
    price: 359
  }
];

function App() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-rose-500 animate-pulse" />
            <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">
              Premium Skincare
            </span>
            <Sparkles className="w-6 h-6 text-rose-500 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            New Arrivals
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The latest products from <span className="font-semibold text-rose-600">KANKI</span> to brighten and nourish your beautiful skin.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Tailwind Demo Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Tailwind Concept Demo</h2>
          <TailwindExplainCard />
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
            <span className="text-lg">SEE ALL PRODUCTS</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
}

export default App;
