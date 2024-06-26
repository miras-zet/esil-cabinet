import http from "../http-common";


const upload = (file: File,  activity_id: any, info: any): Promise<any> => {
  let formData = new FormData();
  const userid = localStorage.getItem('user_id');
  formData.append("file", file);
  formData.append('user_id',userid);
  formData.append('activity_id',activity_id);  
  formData.append('info',info);  
  return http.post("/upload", formData);
};
const updateapplicant = (column: any, data: any): Promise<any> => {
  let formData = new FormData();
  const userid = localStorage.getItem('applicant_user_id');
  formData.append('user_id',userid);
  formData.append('column',column);  
  formData.append('data',data);  
  return http.post("/applicant/update", formData);
};
const downloadFile = (filename: string,): Promise<any> => {
    return http.get(`/upload/download/${filename}`);
};
const deleteFile = (filename: any, user_id:any): Promise<any> => {
    //return http.delete(`/upload/delete/${filename}`);
    return http.delete(`/upload/delete`, {data:{filename:filename,user_id:user_id}});
};
const getFiles = () : Promise<any> => {
  const userid = localStorage.getItem('user_id');  
  return http.get(`/upload/files/${userid}`);
};
const getCategoryScores = () : Promise<any> => {
  const userid = localStorage.getItem('user_id');  
  return http.get(`/upload/getcategoryscore/${userid}`);
};
const getDebtData = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id');
  return http.get(`/excel/getdebtdata/${userid}`);
};
const getExcelDate = () : Promise<any> =>{
  return http.get(`/excel/getdocdate`);
};
const getUMKDMoodle = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id');
  return http.get(`/upload/getumkdmoodle/${userid}`);
};
const getFilesForUser = () : Promise<any> => {
  const userid = localStorage.getItem('user_id_view');  
  return http.get(`/upload/files/${userid}`);
};
const getUMKDMoodleForUser = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id_view');
  return http.get(`/upload/getumkdmoodle/${userid}`);
};
const getPlatonusData = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id'); 
  return http.get(`/upload/getpltdata/${userid}`);
}
const getPlatonusDataForUser = () : Promise<any> =>{
  const userid = localStorage.getItem('user_id_view'); 
  return http.get(`/upload/getpltdata/${userid}`);
}
const getTutors = () : Promise<any> =>{
  const cafedra = localStorage.getItem('cafedraid'); 
  return http.get(`/upload/gettutors/${cafedra}`);
}
const getStats = () : Promise<any> =>{
  return http.get(`/upload/getstats`);
}
const getFacultyStats = () :Promise<any> =>{
  return http.get(`/upload/getfacultystats`);
}
const getTopTen = () : Promise<any> =>{
  const toptentype = localStorage.getItem('toptentype');
  return http.get(`/upload/gettopten/${toptentype}`);
}
const getCategories = () : Promise<any> => {
    const categoryid = localStorage.getItem('categoryid');  
    return http.get(`/upload/activities/${categoryid}`);
}
const getKpi = () : Promise<any> => {
    const user_id = localStorage.getItem('user_id');  
    return http.get(`/upload/getscore/${user_id}`);
}

const UploadService = {
  upload,
  updateapplicant,
  getFiles,
  getTutors,
  getCategories,
  deleteFile,
  getDebtData,
  downloadFile,
  getCategoryScores,
  getExcelDate,
  getUMKDMoodle,
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
