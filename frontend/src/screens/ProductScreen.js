import React from 'react'
import products from '../products'
import {Link}  from 'react-router-dom'
import {Row , Col,Image ,ListGroup , Button} from 'react-bootstrap'
import Rating from '../components/Rating'
const ProductScreen = ({match}) => {
  const product = products.find((p) => p._id === match.params.id)
    return (
        <>
        <Link className='btn btn-light my-3' to='/'>
          Go Back
        </Link>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt = {product.name}/>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>
                  <h5>Price: ${product.price}</h5>  
              </ListGroup.Item>
              <ListGroup.Item>
                  Description: {product.description}  
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
          <ListGroup >
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col><strong>${product.price}</strong></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>              
              <Button className='btn-block' type='button' disabled={product.countInStock === 0} >Add To Cart</Button>
            </ListGroup.Item>
          </ListGroup>
          </Col>
        </Row>
        </>
    )
}

export default ProductScreen
