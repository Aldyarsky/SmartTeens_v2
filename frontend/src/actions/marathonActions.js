import axios from 'axios'
import {
    MARATHON_LIST_REQUEST,
    MARATHON_LIST_SUCCESS,
    MARATHON_LIST_FAIL,

    MARATHON_DETAILS_REQUEST,
    MARATHON_DETAILS_SUCCESS,
    MARATHON_DETAILS_FAIL,

    MARATHON_DELETE_REQUEST,
    MARATHON_DELETE_SUCCESS,
    MARATHON_DELETE_FAIL,

    MARATHON_CREATE_REQUEST,
    MARATHON_CREATE_SUCCESS,
    MARATHON_CREATE_FAIL,

    MARATHON_UPDATE_REQUEST,
    MARATHON_UPDATE_SUCCESS,
    MARATHON_UPDATE_FAIL,

    MARATHON_CREATE_REVIEW_REQUEST,
    MARATHON_CREATE_REVIEW_SUCCESS,
    MARATHON_CREATE_REVIEW_FAIL,


    MARATHON_TOP_REQUEST,
    MARATHON_TOP_SUCCESS,
    MARATHON_TOP_FAIL,

    MARATHON_CATEGORY_REQUEST,
    MARATHON_CATEGORY_SUCCESS,
    MARATHON_CATEGORY_FAIL,

    MARATHON_LESSON_LIST_REQUEST,
    MARATHON_LESSON_LIST_SUCCESS,
    MARATHON_LESSON_LIST_FAIL,
} from '../constants/marathonConstants'


export const listMarathons = (keyword) => async (dispatch) => {
    try {
        dispatch({ type: MARATHON_LIST_REQUEST })
        const { data } = await axios.get(`/api/marathons/${keyword}`)

        dispatch({
            type: MARATHON_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MARATHON_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTopMarathons = () => async (dispatch) => {
    try {
        dispatch({ type: MARATHON_TOP_REQUEST })

        const { data } = await axios.get(`/api/marathons/top/`)

        dispatch({
            type: MARATHON_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MARATHON_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listCategoryMarathons = () => async (dispatch) => {
    try {
        dispatch({ type: MARATHON_CATEGORY_REQUEST })

        const { data } = await axios.get(`/api/marathons/category/marathons`)

        dispatch({
            type: MARATHON_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MARATHON_CATEGORY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listMarathonDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: MARATHON_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/marathons/marathon/${id}`)

        dispatch({
            type: MARATHON_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MARATHON_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteMarathon = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MARATHON_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/marathons/delete/${id}/`,
            config
        )

        dispatch({
            type: MARATHON_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: MARATHON_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createMarathon = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MARATHON_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/marathons/create/`,
            {},
            config
        )
        dispatch({
            type: MARATHON_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: MARATHON_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateMarathon = (marathon) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MARATHON_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/marathons/update/${marathon._id}/`,
            marathon,
            config
        )
        dispatch({
            type: MARATHON_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: MARATHON_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: MARATHON_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createMarathonReview = (marathonId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MARATHON_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/marathons/marathon/${marathonId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: MARATHON_CREATE_REVIEW_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: MARATHON_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listMarathonLessons = (marathonId) => async (dispatch, getState) => {
    try {
        dispatch({ type: MARATHON_LESSON_LIST_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.get(`/api/marathons/lessons/${marathonId}`
        ,config
        )

        dispatch({
            type: MARATHON_LESSON_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MARATHON_LESSON_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
