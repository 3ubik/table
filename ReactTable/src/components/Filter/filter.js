import React from 'react'
import './Filter.css'

const Filter = ({FilterState}) => {
    
    return (
        <select className='filter' defaultValue="" onChange={FilterState}>
            <option value=''>Filter by state</option>
            <option value='WI' className='option'>WI</option>
            <option value='TN' className='option'>TN</option>
            <option value='FL' className='option'>FL</option>
            <option value='NE' className='option'>NE</option>
            
        </select>
    )
}

export default Filter;