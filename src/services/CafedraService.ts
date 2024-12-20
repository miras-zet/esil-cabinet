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
const confirmTutorCategory = (category): Promise<any> => {
    const params = {
        confirmed_by: localStorage.getItem('user_id'),
        confirmed_for: localStorage.getItem('viewinguserid'),
        category: category
    }
    return http.get(`/management/confirmtutorcategory`,{params});
};
const confirmTutorFile = (category): Promise<any> => {
    const params = {
        confirmed_by: localStorage.getItem('user_id'),
        confirmed_for: localStorage.getItem('viewinguserid'),
        category: category
    }
    return http.get(`/management/confirmtutorfile`,{params});
};
const denyTutorFile = (category): Promise<any> => {
    const params = {
        denied_by: localStorage.getItem('user_id'),
        denied_for: localStorage.getItem('viewinguserid'),
        category: category
    }
    return http.get(`/upload/denytutorfile`,{params});
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
const getTutorBonusDataProforientation = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('viewinguserid'),
    }
    return http.get(`/management/gettutordataproforientation`,{params});
};
const getTutorBonusDataSelf = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return http.get(`/management/gettutordata`,{params});
};
const getTutorBonusDataProforientationSelf = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return http.get(`/management/gettutordataproforientation`,{params});
};


const AdminService = {
    checkManagerStatus,
    confirmTutorFile,
    confirmTutorCategory,
    denyTutorFile,
    getTutorsByCafedra,
    getTutorBonusData,
    getTutorBonusDataProforientation,
    getTutorBonusDataSelf,
    getTutorBonusDataProforientationSelf,
};

export default AdminService;
