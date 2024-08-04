import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { facilities } from '../Data';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { setTripList } from '../Store/Slice';


const ListingsCard = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const dispatch = useDispatch();
    const tripList = useSelector((state) => state.user.TripList);
    // // console.log("triplist is", tripList);
    // const toast = useToast();
const listingId=id
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/listings/${id}`);
            const data = response.data.listing;
            console.log("Fetched data:", data);
            setListing(data);
            // dispatch(setTripList(data));
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log("Updated listing state:", listing);
    }, [listing]);

    // // Date booking calendar
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);
    const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));
    const user = useSelector((state) => state.user.user);
    console.log(user)
    let customerId=0;
    if(!user)
    {
        console.log("user doesnot exists")
    }
    else
    {
      customerId=user._id;  
    }
    console.log(customerId)

const hostId=listing?.creator
const customerEmail=user?.email
  

    const handleSubmit = async () => {
        if(user)
        {
            try {
                const bookingForm = {
                    
                    customerId,
                    listingId,
                    hostId,
                    startDate: dateRange[0].startDate.toDateString(),
                    endDate: dateRange[0].endDate.toDateString(),
                    totalPrice: listing.price * dayCount,
                    customerEmail
                };
                const response = await axios.post("http://localhost:8000/api/booking/create", bookingForm);
                if (response.status === 200) {
                    console.log("Booking successful");
                }
            } catch (error) {
                console.log("Booking error:", error.message);
            }
        }
        else
        {
            alert("you havent login/signup")
        }

    };

    

    return (
      

      
        <div className=''>
            <Navbar />
            <div className='listing-details md:p-12 mt-[20px] pt-[40px] mx-auto'>
                {listing ? (
                    <div>
                        <div className='title flex justify-between items-center sm:flex-col sm:items-start sm:gap-[15px]'>
                            <h1 className='text-[36px] font-semibold'>{listing.title}</h1>
                        </div>
                        <div className="photos flex flex-wrap gap-3 mt-[12px]">
                            {listing.listingPhotoPaths.map((item, index) => (
                                <img key={index} src={`http://localhost:8000/${item}`} className='max-w-[290px]' alt={`Listing Photo ${index + 1}`} />
                            ))}
                        </div>
                        <h2 className='text-[20px] font-semibold mt-4'>
                            {listing.type} in {listing.city}, {listing.province}, {listing.country}
                        </h2>
                        <p className='text-[18px] font-normal mt-4'>
                            {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
                            {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
                        </p>
                        <hr className='mt-4 mb-4' />
                        <div className='profile'>
                            <h3 className='text-[18px] font-medium'>Hosted by {listing.creator}</h3>
                        </div>
                        <hr className='mt-4 mb-4' />
                        <h3 className='text-[18px] font-medium'>Description</h3>
                        <p className='mt-4 max-w-[800px]'>{listing.description}</p>
                        <hr className='mt-4 mb-4' />
                        <h3 className='text-[18px] font-normal'>{listing.highlight}</h3>
                        <p className='mt-4 max-w-[800px]'>{listing.highlightDesc}</p>
                        <hr className='mt-4 mb-4' />
                        <div className='booking md:flex justify-between'>
                            <div>
                                <h2 className='text-[22px] font-medium'>What this place offers?</h2>
                                <div className='amenities grid md:grid-cols-2 max-w-[700px]'>
                                    {listing.amenities[0].split(",").map((item, index) => (
                                        <div className='facility flex items-center gap-5 text-[18px] font-semibold mb-[20px] m-4' key={index}>
                                            <div className='facility-icon text-[30px]'>
                                                {facilities.find((facility) => facility.name === item)?.icon}
                                            </div>
                                            <p>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className='text-[22px] font-medium'>How long do you want to stay?</h2>
                                <div className='date-range-calendar m-4'>
                                    <DateRange ranges={dateRange} onChange={handleSelect} />
                                    {dayCount > 1 ? (
                                        <h2 className='text-[20px] font-normal mb-3'>
                                            ₹{listing.price} X {dayCount} nights
                                        </h2>
                                    ) : (
                                        <h2 className='text-[20px] font-normal mb-3'>
                                            ₹{listing.price} X {dayCount} night
                                        </h2>
                                    )}
                                    <h2 className='text-[20px] font-normal mb-3'>Total price: ₹{listing.price * dayCount}</h2>
                                    <p className='text-[18px] font-normal'>{dateRange[0].startDate.toDateString()}</p>
                                    <p className='text-[18px] font-normal mt-1'>{dateRange[0].endDate.toDateString()}</p>
                                    <button className='button mt-2 p-2 bg-blue-500 text-white hover:bg-blue-600 duration-150 rounded-xl' type='submit' onClick={handleSubmit}>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
   
    );
};

export default ListingsCard;
