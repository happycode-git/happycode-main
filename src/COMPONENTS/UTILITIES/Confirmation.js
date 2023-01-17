import React from 'react'
import '../STYLESHEETS/Confirmation.css'
// 
import { BsFillCheckCircleFill } from 'react-icons/bs'

export default function Confirmation() {
  return (
    <div className='confirmation'>
      <div className='confirmation-block'>
        <BsFillCheckCircleFill className='confirmation-icon' />
      </div>
    </div>
  )
}
