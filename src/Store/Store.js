import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './Slice'

// import Slice from "./Slice";
const Store=configureStore({
    reducer:
    {
        user:UserSlice,

    }
})
export default Store;