import http from "../http-common";

import config from "../http/config.json";
const API_URL = config.API_URL;

const REACT_APP_API_URL = API_URL;
const upload = (file: File,  activity_id: any, info: any): Promise<any> => {
  let formData = new FormData();
  const userid = localStorage.getItem('user_id');
  formData.append("file", file);
  formData.append('user_id',userid);
  formData.append('activity_id',activity_id);  
  formData.append('info',info);  
  return http.post("/upload", formData);
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
const getFilesForUser = () : Promise<any> => {
  const userid = localStorage.getItem('user_id_view');  
  return http.get(`/upload/files/${userid}`);
};
const getTutors = () : Promise<any> =>{
  const cafedra = localStorage.getItem('cafedraid'); 
  return http.get(`/upload/gettutors/${cafedra}`);
}
const getStats = () : Promise<any> =>{
  return http.get(`/upload/getstats`);
}
const getTopTen = () : Promise<any> =>{
  return http.get(`/upload/gettopten`);
}
const getCategories = () : Promise<any> => {
    const categoryid = localStorage.getItem('categoryid');  
    return http.get(`/upload/activities/${categoryid}`);
  };
const getKpi = () : Promise<any> => {
    const user_id = localStorage.getItem('user_id');  
    return http.get(`/upload/getscore/${user_id}`);
  };

const UploadService = {
  upload,
  getFiles,
  getTutors,
  getCategories,
  deleteFile,
  downloadFile,
  getKpi,
  getStats,
  getFilesForUser,
  getTopTen,
  REACT_APP_API_URL
};

export default UploadService;
