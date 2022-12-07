import React from 'react';
import './ItemList.css'

const ItemList = ({ link, title, description }) => {
  return (
    <div className='item-list'>
        <a href={link} target='blank'><strong>{title}</strong></a>
        <p>{description}</p>
        <hr />
    </div>
  )
}

export default ItemList