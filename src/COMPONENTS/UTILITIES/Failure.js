import React from 'react'
import '../STYLESHEETS/Failure.css'
// 
import { AiFillCloseCircle } from 'react-icons/ai'

export default function Failure() {
  return (
    <div className='failure'>
      <div className='failure-block'>
        <AiFillCloseCircle className='failure-icon' />
      </div>
    </div>
  )
}
