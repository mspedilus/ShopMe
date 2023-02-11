import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

//Loading Page
export default function Loading() {
  return (
    <div className='loading'>
        <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" style={{"--fa-animation-duration": "1s"}} size="xl"/>
    </div>
  )
}
