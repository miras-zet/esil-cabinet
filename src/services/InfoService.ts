import http from "../http-common";

const getStudentInfo = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return http.get(`/info/getstudentinfo`, { params });
};


const InfoService = {
    getStudentInfo
};

export default InfoService;
