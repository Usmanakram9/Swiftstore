import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import '../../assets/CSS/ProductEditScreen.css'


const ProductEditScreen = () => {

  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setprice] = useState('')
  const [image, setimage] = useState('')
  const [brand, setbrand] = useState('')
  const [category, setcategory] = useState('')
  const [countInStock, setcountInStock] = useState(0);
  const [description, setdescription] = useState('');

  const [ uploadProductImage, {isLoading: loadingUpload} ] = useUploadProductImageMutation();

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const navigate = useNavigate();

  useEffect(()=> {
    if(product){
      setName(product.name)
      setprice(product.price);
      setimage(product.image);
      setbrand(product.brand);
      setcategory(product.category);
      setcountInStock(product.countInStock);
      setdescription(product.description);

    }

  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    } 

    const result = await updateProduct(updatedProduct);
    if(result.error){
      toast.error(result.error);
    } else{
      toast.success('Product update');
      navigate('/admin/productlist');
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setimage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-2'>
      Go Back
    </Link>

    <FormContainer>
      <h1>Edit Product</h1>
      { loadingUpdate && <Loader/>}

      {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={submitHandler} >
          <Form.Group controlId='name' className='my-2' >
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='price' className='my-2' >
            <Form.Label>Price</Form.Label>
            <Form.Control type='text' placeholder='Enter price' value={price} onChange={(e) => setprice(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='image' className='my-2' >
            <Form.Label>Image</Form.Label>
            <Form.Control type='text' placeholder='Enter image Url' value={image} onChange={(e) => setimage}></Form.Control>
            <Form.Control type='file' label='Choose file' onChange={ uploadFileHandler } ></Form.Control>
          </Form.Group>

          <Form.Group controlId='brand' className='my-2' >
            <Form.Label>Brand</Form.Label>
            <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setbrand(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock' className='my-2' >
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setcountInStock(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='category' className='my-2' >
            <Form.Label>Category</Form.Label>
            <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setcategory(e.target.value)}></Form.Control>
          </Form.Group>


          <Form.Group controlId='description' className='my-2' >
            <Form.Label>description</Form.Label>
            <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setdescription(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-2'>Update</Button>

        </Form>
      ) }
    </FormContainer>


    </>
  )
}

export default ProductEditScreen