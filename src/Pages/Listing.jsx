import React, { useState, useEffect } from 'react';
import { categories } from '../Data';
import Loader from '../Components/Loader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from '../Store/Slice';
import { ArrowForwardIos, ArrowBackIosNew, Favorite } from "@mui/icons-material";
import { setWishList } from '../Store/Slice';
import { Link } from 'react-router-dom';
import { useToast ,Button} from '@chakra-ui/react';

const Listing = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(false);
    const [categoryNotFound, setCategoryNotFound] = useState(false);

    const dispatch = useDispatch();
const toast=useToast()
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const handleCategory = (category) => {
        setSelectedCategory(category);
    };
const user=useSelector((state)=>state.user.user)
console.log("user:-",user)
    const getFeedListings = async () => {
        try {
            const response = await axios.get(selectedCategory === 'All'
                ? 'http://localhost:8000/api/listings'
                : `http://localhost:8000/api/listings/category/${selectedCategory}`);
            const data = response.data;
            const data2 = data.listings.map(listing => ({ ...listing, currentIndex: 0, liked: false })); // Initialize currentIndex and liked for each listing
            console.log("Fetched Listings:", data2);
            dispatch(setListings({ listings: data2 }));

            setCategoryNotFound(data2.length === 0);
        } catch (error) {
            console.error(error);
        }
    };

    const listings = useSelector((state) => state.user.listings);
    console.log("Listings from Redux store:", listings);

    useEffect(() => {
        getFeedListings();
    }, [selectedCategory]);

    const categoryContainerStyle = {
        padding: '50px 60px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '55px',
    };

    const categoryItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
    };
const [liked,setliked]=useState(false)
const Wishlist=useSelector((state)=>state.Wishlist)
    const toggleWishlist = (index) => {
        const updatedListings = [...listings]; // Create a shallow copy of the listings array
        updatedListings[index] = { ...updatedListings[index], liked: !updatedListings[index].liked }; // Update the liked property
        setliked(!liked);
        dispatch(setListings({listings:updatedListings}))
        const likedItems=updatedListings.filter(item=>item.liked)
        console.log("liked items >>>>>>",likedItems)
        dispatch(setWishList({Wishlist:likedItems}))
        // Logging the selected item when liked state is toggled
        console.log("Selected item:", updatedListings[index]);
    };

    const updateListingIndex = (index, newIndex) => {
        const updatedListings = listings.map((listing, i) =>
            i === index ? { ...listing, currentIndex: newIndex } : listing
        );
        dispatch(setListings({ listings: updatedListings }));
    };

    const goToPrevSlide = (index) => {
        const newIndex = (listings[index].currentIndex - 1 + listings[index].listingPhotoPaths.length) % listings[index].listingPhotoPaths.length;
        updateListingIndex(index, newIndex);
    };

    const goToNextSlide = (index) => {
        const newIndex = (listings[index].currentIndex + 1) % listings[index].listingPhotoPaths.length;
        updateListingIndex(index, newIndex);
    };
const patchWishList=async()=>{

}
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <div className="max-w-[1200px] w-full mx-auto">
                <div style={categoryContainerStyle}>
                    {categories.map((item, index) => (
                        <div
                            className={`category1 ${selectedCategory === item.label ? 'text-red-600' : 'text-black'} hover:text-red-600 duration-200 text-black text-[30px] md:text-[30px]`}
                            style={categoryItemStyle}
                            key={index}
                            onClick={() => handleCategory(item.label)}
                        >
                            <div className='category_icons'>
                                {item.icon}
                            </div>
                            <p className='category_label font-bold text-[20px]'>
                                {item.label}
                            </p>
                        </div>
                    ))}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
                        {isLoading ? <Loader /> :
                            listings.map((item, index) => (
                                <div className='relative cursor-pointer p-[10px] hover:border border-solid border-gray-200 rounded-2xl duration-150' key={index}>
                                   
                                    <div className='slide-container mb-[10px] mt-[10px] overflow-hidden'>
                                        <div className='slider flex transition-transform duration-500 ease-in-out ' style={{ transform: `translateX(-${item.currentIndex * 300}px)` }}>
                                            {
                                                item.listingPhotoPaths.map((photoPath, photoIndex) => (
                                                    <div className=' w-[300px] h-[270px] flex-shrink-0' key={photoIndex}>
                                                                                          

                                                        <img src={`http://localhost:8000/${photoPath}`} className='w-full h-full object-cover' alt={`${item.creator}`} />
                                                        {
                                                            !item.liked ? (
                                                                <Favorite className={`absolute top-3 right-3 text-white hover:text-gray-100 duration-100 ${item.liked ? 'text-red-600' : 'text-white'}`} onClick={() => toggleWishlist(index)} />

                                                            ):(
                                                                <Favorite className={`absolute top-3 right-3 text-red-500 hover:text-red-600 duration-100`} onClick={() => toggleWishlist(index)} />

                                                            )
                                                        }
                                                           
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <button onClick={() => goToPrevSlide(index)} className="flex items-center justify-center cursor-pointer absolute top-1/2 left-0 transform -translate-y-1/2 border-none  text-white p-2">
                                            <ArrowBackIosNew />
                                        </button>
                                        <button onClick={() => goToNextSlide(index)} className="flex items-center justify-center cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2 border-none  text-white p-2">
                                            <ArrowForwardIos />
                                        </button>
                                        <div className='flex flex-col '>
                                        <Link to={`/listings/${item._id}`}>
                                            <h1 className='text-[16px] font-semibold'>
                                                {item.title}
                                            </h1>
                                            <h4 className='text-[15px]'>{item.category}</h4>
                                            <h3 className='text-[15px]'>{item.type}</h3>
                                            <div className='flex items-center'>
                                                <h5 className='text-[15px] font-medium'>₹{item.price}</h5>
                                                {item.category === "Iconic cities" ? (
                                                    <span className='inline ml-1'>Per Month</span>
                                                ) : (
                                                    <span className='inline ml-1'>Per Night</span>
                                                )}
                                            </div>
                                            </Link>
                                        </div>
                                     
                                    </div>
                                 
                                </div>
                            ))
                        }
                    </div>
                    {categoryNotFound && <div>No Results found for selected category.</div>}
                </div>
            </div>
        </div>
    );
};

export default Listing;
