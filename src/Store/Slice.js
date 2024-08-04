import { createSlice } from "@reduxjs/toolkit";
// import { setWishList } from "../../../dream_nest-main/client/src/redux/state";

// Define the initial state for the slice
const initialState = {
    user: null,
    token: null,
    listings: [], // Ensure listings is an array
    Wishlist:[],
    TripList:[]
};

// Create the slice
const userSlice = createSlice({
    name: 'user', // Name of the slice
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.listings = [];
        },
        setListings: (state, action) => {
            console.log("setListings action payload:", action.payload);
            state.listings = action.payload.listings; // Make sure to use action.payload.listings
        },
        setWishList:(state,action)=>{
            state.Wishlist=action.payload.Wishlist;
        },
        setTripList:(state,action)=>{
            state.TripList=action.payload.TripList;
        }
    },
});

// Export the actions
export const { setUser, setListings, setLogout,setWishList,setTripList } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
