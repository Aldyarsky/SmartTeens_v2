import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopMarathons } from '../actions/marathonActions'

function MarathonCarousel() {
    const dispatch = useDispatch()

    const marathonTopRated = useSelector(state => state.marathonTopRated)
    const { error, loading, marathons } = marathonTopRated

    useEffect(() => {
        dispatch(listTopMarathons())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {marathons.map(marathon => (
                        <Carousel.Item key={marathon._id}>
                            <Link to={`/marathon/${marathon._id}`}>
                                <Image src={marathon.image} alt={marathon.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{marathon.name} (${marathon.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default MarathonCarousel
