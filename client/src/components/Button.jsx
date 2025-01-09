import React from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({content,style}) => {
  return (
    <button className={`p-4 bg-white text-black text-xl rounded-3xl hover:scale-105 ${style}`} >{content} <FontAwesomeIcon icon={faArrowRight} /></button>
  )
}

export default Button
