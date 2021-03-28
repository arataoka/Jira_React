/*authSlice.ts*/
export interface LOGIN_USER {
    id:number;
    username:string;
}
// アップロードする画像の型
export interface FILE extends Blob {
    readonly lastModified:number; //最終更新
    readonly name: string;
}
export interface PROFILE {
    id:number;
    user_profile:number;
    img:string | null;
}
// usernameはreadonly
export interface POST_PROFILE {
    id:number;
    img:File|null;
}
// credential
export interface CRED {
    username: string;
    password: string;
}
export interface JWT {
    refresh:string;
    access: string;
}
export interface USER {
    id:number;
    username:string
}
export interface AUTH_STATE {
    isLoginView:boolean; //ログインか未ログインか
    loginUser: LOGIN_USER; //ログインしているユーザー
    profiles: PROFILE[]; // 存在するプロフィール一覧
}