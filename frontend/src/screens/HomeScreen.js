import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Marathon from '../components/Marathon'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import MarathonCarousel from '../components/MarathonCarousel'
import { listMarathons } from '../actions/marathonActions'


function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const marathonList = useSelector(state => state.marathonList)
    const { error, loading, marathons, page, pages } = marathonList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listMarathons(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            {!keyword && <MarathonCarousel />}

            <h1>Latest Marathons</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {marathons.map(marathon => (
                                <Col key={marathon._id} sm={12} md={6} lg={4} xl={3}>
                                    <Marathon marathon={marathon} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
        </div>
    )
}

export default HomeScreen
