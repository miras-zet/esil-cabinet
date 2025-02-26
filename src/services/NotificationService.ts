import api from "../http-common";

const example_noparams = (): Promise<any> => {
    return api.get(`/books/allbooks`);
};
const getIconData = (): Promise<any> =>{
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return api.get(`/notifications/geticondata`,{params});
}
const getNotifications = (): Promise<any> =>{
    const params = {
        user_id: localStorage.getItem('user_id'),
    }
    return api.get(`/notifications/getnotifications`,{params});
}
const markAsRead = (notif_id): Promise<any> =>{
    const params = {
        notif_id: notif_id,
    }
    return api.get(`/notifications/markasread`,{params});
}

const NotificationService = {
    example_noparams,
    getIconData,
    getNotifications,
    markAsRead,
};

export default NotificationService;
