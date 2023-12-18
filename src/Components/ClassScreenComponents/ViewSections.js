import React from 'react'
import { useParams } from 'react-router-dom';
import LeftSideNavigation from '../NavigationComponent/LeftSideNavigation';
import { Link } from 'react-router-dom';
const SectionsComponent = ({sectionName,className})=>{
    return(<>
        <div className='col-lg-4 my-3'>
                <div className='card'>
                    <div className='card-header'>
                        <p>{sectionName}</p>
                    </div>
                    <div className='card-body'>
                        {/* <p>Total Student - 40</p> */}
                        <p>Class - {className} Student Details</p>
                        
                    </div>
                    <div className='card-footer d-flex justify-content-between align-items-center'>
                        <Link to={`/View/${className}/viewDetails`}>
                        <button className='btn btn-sm btn-outline-primary'>View Students Data</button>
                        </Link>
                    </div>
                </div>
            </div>
    </>)
}

const ViewSections = () => {
    const router = useParams();
  return (
    <div className='mainDiv'>
    <div className="left-side-navigation">
       <LeftSideNavigation activeTab = "Classes"/>
    </div>
    <div className='right-part'>
        <div className="container">
            <h3 className='text text-center'>Class Name - {router.className}</h3>
            <div className='row'>
            <SectionsComponent sectionName = {`View ${router.className}${parseInt(router.className) >3 ? "th" : parseInt(router.className) === 2 ? "nd" : parseInt(router.className)===3 ? "rd" : "st" }`} className={router.className}/>
            
            </div>
        </div>
    </div>
</div>
  )
}

export default ViewSections