import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from "axios";
import {
    AUTH_STATE,
    CRED,
    LOGIN_USER,
    POST_PROFILE,
    PROFILE,
    JWT,
    USER
} from "../../types";

export const fetchAsyncLogin = createAsyncThunk('auth/login', async (auth: CRED) => {
    const res = await axios.post<JWT>(
        `${process.env.REACT_APP_API_URL}/authen/jwt/create/`,
        auth,
        {
            headers: {
                "Content-Type": "appliication/json"
            }
        }
    )
    return res.data;
})

export const fetchAsyncRegister = createAsyncThunk('auth/register', async (auth: CRED) => {
    const res = await axios.post<USER>(
        `${process.env.REACT_APP_API_URL}/api/create/`,
        auth,
        {
            headers: {
                "Content-Type": "appliication/json"
            }
        }
    )
    return res.data;
})

export const fetchAsyncGetMyProf = createAsyncThunk('auth/loginuser', async () => {
    const res = await axios.get<LOGIN_USER>(
        `${process.env.REACT_APP_API_URL}/api/loginuser/`,
        {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`
            }
        }
    );
    return res.data;
})

export const fetchAsyncCreateProf = createAsyncThunk(
"auth/createProfile",
async () =>{
    const res = await axios.post<PROFILE>(
        `${process.env.REACT_APP_API_URL}/api/profile/`,
        {img:null},
        {
            headers:{
                "Content-Type": "application/json",
                Authorization:`JWT ${localStorage.localJWT}`,
            }
        }
    )
    return res.data;
}
)

export const fetchAsyncGetProfs = createAsyncThunk(
    "auth/getProfiles",
    async () =>{
        const res = await axios.post<PROFILE[]>(
            `${process.env.REACT_APP_API_URL}/api/profile/`,
            {img:null},
            {
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`JWT ${localStorage.localJWT}`,
                }
            }
        )
        return res.data;
    }
)

export const fetchAsyncUpdateProf = createAsyncThunk(
    "auth/updateProfiles",
    async(profile:POST_PROFILE)=>{
        const uploadData = new FormData(); //空のフォームデータ
        profile.img && uploadData.append('img',profile.img,profile.img.name);
        const res = await axios.put<PROFILE>(
            `${process.env.REACT_APP_API_URL}/api/profile/${profile.id}/`,
            uploadData,
            {
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`JWT ${localStorage.localJWT}`,
                }
            }
        )
        return res.data
    }
)

const initialState: AUTH_STATE = {
    isLoginView: true,
    loginUser: {
        id: 0,
        username: '',
    },
    profiles: [{id: 0, user_profile: 0, img: null}]
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleMode(state){
            state.isLoginView = !state.isLoginView
        },
    },
    extraReducers: builder => {
        builder.addCase(
            fetchAsyncLogin.fulfilled,
            (state, action: PayloadAction<JWT>) =>{ //非同期の返り値がactionへ入る
                localStorage.setItem("localJWT", action.payload.access); //accessトークンをローカルストレージに格納
                action.payload.access && (window.location.href = "/tasks")
            }
        )
        builder.addCase(
            fetchAsyncGetMyProf.fulfilled,
            (state, action: PayloadAction<LOGIN_USER>) => {
                return {
                    ...state,
                    loginUser: action.payload
                }
            }
        )
        builder.addCase(
            fetchAsyncGetProfs.fulfilled,
            (state, action: PayloadAction<PROFILE[]>) => {
                return {
                    ...state,
                    profiles: action.payload
                }
            }
        )
        builder.addCase(
            fetchAsyncUpdateProf.fulfilled,
            (state, action: PayloadAction<PROFILE>) => {
                return {
                    ...state,
                    profiles: state.profiles.map(profile => profile.id === action.payload.id ? action.payload : profile)
                }
            }
        )
    }
});

export const {toggleMode } = authSlice.actions;

export const selectIsLoginView = (state:RootState) => state.auth.isLoginView;
export const selectIsLoginUser = (state:RootState) => state.auth.loginUser;
export const selectProgiles = (state:RootState) => state.auth.profiles;

export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
