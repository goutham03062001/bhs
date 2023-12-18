import React from 'react'
import "../../Styles/styles.css";
import { Link } from 'react-router-dom';
const ClassCard = ({currentClass}) => {
  return (
    <div className='card classCard'>
        <div className="card-header">
            <p className="text-right text-muted">Class - {currentClass}</p>
        </div>

        <div className='card-description p-3'>
            <p>Total Strength - 120</p>
            <p>Girls - 60</p>
            <p>Boys - 60</p>
            <div className='d-flex flex-row-reverse'>
           <Link to={`/class/${currentClass}/section`} style={{textDecoration:"none"}}>
           <button className="btn btn-sm btn-warning d-flex flex-row">
                <span>View Sections &nbsp;</span>
                <span><img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/external-link.png" alt="external-link"/></span>
            </button>
           </Link>
            </div>
        </div>
    </div>
  )
}

export default ClassCard