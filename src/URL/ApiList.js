import { hostIp } from './IpAddress';

export const RegisterAPI = hostIp + `api/v1/Login/registration`;
export const  LoginAPI = hostIp + `api/v1/Login/login`;


// Division API

export const GetDivisionCode = hostIp + `api/v1/Division/get-division-code`;
export const SaveDivision = hostIp + `api/v1/Division/Save`;
export const DeleteDivision = hostIp + `api/v1/Division/Delete/`;
export const GetDivisionList = hostIp + `api/v1/Division/get-division`;
