import http from "../http-common";

const getApplicationDataRu = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/application/ru/${userid}`,{params});
};
const getApplicationDataKz = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/application/kz/${userid}`,{params});
};
const getInventoryData = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/inventory/${userid}`,{params});
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
  getApplicantData,
  addApplicant,
  getInventoryData,
};

export default DocsService;
