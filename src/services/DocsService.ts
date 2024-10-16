import http from "../http-common";

const getApplicationDataRu = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/application/ru/${userid}`,{params});
};
const getContractDataRu = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/contract/ru/${userid}`,{params});
};
const getContractDataKz = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/contract/kz/${userid}`,{params});
};
const getApplicationDataKz = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/application/kz/${userid}`,{params});
};
const getInventoryDataRu = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/inventory/ru/${userid}`,{params});
};
const getInventoryDataKz = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/inventory/kz/${userid}`,{params});
};
const getTitleDataRu = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/title/ru/${userid}`,{params});
};
const getTitleDataKz = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/title/kz/${userid}`,{params});
};
const getApplicantData = () : Promise<any>=>{ 
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/applicant/list`,{params});
};
const getEmployeeList = () : Promise<any>=>{ 
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/hr/employeelist`,{params});
};
const getApplicantStats = () : Promise<any>=>{ 
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/applicant/stats`,{params});
};
const getAdmissionStats = () : Promise<any>=>{ 
  return http.get(`/applicant/statsWeekly`);
};
const getAdmissionStatsMain = () : Promise<any>=>{ 
  return http.get(`/applicant/statsMain`);
};
const addApplicant = (iin:string) : Promise<any> =>{
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/applicant/register/${iin}`,{params});
};

const DocsService = {
  getEmployeeList,
  getApplicationDataRu,
  getApplicationDataKz,
  getContractDataRu,
  getContractDataKz,
  getApplicantData,
  getApplicantStats,
  getAdmissionStats,
  getAdmissionStatsMain,
  addApplicant,
  getInventoryDataRu,
  getInventoryDataKz,
  getTitleDataRu,
  getTitleDataKz
};

export default DocsService;
