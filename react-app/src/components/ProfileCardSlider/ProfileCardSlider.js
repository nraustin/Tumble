import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../../store/profile'
import ProfileCard from "../ProfileCard/ProfileCard";
import SlideButton from "../SlideButton/SlideButton";

import './ProfileCardSlider.css'


function ProfileCardSlider() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(profileActions.getUsersThunk())
    }, [dispatch])

    const profilesObj = useSelector(state => state.profile)
    const profiles = Object.values(profilesObj)

    console.log(profilesObj)

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
    
    // const move = index => {
    //     setSlideIndex(index)
    // }

    // const likeUser = e => {
    //     e.preventDefault()
    //     const newLike = { userId: user.id, profileId: profiles.profile.id}
    //     dispatch(profileActions.createLikeThunk(newLike))

    // }

    const noThanks = e => {

    }

    return (
        <div className="cardSliderContainer">
        <div className="cardSlider">
            {profiles?.map((profile, index) => {
                return (
                    <>
                    <div key={profile.id} className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                        <ProfileCard profile={profile}/> 
                    </div>
                    {/* <div className="likeButtons">
                        <button type='submit' onSubmit={likeUser}>Like</button>
                        <button type='submit' onSubmit={noThanks}>No Thanks</button>
                    </div> */}
                    
                    </>
                )
            })}
            <SlideButton moveSlide={nextSlide} direction={"next"} />
            <SlideButton moveSlide={prevSlide} direction={"prev"}/>

            {/* <div className="container-dots">
                {Array.from({length: 6}).map((item, index) => (
                    <div 
                    onClick={() => move(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div> */}
          </div>
        </div>
    )

}

export default ProfileCardSlider