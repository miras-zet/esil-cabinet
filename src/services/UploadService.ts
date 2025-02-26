import api from "../http-common";


const upload = (file: File,  activity_id: any, info: any): Promise<any> => {
  let formData = new FormData();
  const userid = localStorage.getItem('user_id');
  formData.append("file", file);
  formData.append('user_id',userid);
  formData.append('activity_id',activity_id);  
  formData.append('info',info);  
  return api.post("/upload", formData);
};
const uploadBonusFile = (file: File,  filetype: string): Promise<any> => {
  let formData = new FormData();
  const by_userid = localStorage.getItem('user_id');
  const for_userid = localStorage.getItem('viewinguserid');
  formData.append("file", file);
  formData.append('for_user_id',for_userid);
  formData.append('by_user_id',by_userid);
  formData.append('filetype',filetype);    
  return api.post("/bonusfile", formData);
};
const uploadCourseraFile = (file: File, filetype: string, link: string): Promise<any> => {
  let formData = new FormData();
  const userid = localStorage.getItem('user_id');
  formData.append("file", file);
  formData.append('userid',userid);
  formData.append('filetype', filetype);    
  formData.append('link', link); 
  return api.post("/courserafile", formData);
};
const updateProforientation = (): Promise<any> => {
  const for_userid = localStorage.getItem('viewinguserid');
  const student_count = localStorage.getItem('student_count'); 
  const params = {
    for_userid: for_userid,
    student_count: student_count,
  }
  return api.get(`/upload/bonusfileproforientation`,{params});
};
const updateProforientationAdmission = (userid,student_count): Promise<any> => {
  const params = {
    for_userid: userid,
    student_count: student_count,
  }
  return api.get(`/upload/bonusfileproforientation`,{params});
};
const uploadBonusFileSelf = (file: File,  filetype: string): Promise<any> => {
  let formData = new FormData();
  const by_userid = localStorage.getItem('user_id');
  const for_userid = localStorage.getItem('user_id');
  formData.append("file", file);
  formData.append('for_user_id',for_userid);
  formData.append('by_user_id',by_userid);
  formData.append('filetype',filetype);    
  return api.post("/bonusfile", formData);
};
// const uploadBonusFileProforientationSelf = (file: File,  filetype: string): Promise<any> => {
//   let formData = new FormData();
//   const by_userid = localStorage.getItem('user_id');
//   const for_userid = localStorage.getItem('user_id');
//   const student_count = localStorage.getItem('student_count');
//   formData.append("file", file);
//   formData.append('for_user_id',for_userid);
//   formData.append('by_user_id',by_userid);
//   formData.append('filetype',filetype); 
//   formData.append('student_count',student_count);   
//   return api.post("/bonusfileproforientation", formData);
// };
const uploadPhoto = (file: File, extension): Promise<any> => {
  let formData = new FormData();
  const userid = localStorage.getItem('user_id');
  const renamedFile = new File([file], userid+'.'+extension, {
    type: file.type,
    lastModified: file.lastModified,
  });
  formData.append("file", renamedFile);
  formData.append('user_id',userid);
  return api.post("/upload/photo", formData);
};
const checkPhotoUploadEligibility = (): Promise<any> => {
  const user_id = localStorage.getItem('user_id');
  if (user_id == null || user_id == 'null') return api.get(`/upload/checkphotoeligibility/0`);
  return api.get(`/upload/checkphotoeligibility/${user_id}`);
};
// const updateapplicant = (column: any, data: any): Promise<any> => {
//   let formData = new FormData();
//   const userid = localStorage.getItem('applicant_user_id');
//   formData.append('user_id',userid);
//   formData.append('column',column);  
//   formData.append('data',data);  
//   return api.post("/applicant/update", formData);
// };
const downloadFile = (filename: string,): Promise<any> => {
    return api.get(`/upload/download/${filename}`);
};
const deleteFile = (filename: any, user_id:any): Promise<any> => {
    //return api.delete(`/upload/delete/${filename}`);
    return api.delete(`/upload/delete`, {data:{filename:filename,user_id:user_id}});
};
const getFiles = () : Promise<any> => {
  const userid = localStorage.getItem('user_id');  
  return api.get(`/upload/files/${userid}`);
};
const getCourseraFiles = () :Promise<any> => {
  const params = {
    userid: localStorage.getItem('user_id')
  }
  return api.get(`/upload/getcourserafiles`,{params});
};
const getCategoryScores = () : Promise<any> => {
  const userid = localStorage.getItem('user_id');  
  return api.get(`/upload/getcategoryscore/${userid}`);
};
const getDebtData = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id');
  return api.get(`/excel/getdebtdata/${userid}`);
};
const getExcelDate = () : Promise<any> =>{
  return api.get(`/excel/getdocdate`);
};
const getDormRequestForUser = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id');
  return api.get(`/upload/getdormrequest/${userid}`);
};
const getDormRequestsData = () : Promise<any> =>{
  return api.get(`/upload/getalldormrequests`);
};
const approveDormRequestForUser = () : Promise<any> =>{
  //return api.get(`/upload/approvedormrequest/${iin}`);
  const params = {
    iin: localStorage.getItem('dormIIN'),
    dormType: localStorage.getItem('dormType'),
    dormMessage: localStorage.getItem('dormMessage'),
    dormRoomNumber: localStorage.getItem('dormRoomNumber'),
  }
  return api.get(`/upload/approvedormrequest`,{params});
};
const denyDormRequestForUser = () : Promise<any> =>{
  //return api.get(`/upload/approvedormrequest/${iin}`);
  const params = {
    iin: localStorage.getItem('dormIIN'),
    dormMessage: localStorage.getItem('dormMessage'),
  }
  return api.get(`/upload/denydormrequest`,{params});
};
const createDormRequestForUser = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id');
  return api.get(`/upload/createdormrequest/${userid}`);
};
const createDormRequestForUserSelected = (id) : Promise<any> =>{
  return api.get(`/upload/createdormrequest/${id}`);
};
const deleteDormRequestForUser = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id');
  return api.get(`/upload/deletedormrequest/${userid}`);
};
const getUMKDMoodle = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id');
  return api.get(`/upload/getumkdmoodle/${userid}`);
};
const getFilesForUser = () : Promise<any> => {
  const userid = localStorage.getItem('user_id_view');  
  return api.get(`/upload/files/${userid}`);
};
const getUMKDMoodleForUser = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id_view');
  return api.get(`/upload/getumkdmoodle/${userid}`);
};
const getPlatonusData = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id'); 
  return api.get(`/upload/getpltdata/${userid}`);
}
const getPlatonusDataForUser = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id_view'); 
  return api.get(`/upload/getpltdata/${userid}`);
}
const getTutors = () : Promise<any> =>{
  const cafedra = localStorage.getItem('cafedraid'); 
  return api.get(`/upload/gettutors/${cafedra}`);
}
const getStats = () : Promise<any> =>{
  return api.get(`/upload/getstats`);
}
const getFacultyStats = () :Promise<any> =>{
  return api.get(`/upload/getfacultystats`);
}
const getTopTen = () : Promise<any> =>{
  const toptentype = localStorage.getItem('toptentype');
  return api.get(`/upload/gettopten/${toptentype}`);
}
const getCategories = () : Promise<any> => {
    const categoryid = localStorage.getItem('categoryid');  
    return api.get(`/upload/activities/${categoryid}`);
}
const getKpi = () : Promise<any> => {
    const user_id = localStorage.getItem('user_id');  
    return api.get(`/upload/getscore/${user_id}`);
}

const UploadService = {
  upload,
  uploadBonusFile,
  uploadCourseraFile,
  uploadBonusFileSelf,
  updateProforientation,
  updateProforientationAdmission,
  getFiles,
  getCourseraFiles,
  getTutors,
  getCategories,
  denyDormRequestForUser,
  deleteFile,
  getDebtData,
  downloadFile,
  getCategoryScores,
  getExcelDate,
  uploadPhoto,
  checkPhotoUploadEligibility,
  getUMKDMoodle,
  getDormRequestsData,
  getDormRequestForUser,
  createDormRequestForUser,
  createDormRequestForUserSelected,
  approveDormRequestForUser,
  deleteDormRequestForUser,
  getUMKDMoodleForUser,
  getKpi,
  getPlatonusData,
  getPlatonusDataForUser,
  getStats,
  getFilesForUser,
  getTopTen,
  getFacultyStats,
};

export default UploadService;
