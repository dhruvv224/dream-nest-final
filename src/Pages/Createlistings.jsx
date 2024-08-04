import React, { useState } from 'react';
import { categories, types, facilities } from '../Data';
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import Navbar from '../Components/Navbar';
import { BiTrash } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Listing from './Listing';
import axios from 'axios'
const Createlistings = () => {
    // Categories
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');

    // Form locations
    const [formLocation, setFormLocation] = useState({
        streetAddress: '',
        aptSuite: '',
        city: '',
        province: '',
        country: ''
    });


    // Handle locations logic
    const handleChangeLocation = (e) => {
        const { name, value } = e.target;
        setFormLocation({
            ...formLocation,
            [name]: value,
        });
    };

    // Basic counts
    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    // Amenities
    const [amenities, setAmenities] = useState([]);
    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) =>
                prevAmenities.filter((option) => option !== facility)
            );
        } else {
            setAmenities((prev) => [...prev, facility]);
        }
    };

    // Handle drag photos, upload drag and drop, remove photos
    const [photos, setPhotos] = useState([]);

    const handleUploadPhotos = (e) => {
      const newPhotos = e.target.files;
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      
    };
  console.log(photos)
    const handleDragPhoto = (result) => {
      if (!result.destination) return;
  
      const items = Array.from(photos);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      setPhotos(items);
    };
  
    const handleRemovePhoto = (indexToRemove) => {
      setPhotos((prevPhotos) =>
        prevPhotos.filter((_, index) => index !== indexToRemove)
      );
    };
// ADD DESCRIPTIONS
 const [formDescription,setFormDescription]=useState({
    title:'',
    description:'',
    highlight:'',
    highlightDesc:'',
    price:''
 })
 const handleChangeDescription=(e)=>{
    const {name,value}=e.target
    setFormDescription({
        ...formDescription,
        [name]:value,
    })

 }
