import http from "../http-common";

const getStudentInfo = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return http.get(`/info/getstudentinfo`, { params });
};
const getRoleInfo = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return http.get(`/info/getuserrole`, { params });
};
const getBonusPoints = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('viewinguserid'),
    }
    return http.get(`/management/getbonuspoints`, { params });
};
const getBonusPointsSelf = (): Promise<any> => {
    const params = {
        userid: localStorage.getItem('user_id'),
    }
    return http.get(`/management/getbonuspoints`, { params });
};
const getAttendanceInfo = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id')
    }
    return http.get(`/info/getattendanceinfo`, { params });
};
const InfoService = {
    getStudentInfo,
    getRoleInfo,
    getBonusPoints,
    getBonusPointsSelf,
    getAttendanceInfo,
};

export default InfoService;
