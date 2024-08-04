import React from 'react'
import { categories } from '../Data'
import { Link } from 'react-router-dom'
const Categories = () => {
  return (
    <div className='Categories py-[50px] px-[60px]  bg-gray-100'>
        <div className='flex flex-col items-center text-center '>
 <h1 className='text-[50px] text-blue-950 font-extrabold mb-4'>Explore Top Categories</h1>
        <p className='max-w-[700px] text-[20px]'>
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
        </p>
        </div>
       <div className='categories_list flex flex-wrap py-[50px] justify-center gap-5'>
{
    categories.slice(1,7).map((category,index)=>(
        <Link to={`/properties/categories/${category.label}`}>
            <div className='category relative flex items-center justify-center w-[250px] h-[200px] cursor-pointer' key={index}>
                <img src={category.img} alt={category.label} className='h-full w-full  absolute'/>
                <div className='overlay absolute inset-0 bg-black bg-opacity-30 transition-all duration-300 hover:scale-75 group'></div>
                <div className='category_text relative flex flex-col items-center justify-center text-center'>
                    <div className='category_icon text-center text-[45px] text-white items-center justify-center'>{category.icon}</div>
                    <p className='font-semibold text-white'>{category.label}</p>
                </div>

            </div>
        </Link>
    ))
}

       </div>
      
    </div>
  )
}

export default Categories