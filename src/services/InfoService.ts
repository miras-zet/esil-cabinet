import api from "../http-common";

const getStudentInfo = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return api.get(`/info/getstudentinfo`, { params });
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
const InfoService = {
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
