export interface Client{
    id: number;
    name: string;
    family: string;
    password: string;
    state: LoginState;
} 

export enum LoginState {
    Active = 1,
    Disactive =  2,
}
