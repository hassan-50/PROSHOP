import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {login} from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Form , Button , Col , Row} from 'react-bootstrap'
const LoginScreen = ({location,history}) => {
        const [email , setEmail] = useState('')
        const [password , setPassword] = useState('')
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
        dispatch(login(email,password))
    }
    return <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message> } 
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
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
                placeholder='Enter password'
                value={password}
                onChange={e => setPassword(e.target.value)}>                    
                </Form.Control>
                </Form.Group>
                <Button className='m-2' type='submit' variant='primary'>Sign In</Button>
                </Form>
                <Row className = 'py-3'>
                        <Col>
                        New Customer ? {' '}
                        <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>Register</Link>
                        </Col>
                </Row>
        </FormContainer>
}
export default LoginScreen