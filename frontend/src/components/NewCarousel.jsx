import React, { useState, useEffect } from 'react';
import '../assets/CSS/NewCarousel.css';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const NewCarousel = () => {
  const itemsPerPage = 4;
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: products, isLoading, error } = useGetTopProductsQuery();

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, products]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant='danger'>Error fetching top products</Message>;
  }

  return (
    <div className="carousel-container">
      <h2 className="carousel-title" style={{fontSize: '40px'}} >Featured Products</h2>
      <div className="carousel">
        {products
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map((product, index) => (
            <div key={index} className="slide">
              <img src={product.image} alt={`Product ${currentIndex + index + 1}`} style={{ height: '200px' }} />
              <p className="product-name">{product.name}</p>
            </div>
          ))}
      </div>
      <button className="nav-button prev" onClick={prevSlide}>
        &#8249;
      </button>
      <button className="nav-button next" onClick={nextSlide}>
        &#8250;
      </button>
    </div>
  );
};

export default NewCarousel;
