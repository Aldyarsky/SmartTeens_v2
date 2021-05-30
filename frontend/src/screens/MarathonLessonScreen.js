import React, { useState, useEffect } from 'react';
import { ReactVideo } from "reactjs-media";
import { listMarathonLessons } from '../actions/marathonActions'
import { useDispatch, useSelector } from 'react-redux'
import { MARATHON_LESSON_LIST_RESET } from '../constants/marathonConstants'
import { Link } from 'react-router-dom'
function MarathonLessonScreen({ match,history }) {

    const dispatch = useDispatch()


    const marathonList = useSelector(state => state.marathonLessonList)
    const { loading, error, marathonLessons } = marathonList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else{
            dispatch(listMarathonLessons(match.params.id))
        }
    }, [dispatch, history])
    return (
        <div>
            {console.log(typeof marathonLessons)}
            {
                (typeof marathonLessons === 'string') ?
                <h1>
                    {marathonLessons}
                </h1> :
                (marathonLessons.length === 0) ? 
                <h1>
                    The lessons have not been uploaded yet...
                </h1> :
                     marathonLessons.map(marathonLesson => 
                         <div >
                             <h3>{marathonLesson.title}</h3>
                             <ReactVideo
                             src={marathonLesson.video}
                             poster="../../static/images/video.poster.png"
                             primaryColor="dark-blue"
                         // other props
                     />
                         </div>
                     )
            }  
        </div>
    )
}

export default MarathonLessonScreen
