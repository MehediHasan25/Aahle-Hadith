export const ValueSetToDataList = (list,data,ip)=>{
     for(let i = 0; i<data.length; i++){
        for(let j =0; j<list.length; j++){
            if(data[i].paymentMonth === list[j].paymentMonth ){
                data[i].donerPaymentId = list[j].donerPaymentId;
                data[i].donationAmtId = list[j].donationAmtId;
                data[i].netAmount = list[j].netAmount;
                data[i].donationAmt = list[j].donationAmt,
                data[i].userPcIP = ip
            }
        }
    }
    
   // console.log("functionRes",data);
    return data;
}

export const ProcessSaveOutput = (valData,yearData,donarEnId) =>{
    // console.log("process", valData, yearData,donarEnId);
    let filterData = valData.filter(obj => obj.donationAmt!==""&& obj.donationAmtId!==""&& obj.netAmount!=="");
    //console.log("filter", filterData);

    for (let i = 0; i < filterData.length; i++) {
        // Add the new key-value pair to the object
        if (filterData[i].hasOwnProperty("donationAmt")) {
            // Delete the key from the object
            delete filterData[i]["donationAmt"];
          }
        
        filterData[i]["paymentYear"] = yearData;
        filterData[i]["donerEnrollmentId"] = donarEnId;
      }

    //   console.log("filterData", filterData);

      return filterData;


}