import api from "../http-common";

const getStudentInfo = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return api.get(`/info/getstudentinfo`, { params });
};
const getTutorSubjects = (tutorid): Promise<any> => {
    const params = {
        tutorid: tutorid,
    }
    return api.get(`/management/gettutorsubjects`, { params });
};
const addVideo = (tutorid, subject, number, videotype, lang): Promise<any> => {
    const params = {
        plt_id: tutorid,
        subject: subject,
        number: number,
        videotype: videotype,
        language: lang,
    }
    return api.get(`/management/addvideo`, { params });
};
const getExtraDataForCertificate = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return api.get(`/info/getextradatacert`, { params });
};
const getRoleInfo = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return api.get(`/info/getuserrole`, { params });
};
const getBonusPoints = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('viewinguserid'),
    }
    return api.get(`/management/getbonuspoints`, { params });
};
const getBonusPointsSelf = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return api.get(`/management/getbonuspoints`, { params });
};
const getMoodleHelp = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return api.get(`/info/getmoodleinfotutor`, { params });
};
const getEmployeeAttendanceInfoShort = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id')
    }
    return api.get(`/info/getemployeeattendanceinfoshort`, { params });
};
const getEmployeeAttendanceInfo = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id')
    }
    return api.get(`/info/getemployeeattendanceinfo`, { params });
};
const getAttendanceInfoShort = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id')
    }
    return api.get(`/info/getattendanceinfoshort`, { params });
};
const getAttendanceInfo = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id')
    }
    return api.get(`/info/getattendanceinfo`, { params });
};
const findTutorSearchbar = (search_query): Promise<any> => {
    const params = {
        search_query: search_query
    }
    return api.get(`/info/findtutorsearchbar`, { params });
};

const InfoService = {
    addVideo,
    findTutorSearchbar,
    getTutorSubjects,
    getExtraDataForCertificate,
    getStudentInfo,
    getMoodleHelp,
    getRoleInfo,
    getBonusPoints,
    getBonusPointsSelf,
    getAttendanceInfoShort,
    getEmployeeAttendanceInfoShort,
    getAttendanceInfo,
    getEmployeeAttendanceInfo
};

export default InfoService;
