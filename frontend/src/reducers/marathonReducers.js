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
    MARATHON_CREATE_RESET,

    MARATHON_UPDATE_REQUEST,
    MARATHON_UPDATE_SUCCESS,
    MARATHON_UPDATE_FAIL,
    MARATHON_UPDATE_RESET,

    MARATHON_CREATE_REVIEW_REQUEST,
    MARATHON_CREATE_REVIEW_SUCCESS,
    MARATHON_CREATE_REVIEW_FAIL,
    MARATHON_CREATE_REVIEW_RESET,

    MARATHON_TOP_REQUEST,
    MARATHON_TOP_SUCCESS,
    MARATHON_TOP_FAIL,

    MARATHON_CATEGORY_REQUEST,
    MARATHON_CATEGORY_SUCCESS,
    MARATHON_CATEGORY_FAIL,

    MARATHON_LESSON_LIST_REQUEST,
    MARATHON_LESSON_LIST_SUCCESS,
    MARATHON_LESSON_LIST_FAIL,

    MARATHON_LESSON_UPDATE_REQUEST,
    MARATHON_LESSON_UPDATE_SUCCESS,
    MARATHON_LESSON_UPDATE_FAIL,
} from '../constants/marathonConstants'


export const marathonListReducer = (state = { marathons: [] }, action) => {
    switch (action.type) {
        case MARATHON_LIST_REQUEST:
            return { loading: true, marathons: [] }

        case MARATHON_LIST_SUCCESS:
            return {
                loading: false,
                marathons: action.payload.marathons,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case MARATHON_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const marathonDetailsReducer = (state = { marathon: { reviews: [] } }, action) => {
    switch (action.type) {
        case MARATHON_DETAILS_REQUEST:
            return { loading: true, ...state }

        case MARATHON_DETAILS_SUCCESS:
            return { loading: false, marathon: action.payload }

        case MARATHON_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const marathonDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MARATHON_DELETE_REQUEST:
            return { loading: true }

        case MARATHON_DELETE_SUCCESS:
            return { loading: false, success: true }

        case MARATHON_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const marathonCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MARATHON_CREATE_REQUEST:
            return { loading: true }

        case MARATHON_CREATE_SUCCESS:
            return { loading: false, success: true, marathon: action.payload }

        case MARATHON_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case MARATHON_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const marathonUpdateReducer = (state = { marathon: {} }, action) => {
    switch (action.type) {
        case MARATHON_UPDATE_REQUEST:
            return { loading: true }

        case MARATHON_UPDATE_SUCCESS:
            return { loading: false, success: true, marathon: action.payload }

        case MARATHON_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case MARATHON_UPDATE_RESET:
            return { marathon: {} }

        default:
            return state
    }
}



export const marathonReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MARATHON_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case MARATHON_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case MARATHON_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case MARATHON_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}

export const marathonLessonListReducer = (state = { marathonLessons: []}, action) => {
    switch(action.type){
        case MARATHON_LESSON_LIST_REQUEST:
            return { loading: true, ...state}
        
        case MARATHON_LESSON_LIST_SUCCESS:
            return {loading: false, marathonLessons: action.payload}

        case MARATHON_LESSON_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}



export const marathonLessonUpdateReducer = (state = { marathonLesson: {}}, action) => {
    switch(action.type){
        case MARATHON_LESSON_UPDATE_REQUEST:
            return { loading: true, marathonLesson: [] }
        
        case MARATHON_LESSON_UPDATE_SUCCESS:
            return {loading: false, marathonLesson: action.payload}

        case MARATHON_LESSON_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const marathonTopRatedReducer = (state = { marathons: [] }, action) => {
    switch (action.type) {
        case MARATHON_TOP_REQUEST:
            return { loading: true, marathons: [] }

        case MARATHON_TOP_SUCCESS:
            return { loading: false, marathons: action.payload, }

        case MARATHON_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const marathonCategoryReducer = (state = { marathon_set: []}, action) => {
    switch (action.type) {
        case MARATHON_CATEGORY_REQUEST:
            return { loading: true, ...state }

        case MARATHON_CATEGORY_SUCCESS:
            return { loading: false, marathon_set: action.payload, }

        case MARATHON_CATEGORY_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
