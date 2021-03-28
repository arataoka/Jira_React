import React, { useState } from "react";
import styles from "./Auth.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
    toggleMode,
    fetchAsyncLogin,
    fetchAsyncRegister,
    fetchAsyncCreateProf,
    selectIsLoginView,
} from "./authSlice";

// material-ui
const useStyles = makeStyles((theme:Theme)=>({
    button:{
        margin:theme.spacing(3), //default 8px の3倍
    }
}))

const Auth:React.FC = () => {
    const classes = useStyles();
    const dispatch:AppDispatch = useDispatch();
    const isLoginView = useSelector(selectIsLoginView);
    const [credential, setCredential] = useState({username:"", password:""});// ローカル管理

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value; // value属性
        const name = e.target.name; // name属性
        setCredential({...credential, [name]:value}); //このようにかくとusernameとpasswordそれぞれ変更対応可能になる。
    }

    const login = async()=>{
        if(isLoginView){ //ログイン画面なら
            await dispatch(fetchAsyncLogin(credential)); //JWTトークンを取得
        } else { //会員登録画面なら
            const result = await dispatch(fetchAsyncRegister(credential));
            if(fetchAsyncRegister.fulfilled.match(result)){
                await dispatch(fetchAsyncLogin(credential)); //ログインを自動で行う
                await dispatch(fetchAsyncCreateProf()); //プロフィールを作成
            }
        }
    }

    return (
        <div className={styles.auth__root}>
            <h1>{isLoginView ? "Login" : "Register"}</h1>
            <br />
            <TextField
                InputLabelProps={{ // 上のラベルを小さく表記する
                    shrink: true,
                }}
                label="Username"
                type="text"
                name="username"
                value={credential.username}
                onChange={handleInputChange}
            />
            <br />
            <TextField
                InputLabelProps={{
                    shrink: true,
                }}
                label="Password"
                type="password"
                name="password"
                value={credential.password}
                onChange={handleInputChange}
            />
            <Button
                variant="contained" //塗り潰し
                color="primary"
                size="small"
                className={classes.button}
                onClick={login}
            >
                {isLoginView ? "Login" : "Register"}
            </Button>
            <span onClick={() => dispatch(toggleMode())}>
        {isLoginView ? "Create new account ?" : "Back to Login"}
      </span>
        </div>
    );
};

export default Auth;
