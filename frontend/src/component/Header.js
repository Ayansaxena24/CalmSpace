import React from 'react'
import jobbg from '../images/jobbg.jpg'
import SearchInputEl from './searchInputEl'
import matrixVideo from '../images/matrixVideo.mp4'
import back2 from '../images/back2.mp4'

const Header = () => {
  return (
    <div className='relative overflow-clip h-96'>
        {/* <img src = {jobbg} className='min-h-400 h-96 flex justify-center bg-gradient-to-r from-theme-secondary-main to-white'></img> */}
        <video autoplay="true" muted loop src={back2} className=" z-10 w-full absolute "/>
        <SearchInputEl/>
    </div>
  )
}

export default Header