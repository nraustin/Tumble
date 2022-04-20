import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../../store/profile'
import ProfileCard from "../ProfileCard/ProfileCard";
import SlideButton from "../SlideButton/SlideButton";

import './ProfileCardSlider.css'


function ProfileCardSlider() {

    const dispatch = useDispatch()

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
    
    const move = index => {
        setSlideIndex(index)
    }

    return (
        <div className="cardSliderContainer">
        <div className="cardSlider">
            {profiles?.map((profile, index) => {
                return (
                    <div key={profile.id} className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                        
                        <ProfileCard profile={profile}/>
                    </div>
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