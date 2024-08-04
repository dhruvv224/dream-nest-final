import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const [search, setSearch] = useState('');
    const[userExists,setUserExists]=useState(false)
    const {user} = useSelector((state) => state.user);
    console.log(user)
    // useEffect(()=>
    // {
    //     if(User===undefined)
    //         {
    //             setUserExists(false)

    //         }
    //     else{
    //         setUserExists(true)
    //     }
    //     console.log(userExists)
    // },[setUserExists])
   

    // useEffect(() => {
    //     console.log('User state:', user1);
    // }, [user1]);

    const alert2 = () => {
        alert(search);
    };

    return (
        <div className='mx-auto'>
            <div className='navbar flex md:py-[10px] md:px-[60px] justify-between items-center relative shadow-2xl'>
                <Link to='/'>
                    <img src='/assets/logo.png' alt='Trip-go' className='w-[100px] h-full cursor-pointer' />
                </Link>
                <div className='navbar_search border border-gray-400 rounded-[30px] h-[50px] flex items-center md:w-1/4 gap-10 p-4 hover:shadow-xl duration-100'>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='outline-none w-full border-none'
                    />
                    <CiSearch className='h-[70px] w-[30px] cursor-pointer' onClick={alert2} />
                </div>
                <div className='navbar_right flex items-center gap-5'>
                   { user ?(
                       <Link to='/create-listings' className='ml-2'>
                        Become A Host
                        </Link>
                   ):(
                    <Link to='/login' className='ml-2'>
                    Become A Host
                   </Link>
                   )
                   }
                    <button
                        className='navbar_right_button md:h-[50px] flex items-center p-3 md:p-4 m-1 border border-gray-500 rounded-[30px] gap-2 bg-white cursor-pointer hover:shadow-lg'
                        onClick={() => setDropdownMenu(!dropdownMenu)}
                    >
                        <CiMenuFries className='mr-2' />
                        {
                            !user ? (
                                <IoPerson />

                            ):(
                                <img src={`http://localhost:8000/${user.profileImagePath}`} alt="hello" className='rounded-[50%] object-cover md:h-[40px] md:w-[50px] h-[25px] w-[35px]' />
                            )

                        }
                    </button>
                    {dropdownMenu && (
                        <div className='navbar_right_accountmenu absolute bg-white md:right-[60px] right-[10px] md:top-20 top-[50px] flex flex-col w-[100px] md:w-[150px] pt-2 border-gray-300 rounded-2xl items-center shadow-lg p-2 z-auto text-center'>
                            {
                                !user ?(
                                    <>
                                    <Link to="/login" className='text-[18px] rounded-2xl font-semibold w-full hover:bg-slate-100 hover:text-blue-500'>
                                Log In
                            </Link>
                            <Link to="/register" className='text-[18px] rounded-2xl font-semibold w-full hover:bg-slate-100 hover:text-blue-500'>
                                Sign Up
                            </Link>
                            <Link to="/wishlist" className='text-[18px] rounded-2xl font-semibold w-full hover:bg-slate-100 hover:text-blue-500'>
                                Wish List
                            </Link>
                                    </>
                                ) :(
                                    <>
                                    <Link to="/profile" className='text-[18px] rounded-2xl font-semibold w-full hover:bg-slate-100 hover:text-blue-500'>
                                Profile
                            </Link>
                            <Link to="/logout" className='text-[18px] rounded-2xl font-semibold w-full hover:bg-slate-100 hover:text-blue-500'>
                                Trip List
                            </Link>
                            <Link to="/logout" className='text-[18px] rounded-2xl font-semibold w-full hover:bg-slate-100 hover:text-blue-500'>
                                    Property List
                            </Link>  <Link to="/logout" className='text-[18px] rounded-2xl font-semibold w-full hover:bg-slate-100 hover:text-blue-500'>
                                Reservation List
                            </Link>  <Link to="/logout" className='text-[18px] rounded-2xl font-semibold w-full hover:bg-slate-100 hover:text-blue-500'>
                                Become A host
                            </Link>
                            <Link to="/logout" className='text-[18px] rounded-2xl font-semibold w-full hover:bg-slate-100 hover:text-blue-500'>
                                Log Out
                            </Link>

                                    </>
                                )
                            }
                            
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
