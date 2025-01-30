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
const checkFacultyStatus = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return http.get(`/auth/getfacultystatus`,{params});
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
    return http.get(`/upload/denytutorcategory`,{params});
};
const removeTutorCategory = (category): Promise<any> => {
    const params = {
        denied_by: localStorage.getItem('user_id'),
        denied_for: localStorage.getItem('viewinguserid'),
        category: category
    }
    return http.get(`/upload/removetutorcategory`,{params});
};
const suspendTutor = (userid): Promise<any> => {
    const params = {
        userid: userid
    }
    return http.get(`/management/suspendtutor`,{params});
};
const getTutorsByCafedra = (): Promise<any> => {
    const params = {
        cafedraid: localStorage.getItem('cafedramanager'),
    }
    return http.get(`/management/gettutorsbycafedra`,{params});
};
const getTutorsByFaculty = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return http.get(`/management/gettutorsbyfaculty`,{params});
};
const getTutorBonusData = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('viewinguserid'),
    }
    return http.get(`/management/gettutordata`,{params});
};
const getTutorBonusDataPublications = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('viewinguserid'),
    }
    return http.get(`/management/gettutorpubdata`,{params});
};
const getTutorBonusDataLiterature = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('viewinguserid'),
    }
    return http.get(`/management/gettutorliteraturedata`,{params});
};
const getTutorBonusDataProforientation = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('viewinguserid'),
    }
    return http.get(`/management/gettutordataproforientation`,{params});
};
const getTutorBonusDataMoodle = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('viewinguserid'),
    }
    return http.get(`/management/gettutormoodlepercentage`,{params});
};
const getTutorBonusDataSelf = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return http.get(`/management/gettutordata`,{params});
};
const getTutorBonusDataPublicationsSelf = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return http.get(`/management/gettutorpubdata`,{params});
};
const getTutorBonusDataLiteratureSelf = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return http.get(`/management/gettutorliteraturedata`,{params});
};
const getTutorBonusDataMoodleSelf = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return http.get(`/management/gettutormoodlepercentage`,{params});
};
const getTutorBonusDataProforientationSelf = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return http.get(`/management/gettutordataproforientation`,{params});
};
const getAllTutorBonusData = (): Promise<any> =>{
    const params = {
        month_query: localStorage.getItem('month_query'),
    }
    return http.get(`/management/getalltutordata`,{params});
}


const AdminService = {
    checkManagerStatus,
    checkFacultyStatus,
    confirmTutorFile,
    confirmTutorCategory,
    denyTutorFile,
    removeTutorCategory,
    suspendTutor,
    getTutorsByCafedra,
    getTutorsByFaculty,
    getTutorBonusData,
    getTutorBonusDataPublications,
    getTutorBonusDataLiterature,
    getTutorBonusDataMoodle,
    getTutorBonusDataPublicationsSelf,
    getTutorBonusDataLiteratureSelf,
    getTutorBonusDataMoodleSelf,
    getTutorBonusDataProforientation,
    getTutorBonusDataSelf,
    getTutorBonusDataProforientationSelf,
    getAllTutorBonusData,
};

export default AdminService;
