import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdCall } from "react-icons/io";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <div className='bg-gray-200	'>

    
    <div className='footer grid grid-cols-3 gap-[40px] pt-2 '>
        <div className='footer_left flex justify-center max-w-[400px] '>
            <Link to='/'><img src='/assets/logo.png' alt='logo' className='max-w-[150px] mb-6'/>
            </Link>
            
        </div>
        <div className='footer_center flex flex-col items-start'>
        <h3 className='text-[20px] font-semibold mb-3'>Useful Links</h3>
        <ul className='text-[16px] font-normal text-gray-600 '>
          <li className='hover:text-red-500 duration-200 cursor-pointer'>About Us</li>
          <li className='hover:text-red-500 duration-200 cursor-pointer'>Terms and Conditions</li>
          <li className='hover:text-red-500 duration-200 cursor-pointer'>Return and Refund Policy</li>
        </ul>

        </div>
        <div className='footer_right flex flex-col items-start'>
        <h2 className='text-[20px] font-semibold mb-3'>Contact</h2>
            <div className='flex items-center mb-2 text-[16px]'>
          
            <IoMdCall/>
            <p className='ml-[10px]'>9016074728</p>
            </div>
         <div className='flex items-center mb-2 text-[16px]'>
 
         <CiMail/>
            <p className='ml-[10px]'>dreamnest@support.com</p>
         </div>
          <img src='/assets/payment.png' className='pb-[10px]'/>

            
        </div>

    </div>
    </div>
  )
}

export default Footer