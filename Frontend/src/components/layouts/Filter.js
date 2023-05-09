import React, { useState, useEffect } from 'react';

const Filter = ({setCategory,setPrice,selected,setRatings}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  
  const catogries=[ 'Electronics',
  'Cameras',
  'Laptops',
  'Accessories',
  'Headphones',
  'Food',
  "Books",
  'Clothes/Shoes',
  'Beauty/Health',
  'Sports',
  'Outdoor',
  'Home'
]

  useEffect(() => {
   
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setShowToggle(true);
      } else {
        setShowToggle(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);


  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="filter-tab" >
      <div className="filter-header">
        Filter
        {showToggle && (
          <div className="filter-icon" onClick={toggleFilter}>
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
      <div className={`filter-body ${isOpen || !showToggle ? 'show' : ''} `}  id="filterBody">
        <div className="filter-item mt-5">
          <h4 className='mb-3' onClick={()=>setCategory('')} style={{cursor:'pointer', }}>All Categories</h4>
          <ul className='pl-0'>
            {catogries.map(category=>(
              <li 
               style={{cursor:'pointer',
               fontWeight:`${category==selected?'bold':''}`,
               color:`${category==selected?'black':'#777'}`


              }}
              key={category}
              onClick={()=>setCategory(category)}    
              > {category}</li>
             
            ))}
          </ul>
        </div>
        <hr className='my-3' style={{border:'1px solid black'}} />
        <div className="filter-item">
          <h4>Price</h4>
          <ul>
            <li  style={{cursor:'pointer', }} onClick={()=>setPrice([0,50])}>Under $50</li>
            <li  style={{cursor:'pointer', }}  onClick={()=>setPrice([50,100])}>$50-$100</li>
            <li  style={{cursor:'pointer', }}  onClick={()=>setPrice([100,500])}>$100-$500</li>
            <li  style={{cursor:'pointer', }}  onClick={()=>setPrice([500,100000])}>Over $500</li>
          </ul>
        </div>
   
        <hr className='my-3' style={{border:'1px solid black'}} />


        <div className="filter-item">
          <h4 className='mb-3'>Ratings</h4>
          <ul className='pl-0'>
            {[5,4,3,2,1].map(ratings=>(
              <li 
               style={{cursor:'pointer',
              //  fontWeight:`${category==selected?'bold':''}`,
              //  color:`${category==selected?'black':'#777'}`


              }}
              key={ratings}
              onClick={()=>setRatings(ratings)}    
              > 
              
              <div className='rating-outer'>
                <div className='rating-inner'
                  style={{width:`${ratings*20}%`}}
                >

                </div>
              </div>
              
              </li>
             
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filter;
