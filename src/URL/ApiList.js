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

// Upazila
export const GetUpazilaCode = hostIp + `api/v1/Upazila/get-upazila-code`;
export const SaveUpazila = hostIp + `api/v1/Upazila/Save`;
export const DeleteUpazila = hostIp + `api/v1/Upazila/Delete/`;
export const GetUpazilaList = hostIp + `api/v1/Upazila/get-upazila`;

// Mosque
export const GetMosqueCode = hostIp + `api/v1/Mosque/get-mosque-code`;
export const SaveMosque = hostIp + `api/v1/Mosque/Save`;
export const DeleteMosque = hostIp + `api/v1/Mosque/Delete/`;
export const GetMosqueList = hostIp + `api/v1/Mosque/get-mosque`;

// Occupation
export const SaveOccupation = hostIp + `api/v1/BasicSetup/occupation-save`;
export const  GetOccupationList = hostIp + `api/v1/BasicSetup/occupation-list`;
export const DeleteOccupation = hostIp + `api/v1/BasicSetup/Delete-Occup/`;

// Education
export const SaveEducation = hostIp + `api/v1/BasicSetup/eduqua-save`;
export const  GetEducationList = hostIp + `api/v1/BasicSetup/eduqua-list`;
export const DeleteEducaiton = hostIp + `api/v1/BasicSetup/Delete-EduQua/`;

// Donation Amount
export const SaveDonationAmt = hostIp + `api/v1/BasicSetup/donation-save`;
export const  GetDonationAmtList = hostIp + `api/v1/BasicSetup/donamt-list`;
export const DeleteDonationAmt = hostIp + `api/v1/BasicSetup/Delete-DonAmt/`;

//Donar Enrollment Page
export const GetDistrictfromUpazila = hostIp +`api/v1/DonarEnrollment/donar-district/`;
export const SaveEnrollmentData = hostIp + `api/v1/DonarEnrollment/donenrol-save`;

// Update Enrollment Page 
export const GetEnrollmentData = hostIp +`api/v1/DonarEnrollment/donenrol-list?DonerActualId=&OrganisationalId=`;
export const DeleteEnrollData = hostIp + `api/v1/DonarEnrollment/donenrol-delete/`;
export const GetEnrollmentDataBySearch = hostIp+ `api/v1/DonarEnrollment/donenrol-list?`
export const GetActualIdandOrgId = hostIp + `api/v1/DonarEnrollment/ActOrgId-list`;
export const GetDonarAllData = hostIp + `api/v1/DonarEnrollment/donenrol-byId/`;

// Donar Payment Entry
export const DonarPaymentActualID = hostIp +`api/v1/DonarPaymentEntry/ActOrg-list`;
export const DonarPaymentSave = hostIp + `api/v1/DonarPaymentEntry/donarpayment-save`;

// Monthly Donar Payment 
export const getMonthlyDonarPaymentList = hostIp + `api/v1/DonarPaymentEntry/donAmtPayEntry-list/?`;
export const SaveMonthlyDonarPaymentList = hostIp + `api/v1/DonarPaymentEntry/donpayEntry-Listsave`;





