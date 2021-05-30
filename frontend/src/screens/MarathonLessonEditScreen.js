import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listMarathonDetails, updateMarathon } from '../actions/marathonActions'
import { MARATHON_UPDATE_RESET } from '../constants/marathonConstants'


function MarathonEditScreen({ match, history }) {

    const marathonId = match.params.id

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const marathonDetails = useSelector(state => state.marathonDetails)
    const { error, loading, marathon } = marathonDetails

    const marathonUpdate = useSelector(state => state.marathonUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = marathonUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: MARATHON_UPDATE_RESET })
            history.push('/admin/marathonlist')
        } else {
            if (!marathon.title || marathon._id !== Number(marathonId)) {
                dispatch(listMarathonDetails(marathonId))
            } else {
                setTitle(marathon.title)
                setPrice(marathon.price)
                setImage(marathon.image)
                setBrand(marathon.brand)
                setCategory(marathon.category)
                setCountInStock(marathon.countInStock)
                setDescription(marathon.description)

            }
        }



    }, [dispatch, marathon, marathonId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateMarathon({
            _id: marathonId,
            title,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('marathon_id', marathonId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/marathons/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <FormContainer>
                <h1>Upload Lesson</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control

                                    type='title'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default MarathonEditScreen