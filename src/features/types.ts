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
/*taskSlice.ts*/
export interface READ_TASK {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    status_name: string;
    category: number;
    category_item: string;
    estimate: number;
    responsible: number;
    responsible_username: string;
    owner: number;
    owner_username: string;
    created_at: string;
    updated_at: string;
}
export interface POST_TASK {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    category: number;
    estimate: number;
    responsible: number;
}
export interface CATEGORY {
    id: number;
    item: string;
}
export interface TASK_STATE {
    tasks: READ_TASK[];
    editedTask: POST_TASK;
    selectedTask: READ_TASK;
    users: USER[];
    category: CATEGORY[];
}
/*TaskList.tsx*/
export interface SORT_STATE {
    rows: READ_TASK[];
    order: "desc" | "asc";
    activeKey: string;
}
