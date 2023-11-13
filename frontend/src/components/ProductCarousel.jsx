import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import '../assets/CSS/ProductCarousel.css';


const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <>
    <div className='heading-products' ><h2>Discover Our Products</h2></div>
    <Carousel pause='hover' className='product-carousel mb-4 mt-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id} className='carousel-item'>
          <Link to={`/product/${product._id}`} className="carousel-link">
            {/* Set fixed dimensions for the Image component */}
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="carousel-image"
            />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right carousel-title'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
    </>
  );
};

export default ProductCarousel;
