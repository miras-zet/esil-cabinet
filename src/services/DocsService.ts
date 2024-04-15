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
const getApplicantData = () : Promise<any>=>{ 
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/applicant/list`,{params});
};
const addApplicant = (iin:string) : Promise<any> =>{
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/applicant/register/${iin}`,{params});
};

const DocsService = {
  getApplicationDataRu,
  getApplicationDataKz,
  getContractDataRu,
  getContractDataKz,
  getApplicantData,
  addApplicant,
  getInventoryDataRu,
  getInventoryDataKz,
};

export default DocsService;
