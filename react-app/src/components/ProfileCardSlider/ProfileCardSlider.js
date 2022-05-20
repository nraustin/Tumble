import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../../store/profile'
// import * as matchActions from '../../store/match'
import * as sessionActions from '../../store/session'
import ProfileCard from "../ProfileCard/ProfileCard";
import SlideButton from "../SlideButton/SlideButton";

import './ProfileCardSlider.css'


function ProfileCardSlider() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const [slideIndex, setSlideIndex] = useState(1)
    const [profileIndex, setProfileIndex] = useState(0)

    useEffect(() => {
        async function getData() {
        await dispatch(profileActions.getUsersThunk())
        await dispatch(sessionActions.getMatchesThunk())
        }
        getData()
    }, [dispatch])

    const profilesObj = useSelector(state => state.profile)
    const profiles = Object.values(profilesObj)

    console.log(profiles)
    


    // const currentProf = profiles[profileIndex]

    const dogProfiles = profiles.filter(profile => profile.dog === true)
    const peopleProfiles = profiles.filter(profile => profile.dog === false)


    const currentDogProf = dogProfiles[profileIndex]
    const currentPeopleProf = peopleProfiles[profileIndex]

    const allProfProps = {
        dog: currentDogProf,
        person: currentPeopleProf,
        slideIndex: slideIndex,
        profileIndex: profileIndex,
        dogProfiles: dogProfiles,
        peopleProfiles: peopleProfiles,
        setSlideIndex,
        setProfileIndex,
    }

    console.log(allProfProps?.profileIndex)
    console.log(peopleProfiles.length)

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
            {allProfProps?.person && allProfProps.peopleProfiles.length > 1 ?
            <>       
                <SlideButton moveSlide={nextPeopleSlide} direction={"next"} />
                <SlideButton moveSlide={prevPeopleSlide} direction={"prev"}/>
            </> : null}
            </> 
            :
            <>
            <div key={currentDogProf} className={slideIndex === profileIndex + 1 ? "slide active-anim" : "slide"}>
            <ProfileCard {...allProfProps}/>   
            </div>
            
            {allProfProps?.dog && dogProfiles?.length > 1 ?
            <>
            <SlideButton moveSlide={nextDogSlide} direction={"next"} />
            <SlideButton moveSlide={prevDogSlide} direction={"prev"}/>
            </> : null}
            </> }
  
          </div>
        </div>
    )

}

export default ProfileCardSlider