//   creator id
const creatorId=useSelector((state)=>state.user.user.firstName)
console.log("creator id is",creatorId)
    const handlePost = async(e) => {
         
        e.preventDefault();  
try {
    const listingForm=new FormData()
    listingForm.append("creator",creatorId)
    listingForm.append("category",category)
    listingForm.append("type",type);
    listingForm.append("streetAddress",formLocation.streetAddress)
    listingForm.append("aptSuite",formLocation.aptSuite)
    listingForm.append("city",formLocation.city)
    listingForm.append("province",formLocation.province)
    listingForm.append("country",formLocation.country)
    listingForm.append("guestCount",guestCount)
    listingForm.append("bedroomCount",bedroomCount)
    listingForm.append("bedCount",bedCount);
    listingForm.append("bathroomCount",bathroomCount);
    listingForm.append("amenities",amenities);
    listingForm.append("title",formDescription.title)
    listingForm.append("description",formDescription.description)
    listingForm.append("highlight",formDescription.highlight)
    listingForm.append("highlightDesc",formDescription.highlightDeec);
    listingForm.append("price",formDescription.price)
// append each seleceted photos to the form data
photos.forEach((photo)=>{
  listingForm.append("listingPhotos",photo)
})
    const response=await axios.post("http://localhost:8000/api/listings/createlistings",listingForm)
    console.log(response)
    console.log(listingForm)
} catch (error) {
    console.log("there is an error",error.message)
    
    
}
    };

    return (
        <div>
            <Navbar />
            <div className='creat-elisting bg-gray-100 pt-10 px-16 pb-32'>
                <h1 className='text-[28px] text-blue-800 font-bold'>Publish Your Place</h1>
                <form onSubmit={handlePost}>
                    <div className='create-listings_step1 bg-white pt-[30px] pr-[40px] p-6 rounded-[20px] mt-[40px]'>
                        <h2 className='text-[24px] text-red-500 font-bold'>Step 1: Tell us about your place</h2>
                        <hr />
                        <h3 className='mt-[40px] text-[20px] font-medium mb-5 text-blue-500'>Which of these categories best describes your place?</h3>
                        <div className='category-list flex justify-center items-center flex-wrap gap-5'>
                            {
                                categories.map((item, index) => (
                                    <div
                                        className={`category flex flex-col justify-center items-center w-[111px] h-[90px] border border-solid border-gray-300 cursor-pointer hover:bg-gray-200 duration-150 ${category === item.label ? 'text-red-500 bg-gray-100 border-red-500 group:' : ''}  group`}
                                        key={index}
                                        onClick={() => setCategory(item.label)}
                                    >
                                        <div className={`category_icon text-[30px] text-black group-hover:text-red-500 duration-150 ${category === item.label ? 'text-red-500' : ''}`}>
                                            {item.icon}
                                        </div>
                                        <p className={`text-black text-center font-bold group-hover:text-red-500 duration-150 ${category === item.label ? 'text-red-500' : ''}`}>
                                            {item.label}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                        <h3 className='mt-[40px] text-[20px] font-medium mb-5 text-blue-500'>What type of place will guests have?</h3>
                        <div className='type-list flex flex-col gap-5'>
                            {
                                types.map((item, index) => (
                                    <div key={index} className={`type flex justify-between items-center max-w-[600px] px-2 py-2 border border-gray-100 rounded-[10px] cursor-pointer ${type === item.name ? 'text-red-500 border-red-500 bg-gray-100' : ''} hover:bg-gray-00 hover:text-red-500 duration-150 group`} onClick={() => setType(item.name)}>
                                        <div className={`type_text max-w-[400px]`}>
                                            <h4 className='mb-[5px]'>{item.name}</h4>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className={`type_icon text-[30px] hover:text-red-500 duration-150 ${type === item.name ? 'text-red-500' : ''}`}>{item.icon}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <h3 className='mt-[40px] text-[20px] font-medium mb-5 text-blue-500'>
  Tell guests what your place has to offer
</h3>
<div className='amenities flex flex-wrap md:justify-start justify-center gap-[20px]'>
  {
    facilities?.map((item, index) => (
      <div
        className={`facility flex flex-col items-center justify-center w-[200px] h-[90px] border-[1px] rounded-xl cursor-pointer duration-150 
        ${amenities.includes(item.name) ? 'border-red-500 text-red-500' : 'border-gray-200 hover:text-red-500 hover:border-red-500'}`}
        key={index}
        onClick={() => handleSelectAmenities(item.name)}>
        <div className='facility_icon text-[30px]'>{item.icon}</div>
        <p className='font-semibold'>{item.name}</p>
      </div>
    ))
  }
</div>

                        <h3 className='mt-[40px] text-[20px] font-medium mb-5 text-blue-500'>Where's your place located?</h3>
                        <div className="full max-w-[700px] mb-6">
                            <div className="location mb-4">
                                <p className='font-bold mb-2'>Street Address</p>
                                <input
                                    type='text'
                                    placeholder='Street Address'
                                    name='streetAddress'
                                    className='border-[1px] border-solid border-gray-300 rounded-[10px] text-[16px] w-full p-2 focus:outline-none focus:border-red-500'
                                    value={formLocation.streetAddress}
                                    onChange={handleChangeLocation}
                                    required
                                />
                            </div>
                        </div>
                        <div className='half grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6'>
                            <div className='location mb-4'>
                                <p className='font-bold mb-2'>Apartment, Suite, etc. (if applicable)</p>
                                <input
                                    type="text"
                                    placeholder="Apt, Suite, etc. (if applicable)"
                                    name="aptSuite"
                                    value={formLocation.aptSuite}
                                    onChange={handleChangeLocation}
                                    className='border-[1px] border-solid border-gray-300 rounded-[10px] text-[16px] w-full p-2 focus:outline-none focus:border-red-500'
                                />
                            </div>
                            <div className='location mb-4'>
                                <p className='font-bold mb-2'>City</p>
                                <input
                                    type="text"
                                    placeholder="City"
                                    name="city"
                                    value={formLocation.city}
                                    onChange={handleChangeLocation}
                                    required
                                    className='border-[1px] border-solid border-gray-300 rounded-[10px] text-[16px] w-full p-2 focus:outline-none focus:border-red-500'
                                />
                            </div>
                        </div>
                        <div className='half grid grid-cols-1 sm:grid-cols-2 gap-5'>
                            <div className="location mb-4">
                                <p className='font-bold mb-2'>Province</p>
                                <input
                                    type="text"
                                    placeholder="Province"
                                    name="province"
                                    value={formLocation.province}
                                    onChange={handleChangeLocation}
                                    required
                                    className='border-[1px] border-solid border-gray-300 rounded-[10px] text-[16px] w-full p-2 focus:outline-none focus:border-red-500'
                                />
                            </div>
                            <div className="location mb-4">
                                <p className='font-bold mb-2'>Country</p>
                                <input
                                    type="text"
                                    placeholder="Country"
                                    name="country"
                                    value={formLocation.country}
                                    onChange={handleChangeLocation}
                                    required
                                    className='border-[1px] border-solid border-gray-300 rounded-[10px] text-[16px] w-full p-2 focus:outline-none focus:border-red-500'
                                />
                            </div>
                        </div>
                        <h3 className="mt-[40px] text-[20px] font-medium mb-5 text-blue-500">Share some basics about your place</h3>
        <div className="basics grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className='basic flex flex-col items-center gap-4 p-6 border border-solid border-gray-300 rounded-lg bg-white shadow-md'>
                <p className='font-bold text-lg'>Guests</p>
                <div className="basic_count flex items-center gap-3 text-lg">
                    <RemoveCircleOutline
                        onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}
                        className='text-2xl cursor-pointer hover:text-red-500 transition duration-150'
                    />
                    <p>{guestCount}</p>
                    <AddCircleOutline
                        onClick={() => setGuestCount(guestCount + 1)}
                        className='text-2xl cursor-pointer hover:text-red-500 transition duration-150'
                    />
                </div>
            </div>
            <div className='basic flex flex-col items-center gap-4 p-6 border border-solid border-gray-300 rounded-lg bg-white shadow-md'>
                <p className='font-bold text-lg'>Bedrooms</p>
                <div className="basic_count flex items-center gap-3 text-lg">
                    <RemoveCircleOutline
                        onClick={() => bedroomCount > 1 && setBedroomCount(bedroomCount - 1)}
                        className='text-2xl cursor-pointer hover:text-red-500 transition duration-150'
                    />
                    <p>{bedroomCount}</p>
                    <AddCircleOutline
                        onClick={() => setBedroomCount(bedroomCount + 1)}
                        className='text-2xl cursor-pointer hover:text-red-500 transition duration-150'
                    />
                </div>
            </div>
            <div className='basic flex flex-col items-center gap-4 p-6 border border-solid border-gray-300 rounded-lg bg-white shadow-md'>
                <p className='font-bold text-lg'>Beds</p>
                <div className="basic_count flex items-center gap-3 text-lg">
                    <RemoveCircleOutline
                        onClick={() => bedCount > 1 && setBedCount(bedCount - 1)}
                        className='text-2xl cursor-pointer hover:text-red-500 transition duration-150'
                    />
                    <p>{bedCount}</p>
                    <AddCircleOutline
                        onClick={() => setBedCount(bedCount + 1)}
                        className='text-2xl cursor-pointer hover:text-red-500 transition duration-150'
                    />
                </div>
            </div>
            <div className='basic flex flex-col items-center gap-4 p-6 border border-solid border-gray-300 rounded-lg bg-white shadow-md'>
                <p className='font-bold text-lg'>Bathrooms</p>
                <div className="basic_count flex items-center gap-3 text-lg">
                    <RemoveCircleOutline
                        onClick={() => bathroomCount > 1 && setBathroomCount(bathroomCount - 1)}
                        className='text-2xl cursor-pointer hover:text-red-500 transition duration-150'
                    />
                    <p>{bathroomCount}</p>
                    <AddCircleOutline
                        onClick={() => setBathroomCount(bathroomCount + 1)}
                        className='text-2xl cursor-pointer hover:text-red-500 transition duration-150'
                    />
                </div>
            </div>
                            
                        </div>
                    </div>

                    <div className='create-listings_step2 bg-white pt-[30px] pr-[40px] p-6 rounded-[20px] mt-[40px]'>
                        <h2 className='text-[24px] text-red-500 font-bold'>Step 2: Add some photos of your place</h2>
                        <hr />
                        <h3 className='mt-[40px] text-[20px] font-medium mb-5 text-blue-500'>Add photos to your listing</h3>
                        <p className='text-black/70'>You can add up to 20 photos</p>
                        <h1 className='text-[24px] text-red-600'> This is feature is under develop </h1>
                        <div className="flex mt-2 mb-3 flex-col items-start justify-center">
      <input
        type="file"
        id="photos"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleUploadPhotos}
        multiple
      />
      <label htmlFor="photos" className="cursor-pointer flex flex-col items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-400 transition">
        <div className="text-3xl text-gray-500 mb-2">
          <IoIosImages />
        </div>
        <p className="text-gray-700">Upload from device</p>
      </label>
    {
      photos.length>=1 &&(
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
          {
            photos.map((photo,index)=>(
              <div key={index} className='relative border rounded-lg overflow-hidden'>
  <img
    src={URL.createObjectURL(photo)}
    alt={`Uploaded ${index}`}
    className="w-full h-[220px] object-cover"
  />
  <button 
    className='absolute right-0 top-0 m-2 p-2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full text-red-600 hover:text-red-800 text-[20px] cursor-pointer transition duration-300'
    onClick={() => handleRemovePhoto(index)}
  >
    <BiTrash />
  </button>
</div>
            ))
          }
        </div>
      )
    }
    </div>
    <hr/>
   
                        {/* <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                     {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )} 
                  </div>
                )}
              </Droppable>
                        </DragDropContext> */}
<h3 className='mt-[40px] text-[20px] font-medium mb-5 text-blue-500'>
  What makes your place attractive and exciting?
</h3>
<div className="description">
  <div className="mb-4">
    <p className='font-bold mb-2'>Title</p>
    <input
      type='text'
      placeholder='Title'
      name='title'
      value={formDescription.title}
      onChange={handleChangeDescription}
      className='border border-gray-300 rounded-[10px] text-[16px] font-semibold w-full md:w-[600px] p-2 focus:outline-none focus:border-red-500 duration-150'
      required
    />
  </div>
  <div className="mb-4">
    <p className='font-bold mb-2'>Description</p>
    <textarea
      placeholder='Description'
      name='description'
      value={formDescription.description}
      onChange={handleChangeDescription}
      className='border border-gray-300 rounded-[10px] text-[16px] font-semibold w-full md:w-[600px] p-2 focus:outline-none focus:border-red-500'
      required
    />
  </div>
  <div className="mb-4">
    <p className='font-bold mb-2'>Highlight</p>
    <input
      type='text'
      placeholder='Highlights'
      name='highlight'
      value={formDescription.highlight}
      onChange={handleChangeDescription}
      className='border border-gray-300 rounded-[10px] text-[16px] font-semibold w-full md:w-[600px] p-2 focus:outline-none focus:border-red-500'
      required
    />
  </div>
  <div className="mb-4">
    <p className='font-bold mb-2'>Highlight Details</p>
    <input
      type='text'
      placeholder='Highlight Details'
      name='highlightDesc'
      value={formDescription.highlightDesc}
      onChange={handleChangeDescription}
      className='border border-gray-300 rounded-[10px] text-[16px] font-semibold w-full md:w-[600px] p-2 focus:outline-none focus:border-red-500'
      required
    />
  </div>
  <div className="mb-4">
    <p className='font-bold mb-2'>Price</p>
    <input
      type='number'
      placeholder='Enter price'
      name='price'
      value={formDescription.price}
      onChange={handleChangeDescription}
      className='border border-gray-300 rounded-[10px] text-[16px] font-semibold w-full md:w-[600px] p-2 focus:outline-none focus:border-red-500'
      required
    />
  </div>
</div>
<button className='submit_btm mt-[10px] hover:shadow-md rounded-xl p-3 text-white bg-red-500 hover:bg-red-600 duration-150 border-none' type='submit'>
    Create Your Listings
</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Createlistings;
