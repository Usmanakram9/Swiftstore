import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Rating from './Rating';
import '../assets/CSS/index.css';

const Product = ({ product }) => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={fadeIn}>
      <Card className='mb-4 shadow-sm product-card'>
        <Link to={`/product/${product._id}`} className="card-link">
          <Card.Img
            src={product.image}
            alt={product.name}
            variant='top'
            className='card-img'
          />
        </Link>

        <Card.Body className="d-flex flex-column">
          <Link to={`/product/${product._id}`} className="text-decoration-none mb-auto">
            <Card.Title as="h5">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='div'>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>

          <Link to={`/product/${product._id}`} className="mt-auto text-decoration-none">
            <Button variant="primary">View Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </animated.div>
  );
};

export default Product;
