import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../../store/profile'
import ProfileCard from "../ProfileCard/ProfileCard";
import SlideButton from "../SlideButton/SlideButton";

import './ProfileCardSlider.css'


function ProfileCardSlider() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const [slideIndex, setSlideIndex] = useState(1)
    const [profileIndex, setProfileIndex] = useState(0)

    useEffect(() => {
        dispatch(profileActions.getUsersThunk())
    }, [dispatch])

    const profilesObj = useSelector(state => state.profile)
    const profiles = Object.values(profilesObj)

    const currentProf = profiles[profileIndex]


    console.log(currentProf)

    const nextSlide = () => {
        if (slideIndex !== profiles.length){
            setSlideIndex(slideIndex + 1)
            setProfileIndex(profileIndex + 1)
        }
        else if (slideIndex === profiles.length){
            setSlideIndex(1)
            setProfileIndex(0)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
            setProfileIndex(profileIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(profiles.length)
            setProfileIndex(profiles.length - 1)
        }
    }
    
    // const move = index => {
    //     setSlideIndex(index)
    // }

    // const likeUser = e => {
    //     e.preventDefault()
    //     const newLike = { userId: user.id, profileId: profiles.profile.id}
    //     dispatch(profileActions.createLikeThunk(newLike))

    // }

    // const noThanks = e => {

    // }

    return (
        <div className="cardSliderContainer">
        <div className="cardSlider">
            <div key={currentProf} className={slideIndex === profileIndex + 1 ? "slide active-anim" : "slide"}>
                <ProfileCard profile={currentProf}/>   
            </div>
                    
            <SlideButton moveSlide={nextSlide} direction={"next"} />
            <SlideButton moveSlide={prevSlide} direction={"prev"}/>

            
          </div>
        </div>
    )

}

export default ProfileCardSlider