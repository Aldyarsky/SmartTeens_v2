import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image, Row, Col } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listCategoryMarathons } from '../actions/marathonActions'

function MarathonCarousel() {
    const dispatch = useDispatch()

    const marathonCategory = useSelector(state => state.marathonCategory)
    const { error, loading, marathon_set } = marathonCategory

    useEffect(() => {
        dispatch(listCategoryMarathons())
    }, [dispatch])
    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <div>
                        {marathon_set.map(item =>
                        <div>
                        <h2>{item.label}</h2>
                        <Carousel pause='hover' style={{backgroundColor:"#191919"}}>
                         {item.marathons.map(marathon => 
                            <Carousel.Item key={marathon._id}>
                            <Link to={`/marathon/${marathon._id}`}>
                                <Row>
                                    <Col md={4} sm={12} style={{ 
                                    height:300, 
                                    margin: 40,  
                                    borderRadius: "5em",
                                    backgroundImage:`url(${marathon.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    }}></Col>
                                    <Col style={{display:"flex", alignItems: "center"}}>
                                       <p style={{color:"#fff", textDecoration: "none", textAlign: "justify", maxWidth: "90%", margin:"Auto"}}>{marathon.description}</p> 
                                    </Col>
                                </Row>
                                <Carousel.Caption className='carousel.caption' style={{marginBottom:20}}>
                                    <h4>{marathon.title} (${marathon.price})</h4>
                                </Carousel.Caption>
                            </Link>
                            </Carousel.Item>)}
                        </Carousel></div>)}
                    
                </div>
            )

    )
}

export default MarathonCarousel
