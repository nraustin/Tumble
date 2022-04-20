import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../../store/profile'


function ProfileCardSlider() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(profileActions.getUsersThunk())
    }, [dispatch])

    const profilesObj = useSelector(state => state.profile)
    const profiles = Object.values(profilesObj)

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if (slideIndex !== profiles.length){
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === profiles.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(profiles.length)
        }
    }
    
    const move = index => {
        setSlideIndex(index)
    }

    return (
        <>
        <div className="cardSliderContainer">

        </div>
        </>
    )

    // const nextSlide = () => {
    //     if(slideIndex !== )
    // }
}