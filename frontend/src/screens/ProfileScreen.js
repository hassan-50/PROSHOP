import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserDetails, updateUserProfile} from '../actions/userAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import bcrypt from 'bcryptjs'
import {Form , Button , Col , Row} from 'react-bootstrap'
const ProfileScreen = ({history}) => {
        const [name , setName] = useState('')
        const [email , setEmail] = useState('')
        const [password , setPassword] = useState('')
        const [confirmPassword , setConfirmPassword] = useState('')
        const [message , setMessage] = useState(null)
        const dispatch = useDispatch()
        const userDetails = useSelector(state => state.userDetails)
        const { loading , error , user} = userDetails
        const userLogin = useSelector(state => state.userLogin)
        const {userInfo} = userLogin   
        const userUpdateProfile = useSelector(state => state.userUpdateProfile)
        const {success} = userUpdateProfile
    useEffect (() => {
            if(!userInfo){
               history.push('/login')}
               else  {
                if (!user.name){
                    dispatch(getUserDetails('profile'))
                }
                else{
                    setName(user.name)
                    setEmail(user.email)
                }
            }
    },[userInfo , history , dispatch , user])
    const submitHandler = (e) => {
            e.preventDefault()
            if(password !== confirmPassword)
            {
                setMessage('Password does not match')
            }else{
                dispatch(updateUserProfile({id: user._id , name , email ,password}))
                dispatch(getUserDetails('profile'))
            }
    }
    return <Row>
        <Col md={3}>
        <h1>User Profile</h1>
            {message && <Message variant='danger'>{message}</Message> } 
            {error && <Message variant='danger'>{error}</Message> } 
            {success && <Message variant='success'>Profile Updated</Message> } 
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId = 'name'>
                <Form.Control className='m-2'
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}>                    
                </Form.Control>
                </Form.Group>
                <Form.Group controlId = 'email'>
                <Form.Control className='m-2'
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}>                    
                </Form.Control>
                </Form.Group>
                <Form.Group>
                <Form.Control 
                type='password'
                className='m-2'
                placeholder='Enter password'
                value={password}
                onChange={e => setPassword(e.target.value)}>                    
                </Form.Control>
                </Form.Group>
                <Form.Group>
                <Form.Control 
                type='password'
                className='m-2'
                placeholder='Enter confirm password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}>                    
                </Form.Control>
                </Form.Group>
                <Button className='m-2' type='submit' variant='primary'>Update</Button>
                </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
}
export default ProfileScreen