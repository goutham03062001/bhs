import React from 'react'
import { Link } from 'react-router-dom'
const ClassCard = ({className}) => {
  return (
    <div className="col-lg-4 my-4">
    <div className='card'>
      <div className="card-header">
        <p>Class - {className}</p>
      </div>
      <div className='card-body'>
      <Link to={`/View/${className}/sections`}>
      <button className='btn btn-sm btn-warning'>View All Sections &nbsp; <img src="https://img.icons8.com/ios/50/right.png" alt='right-icon' style={{width:20,height:20}}/></button>

      </Link>
      </div>
    </div>
  </div>
  )
}

export default ClassCard