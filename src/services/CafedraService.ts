import http from "../http-common";

// const getAllBooks = (): Promise<any> => {
//     return http.get(`/books/allbooks`);
// };
const checkManagerStatus = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return http.get(`/auth/getmanagerstatus`,{params});
};
const getTutorsByCafedra = (): Promise<any> => {
    const params = {
        cafedraid: localStorage.getItem('cafedramanager'),
    }
    return http.get(`/management/gettutorsbycafedra`,{params});
};
const getTutorBonusData = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('viewinguserid'),
    }
    return http.get(`/management/gettutordata`,{params});
};


const AdminService = {
    checkManagerStatus,
    getTutorsByCafedra,
    getTutorBonusData,
};

export default AdminService;
