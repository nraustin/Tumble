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

    const dogProfiles = profiles.filter(profile => profile.dog === true)
    const peopleProfiles = profiles.filter(profile => profile.dog === false)


    const currentDogProf = dogProfiles[profileIndex]
    const currentPeopleProf = peopleProfiles[profileIndex]

    const allProfProps = {
        dog: currentDogProf,
        person: currentPeopleProf
    }


    console.log(currentProf)

    // Only way I could get it functioning on a time crunch. Needs to be refactored

    const nextDogSlide = () => {
        if (slideIndex !== dogProfiles.length){
            setSlideIndex(slideIndex + 1)
            setProfileIndex(profileIndex + 1)
        }
        else if (slideIndex === dogProfiles.length){
            setSlideIndex(1)
            setProfileIndex(0)
        }
    }

    const prevDogSlide = () => {
        if (slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
            setProfileIndex(profileIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dogProfiles.length)
            setProfileIndex(dogProfiles.length - 1)
        }
    }

    const nextPeopleSlide = () => {
        if (slideIndex !== peopleProfiles.length){
            setSlideIndex(slideIndex + 1)
            setProfileIndex(profileIndex + 1)
        }
        else if (slideIndex === peopleProfiles.length){
            setSlideIndex(1)
            setProfileIndex(0)
        }
    }

    const prevPeopleSlide = () => {
        if (slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
            setProfileIndex(profileIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(peopleProfiles.length)
            setProfileIndex(peopleProfiles.length - 1)
        }
    }

    // const noThanks = e => {

    // }

    return (
        
        <div className="cardSliderContainer">
        <div className="cardSlider">
            {user && user.dog === true ?
            <>
            <div key={currentPeopleProf} className={slideIndex === profileIndex + 1 ? "slide active-anim" : "slide"}>
                <ProfileCard {...allProfProps}/>   
            </div>
                    
            <SlideButton moveSlide={nextPeopleSlide} direction={"next"} />
            <SlideButton moveSlide={prevPeopleSlide} direction={"prev"}/> 
            </> 
            :
            <>
            <div key={currentDogProf} className={slideIndex === profileIndex + 1 ? "slide active-anim" : "slide"}>
            <ProfileCard {...allProfProps}/>   
            </div>
                    
            <SlideButton moveSlide={nextDogSlide} direction={"next"} />
            <SlideButton moveSlide={prevDogSlide} direction={"prev"}/>
            </> }
  
          </div>
        </div>
    )

}

export default ProfileCardSlider