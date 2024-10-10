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
const deletePhoto = (id): Promise<any> => {
    const params = {
        id: id
    }
    return http.get(`/admin/deletephotobyid`, { params });
};


const AdminService = {
    getAllBooks,
    deletePhoto,
    findUser,
};

export default AdminService;
