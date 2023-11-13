import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/userApiSlice';
import Loader from '../../components/Loader';
import '../../assets/CSS/ProductEditScreen.css'


const UserEditScreen = () => {

  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setemail] = useState('')
  const [isAdmin, setisAdmin] = useState(false)


  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(()=> {
    if(user){
      setName(user.name)
      setemail(user.email);
      setisAdmin(user.isAdmin);
    }

  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ data: { userId, name, email, isAdmin } });

      toast.success('User updated Successfully')
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }


  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-2'>
      Go Back
    </Link>

    <FormContainer>
      <h1>Edit User</h1>
      { loadingUpdate && <Loader/>}

      {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={submitHandler} >
          <Form.Group controlId='name' className='my-2' >
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='my-2' >
            <Form.Label>Email</Form.Label>
            <Form.Control type='text' placeholder='Enter email' value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='isAdmin' className='my-2'>
            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setisAdmin(e.target.checked)} >

            </Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-2'>Update</Button>

        </Form>
      ) }
    </FormContainer>


    </>
  )
}

export default UserEditScreen