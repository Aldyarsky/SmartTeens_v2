import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Marathon({ marathon }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/marathon/${marathon._id}`}>
                
                <div className="image" style={{ width: "100%", height: 150, backgroundImage: `url(${marathon.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

                </div>
            </Link>

            <Card.Body>
                <Link to={`/marathon/${marathon._id}`}>
                    <Card.Title as="div">
                        <strong>{marathon.title}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={marathon.rating} text={`${marathon.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>


                <Card.Text as="h3">
                    ${marathon.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Marathon
