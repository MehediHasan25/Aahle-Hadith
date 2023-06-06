export const  removeConsecutiveDuplicatesForUpazila=(data)=> {
    let previousDiv = '';
    let previousDis = '';
    data.forEach(obj => {
      if (obj.divisionNameEn === previousDiv) {
        obj.divisionNameEn = '';
      } else {
        previousDiv = obj.divisionNameEn;
      }
    });
    
     data.forEach(obj => {
      if (obj.districtNameEn === previousDis) {
        obj.districtNameEn = '';
      } else {
        previousDis = obj.districtNameEn;
      }
    });
    
    return data;
  }