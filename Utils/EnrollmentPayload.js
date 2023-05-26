export const handleEnrollmentPayload = (personal,selectAutoEduVal,selectAutoOccVal,address,selectAutoPreUpaVal,selectAutoPerUpaVal,orgUpazila,selectAutoMosqueVal,selectAutoDonationVal,donationAmt,donationData,life) =>{

    const {DonerEnrollmentId,DonerName,DonerNameBng,MobileNo,Email,FatherName,MotherName,NIDNo,BirthCerNo} = personal;
    const {EduQualificationId} = selectAutoEduVal;
    const {OccupationId} = selectAutoOccVal;
    const {PreAddress,PerAddress}=address;
    const {PreUpazilaId} =selectAutoPreUpaVal;
    const {PerUpazilaId,}=selectAutoPerUpaVal;
    const {OrgUpazilaId}=orgUpazila;
    const {OrgMosqueId}=selectAutoMosqueVal;
    const {DonationAmtId} =selectAutoDonationVal;
    const {DisPerAmt,NetAmount} =donationAmt;
    const {DonationMonth,DonationYear,EnrollmentDate}=donationData;
    const {LifeStatus,DeadDate} = life;

    const payload = {
            donerEnrollmentId: DonerEnrollmentId === "" ? 0 : DonerEnrollmentId,
            donerName: DonerName,
            donerNameBng: DonerNameBng,
            mobileNo: MobileNo,
            email: Email,
            fatherName: FatherName,
            motherName: MotherName,
            nidNo: NIDNo,
            birthCerNo: BirthCerNo,
            eduQualificationId: EduQualificationId,
            occupationId: OccupationId,
            preAddress: PreAddress,
            preUpazilaId: PreUpazilaId,
            perAddress: PerAddress,
            perUpazilaId: PerUpazilaId,
            orgUpazilaId: OrgUpazilaId,
            orgMosqueId: OrgMosqueId,
            donationAmtId: DonationAmtId,
            disPerAmt: DisPerAmt,
            netAmount: NetAmount,
            donationMonth: DonationMonth,
            donationYear: DonationYear,
            enrollmentDate: EnrollmentDate,
            lifeStatus: LifeStatus,
            deadDate: DeadDate !== "" ? DeadDate : ""
          
    }
    return payload;
}

