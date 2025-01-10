import React from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({content,style}) => {
  return (
    <button className={`md:p-4 p-2 bg-white text-black text-lg md:text-xl rounded-3xl hover:scale-105 ${style}`} >{content} <FontAwesomeIcon icon={faArrowRight} /></button>
  )
}

export default Button
