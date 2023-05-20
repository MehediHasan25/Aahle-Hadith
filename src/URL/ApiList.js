import { hostIp } from './IpAddress';

export const RegisterAPI = hostIp + `api/v1/Login/registration`;
export const  LoginAPI = hostIp + `api/v1/Login/login`;


// Division API

export const GetDivisionCode = hostIp + `api/v1/Division/get-division-code`;
export const SaveDivision = hostIp + `api/v1/Division/Save`;
export const DeleteDivision = hostIp + `api/v1/Division/Delete/`;
export const GetDivisionList = hostIp + `api/v1/Division/get-division`;


//District API


export const GetDistrictCode = hostIp + `api/v1/District/get-district-code`;
export const SaveDistrict = hostIp + `api/v1/District/Save`;
export const DeleteDistrict = hostIp + `api/v1/District/Delete/`;
export const GetDistrictList = hostIp + `api/v1/District/get-district`;