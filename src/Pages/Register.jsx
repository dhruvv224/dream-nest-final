import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null,
    });

    const containerStyle = {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };

    const backgroundImageStyle = {
        backgroundImage: "url('/assets/register.jpg')",
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to handle file upload
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Register successful", response.data);
            toast.success('Registration successful', {
                position: 'top-center',
            });
        } catch (error) {
            console.error("Error during registration", error);
            toast.error('Registration failed', {
                position: 'top-center',
            });
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'profileImage' ? files[0] : value,
        });
    };

    return (
        <div className='mx-auto'>
            <Toaster position="top-center" />
            <div className="Register h-screen bg-cover bg-center" style={{ ...backgroundImageStyle, ...containerStyle }}>
                <div className='md:max-w-[1200px] max-w-[400px] mx-auto'>
                    <div className="p-8 rounded-3xl bg-black bg-opacity-50">
                        <h2 className="text-white text-2xl font-bold mb-4 text-center">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="First Name" className="bg-black bg-opacity-50 text-white text-[18px] rounded-lg px-4 py-2 mb-4 block w-full" name='firstName' value={formData.firstName} onChange={handleChange} />
                            <input type="text" placeholder="Last Name" className="bg-black bg-opacity-50 text-white text-[18px] rounded-lg px-4 py-2 mb-4 block w-full" name='lastName' value={formData.lastName} onChange={handleChange} />
                            <input type="email" placeholder="Email" className="bg-black bg-opacity-50 text-white text-[18px] rounded-lg px-4 py-2 mb-4 block w-full" name='email' value={formData.email} onChange={handleChange} />
                            <input type="password" placeholder="Password" className="bg-black bg-opacity-50 text-white text-[18px] rounded-lg px-4 py-2 mb-4 block w-full" name='password' value={formData.password} onChange={handleChange} />
                            <input type="password" placeholder="Confirm Password" className="bg-black bg-opacity-50 text-white text-[18px] rounded-lg px-4 py-2 mb-4 block w-full" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                            <div className="flex items-center justify-center mb-4">
                                <input
                                    id="image"
                                    type="file"
                                    name="profileImage"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleChange}
                                />
                                <label htmlFor="image" className="flex items-center cursor-pointer" tabIndex="0" role="button">
                                    <img src="/assets/addImage.png" alt="add profile photo" className='w-[35px] mr-2' />
                                    <span className="text-white text-[18px]">Upload Your Photo</span>
                                </label>
                                {formData.profileImage && (
                                    <img
                                        src={URL.createObjectURL(formData.profileImage)}
                                        alt="profile"
                                        className="ml-4 max-w-[80px] rounded-xl"
                                    />
                                )}
                            </div>
                            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white text-[18px] rounded-lg px-4 py-2 block w-full duration-300">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
