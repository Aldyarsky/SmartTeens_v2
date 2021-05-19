import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listMarathons, deleteMarathon, createMarathon } from '../actions/marathonActions'
import { MARATHON_CREATE_RESET } from '../constants/marathonConstants'

function MarathonListScreen({ history, match }) {

    
    const dispatch = useDispatch()


    const marathonList = useSelector(state => state.marathonList)
    const { loading, error, marathons, pages, page } = marathonList

    const marathonDelete = useSelector(state => state.marathonDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = marathonDelete

    const marathonCreate = useSelector(state => state.marathonCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, marathon: createdMarathon } = marathonCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: MARATHON_CREATE_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/marathon/${createdMarathon._id}/edit`)
        } else {
            dispatch(listMarathons(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdMarathon, keyword])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this marathon?')) {
            dispatch(deleteMarathon(id))
        }
    }

    const createMarathonHandler = () => {
        dispatch(createMarathon())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Marathons</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createMarathonHandler}>
                        <i className='fas fa-plus'></i> Create Marathon
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>TITLE</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {marathons.map(marathon => (
                                        <tr key={marathon._id}>
                                            <td>{marathon._id}</td>
                                            <td>{marathon.title}</td>
                                            <td>${marathon.price}</td>
                                            <td>{marathon.category}</td>
                                            <td>{marathon.owner}</td>

                                            <td>
                                                <LinkContainer to={`/admin/marathon/${marathon._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(marathon._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    )}
        </div>
    )
}

export default MarathonListScreen