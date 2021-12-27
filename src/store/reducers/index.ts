import { combineReducers } from "redux";
import userReducer, { createUserReducer, deleteUserReducer, editUserReducer } from "./userReducer";
import bookingReducer from "./bookings";
import loginReducer from "./loginReducer";
import roleReducer from "./roleReducer";
import companyReducer, { createCompanyReducer, deleteCompanyReducer, editCompanyReducer } from "./companyReducer";

const reducers = combineReducers({
    login : loginReducer,

    role : roleReducer,

    bookings: bookingReducer,

    user : userReducer,
    createUser : createUserReducer,
    removeUser : deleteUserReducer,
    editUser : editUserReducer,

    company : companyReducer,
    createCompany : createCompanyReducer,
    deleteCompany : deleteCompanyReducer,
    editcompany : editCompanyReducer

});

export default reducers;

export type RootState = ReturnType<typeof reducers>;