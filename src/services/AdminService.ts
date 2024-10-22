import http from "../http-common";

const getAllBooks = (): Promise<any> => {
    return http.get(`/books/allbooks`);
};
const findUser = (iin): Promise<any> => {
    const params = {
        iin: iin
    }
    return http.get(`/admin/findphotodata`, { params });
};
const addNewUser = (iin,lastname,firstname,patronymic,role): Promise<any> => {
    const params = {
        iin: iin,
        lastname: lastname,
        firstname: firstname,
        patronymic: patronymic,
        role: role
    }
    return http.get(`/admin/addnewuser`, { params });
};
const deletePhoto = (id): Promise<any> => {
    const params = {
        id: id
    }
    return http.get(`/admin/deletephotobyid`, { params });
};


const AdminService = {
    getAllBooks,
    addNewUser,
    deletePhoto,
    findUser,
};

export default AdminService;
