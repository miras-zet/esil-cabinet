import http from "../http-common";

const example_noparams = (): Promise<any> => {
    return http.get(`/books/allbooks`);
};
const getIconData = (): Promise<any> =>{
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return http.get(`/notifications/geticondata`,{params});
}
const NotificationService = {
    example_noparams,
    getIconData,
};

export default NotificationService;
