import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {register} from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import bcrypt from 'bcryptjs'
import {Form , Button , Col , Row} from 'react-bootstrap'
const RegisterScreen = ({location,history}) => {
        const [name , setName] = useState('')
        const [email , setEmail] = useState('')
        const [password , setPassword] = useState('')
        const [confirmPassword , setConfirmPassword] = useState('')
        const [message , setMessage] = useState(null)
        const dispatch = useDispatch()
        const userLogin = useSelector(state => state.userLogin)
        const { loading , error , userInfo} = userLogin
        const redirect = location.search ? location.search.split('=')[1]:'/'
    useEffect (() => {
            if(userInfo){
               history.push(redirect)
        }
    },[userInfo , history , redirect])
    const submitHandler = (e) => {
            e.preventDefault()
            if(password !== confirmPassword)
            {
                setMessage('Password does not match')
            }else{
                    dispatch(register(name,email,password))
            }
    }
    return <FormContainer>
            <h1>Sign up</h1>
            {message && <Message variant='danger'>{message}</Message> } 
            {error && <Message variant='danger'>{error}</Message> } 
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
                <Button className='m-2' type='submit' variant='primary'>Sign Up</Button>
                </Form>
                <Row className = 'py-3'>
                        <Col>
                        Have an account ? {' '}
                        <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>Login</Link>
                        </Col>
                </Row>
        </FormContainer>
}
export default RegisterScreen