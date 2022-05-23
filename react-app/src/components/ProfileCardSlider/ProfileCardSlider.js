import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../../store/profile'
// import * as matchActions from '../../store/match'
import * as sessionActions from '../../store/session'
import ProfileCard from "../ProfileCard/ProfileCard";
import SlideButton from "../SlideButton/SlideButton";

import './ProfileCardSlider.css'

import likeHeart from './tumbleLikeHeart.png'


function ProfileCardSlider() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    const [slideIndex, setSlideIndex] = useState(1)
    const [profileIndex, setProfileIndex] = useState(0)
    const [active, setActive] = useState(false)
    const [liked, setLiked] = useState(false)

    

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

    // Only way I could get it functioning on a time crunch. Needs to be refactored

    const toggle = () => {
        setActive(!active)
    }

    const untoggle = () => {
        setActive(active)
    }

    const animationSwitch = () => {
        toggle()
    
        setTimeout(() => {
          untoggle()
        }, 50)
      }


    const likeToggle = () => {
        setLiked(!liked)
    }

    const likeUntoggle = () => {
        setLiked(liked)
    }

    const likeMessageSwitch = () => {
        likeToggle()

        setTimeout(() => {
            likeUntoggle()
        }, 500)
    }

    const nextDogSlide = () => {
        animationSwitch()
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
        animationSwitch()
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
        animationSwitch()
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
        animationSwitch()
        if (slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
            setProfileIndex(profileIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(peopleProfiles.length)
            setProfileIndex(peopleProfiles.length - 1)
        }
    }

   console.log(slideIndex)
   console.log(profileIndex)

    
    
    
   

    return (

        
        
        <div className="cardSliderContainer">
             
           
        <div className="cardSlider">
            
            {user && user.dog === true ?
            <>
            {liked ? <img id="likedMessage" src={likeHeart} alt=''/> : null}
            <div key={currentPeopleProf} className={!active ? "slide active-anim" : "slide"} >
            <ProfileCard {...allProfProps} likeMessage={likeMessageSwitch} nextPerson={nextPeopleSlide} movePrev={prevPeopleSlide}/>   
            </div> 
            
            {allProfProps?.person && allProfProps.peopleProfiles.length > 1 ?
            <>       
                <SlideButton moveSlide={nextPeopleSlide} direction={"next"} toggle={toggle} retoggle={untoggle} />
                <SlideButton moveSlide={prevPeopleSlide} direction={"prev"} toggle={toggle} retoggle={untoggle}/>
            </> : null}
            </>
            
            :
            <>
            {liked ? <img id="likedMessage" src={likeHeart} alt=''/> : null}
            <div key={currentDogProf} className={!active ? "slide active-anim" : "slide"}>
            <ProfileCard {...allProfProps} likeMessage={likeMessageSwitch} nextDog={nextDogSlide}/>   
            </div>
            
            {allProfProps?.dog && dogProfiles?.length > 1 ?
            <>
            <SlideButton moveSlide={nextDogSlide} direction={"next"} toggle={toggle} retoggle={untoggle}/>
            <SlideButton moveSlide={prevDogSlide} direction={"prev"} toggle={toggle} retoggle={untoggle}/>
            </> : null}
            </> }
  
          </div>
        </div>
    )

}

export default ProfileCardSlider