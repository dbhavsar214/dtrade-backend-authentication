export interface UserRegistration  {
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    confirmPassword : string,
    registrationTime : string,
}

export interface UserLogin {
    emaild : string,
    password : string,
    loginTime : string
}

export interface AuthenticatedUser {
     id : number,
     email : string,
     password : string
}