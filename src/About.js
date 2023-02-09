import React from 'react'
import HeroSection from './components/HeroSection'
import { useProductontext } from './context/ProductContext'
// import {AppContext} from './context/ProductContext'

const About = () => {
  // const myName = useProductontext()
  const data = {
   name:'Start Shopping'
  }
  return (
    <>
    {/* {myName} */}
    <HeroSection myData = {data} />
    </>
  )
}

export default About
