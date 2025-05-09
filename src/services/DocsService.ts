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
const getStatementDataRu = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/statement/ru/${userid}`,{params});
};
const getStatementDataKz = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/statement/kz/${userid}`,{params});
};
const getStatementDOTDataRu = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/statementDOT/ru/${userid}`,{params});
};
const getStatementDOTDataKz = () : Promise<any> => {
  const params = {
    token: localStorage.getItem('token'),
  }
  const userid = localStorage.getItem('applicant_user_id');  
  return http.get(`/docs/statementDOT/kz/${userid}`,{params});
};
const addStatement = (Faculty,FIO,Number,ParentNumber,Location) : Promise<any>=>{ 
  const params = {
    userid : localStorage.getItem('user_id'),
    token: localStorage.getItem('token'),
    Faculty: Faculty,
    FIO:FIO,
    Number:Number,
    ParentNumber:ParentNumber,
    Location:Location
  }
  return http.get(`/docs/addstatement`,{params});
};
const getDataForStatement = (user_id) : Promise<any>=>{ 
  const params = {
    userid : user_id,
  }
  return http.get(`/docs/getdataforstatement`,{params});
};
const getDataForCard = (user_id) : Promise<any>=>{ 
  const params = {
    userid : user_id
  }
  return http.get(`/docs/getdataforcard`,{params});
};
const createDormDocs = () : Promise<any>=>{ 
  const params = {
    userid : localStorage.getItem('user_id'),
    statementdata: localStorage.getItem('statementdata'),
    carddata: localStorage.getItem('carddata'),
    parentsdata: localStorage.getItem('cardparentsdata'),
  }
  return http.get(`/docs/createdormdocs`,{params});
};
const getRoomNumber = (iin) : Promise<any>=>{ 
  const params = {
    iin : iin
  }
  return http.get(`/docs/getroomnumber`,{params});
};
const getAgreementData = () : Promise<any>=>{ 
  const params = {
    iin : localStorage.getItem('viewinguseriin')
  }
  return http.get(`/docs/getagreementdata`,{params});
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
const getTutorListPenalty = () : Promise<any>=>{
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/hr/tutorlistpenalty`,{params});
};
const getTutorListCSEI = () : Promise<any>=>{
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/hr/tutorlistcsei`,{params});
};
const getTutorListAdmission = () : Promise<any>=>{
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/hr/tutorlistadmission`,{params});
};
const getTutorListEPHQ = () : Promise<any>=>{
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/hr/tutorlistephq`,{params});
};
const getTutorListScienceSec = () : Promise<any>=>{
  const params = {
    token: localStorage.getItem('token'),
  }
  return http.get(`/hr/tutorlistsciencesec`,{params});
};
const createPenalty = (userid,penalty_type) : Promise<any>=>{
  const params = {
    userid:userid,
    penalty_type:penalty_type
  }
  return http.get(`/hr/createpenalty`,{params});
};
const deletePenalty = (userid,penalty_type) : Promise<any>=>{
  const params = {
    userid:userid,
    penalty_type:penalty_type
  }
  return http.get(`/hr/deletepenalty`,{params});
}; 
const approveCSEI = (userid,category) : Promise<any>=>{
  const params = {
    userid:userid,
    category:category
  }
  return http.get(`/hr/approvecsei`,{params});
};
const denyCSEI = (userid,category) : Promise<any>=>{
  const params = {
    userid:userid,
    category:category
  }
  return http.get(`/hr/denycsei`,{params});
}; 
const approveScienceSec = (userid,category) : Promise<any>=>{
  const params = {
    userid:userid,
    category:category
  }
  return http.get(`/hr/approvesciencesec`,{params});
};
const denyScienceSec = (userid,category) : Promise<any>=>{
  const params = {
    userid:userid,
    category:category
  }
  return http.get(`/hr/denysciencesec`,{params});
}; 
const approveAuditorium = (userid) : Promise<any>=>{
  const params = {
    userid:userid,
  }
  return http.get(`/hr/approveauditorium`,{params});
};
const denyAuditorium = (userid) : Promise<any>=>{
  const params = {
    userid:userid,
  }
  return http.get(`/hr/denyauditorium`,{params});
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
    userid: localStorage.getItem('user_id'),
  }
  return http.get(`/applicant/register/${iin}`,{params});
};
const getTutorPubsInfo = () : Promise<any> =>{
  const params = {
    userid: localStorage.getItem('user_id'),
  }
  return http.get(`/docs/getpubsinfotutor`,{params});
};
const getTutorAcademicStatus = () : Promise<any> =>{
  const params = {
    userid: localStorage.getItem('user_id'),
  }
  return http.get(`/docs/gettutoracademicstatus`,{params});
};

const DocsService = {
  getTutorPubsInfo,
  getStatementDataRu,
  getStatementDataKz,
  getStatementDOTDataRu,
  getStatementDOTDataKz,
  getTutorAcademicStatus,
  createDormDocs,
  getAgreementData,
  getRoomNumber,
  addStatement,
  getDataForStatement,
  getEmployeeList,
  createPenalty,
  deletePenalty,
  approveCSEI,
  denyCSEI,
  approveScienceSec,
  denyScienceSec,
  approveAuditorium,
  denyAuditorium,
  getTutorListPenalty,
  getTutorListCSEI,
  getTutorListAdmission,
  getTutorListEPHQ,
  getTutorListScienceSec,
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
  getTitleDataKz,
  getDataForCard
};

export default DocsService;
