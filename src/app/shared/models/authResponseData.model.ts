export interface IAuthResponseData {
    idToken :string;
    email :string;
    refreshToken :string;
    expiresIn :string;
    localId :string;
    registerd ?:boolean
}