import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import '../assets/CSS/index.css'
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import NewCarousel from '../components/NewCarousel';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import NewHeaders from '../components/NewHeaders';
import HotDeal from '../components/HotDeal';
import NewsLetter from '../components/NewsLetter';
const HomeScreen = () => {

  const { pageNumber, keyword } = useParams();
  const [headerName, setHeaderName] = useState('Latest Products')

  const { data, isLoading, isError } = useGetProductsQuery({ keyword, pageNumber });
  
  useEffect(()=>{
    if(keyword){
      setHeaderName('Search Results')
    }
  }, [keyword])

  return (
    <>
    
   
    { !keyword ? (
    <>
    <NewHeaders/>
    <ProductCarousel/> 
    </>
    )
    : (<Link to='/' className='btn btn-light mb-4'>Go Back</Link>)  }
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{isError.data?.message || isError.error}</Message>
      ) : (
        <>
        <div>
      {!keyword && <HotDeal/> }  
        </div>
        <Meta/>
          <h2  id='latestProducts' style={{marginTop: '40px', textAlign:'center', fontSize: '40px'}} >{headerName}</h2>
          <Row className="mb-4" style={{marginTop: '40px'}} >
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                <Product product={product} ></Product>
              </Col>
            ))}
          </Row>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
          </div>
        </>
      )}

      { !keyword && <NewsLetter/> } 
    </>
  );
};

export default HomeScreen;
