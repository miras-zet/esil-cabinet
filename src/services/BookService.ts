import http from "../http-common";

const getAllBooks = (): Promise<any> => {
    return http.get(`/books/allbooks`);
};
const getPhysicalBookPageCount = (): Promise<any> => {
    return http.get(`/books/getphysicalbookpagecount`);
};
const getEBookPageCount = (): Promise<any> => {
    return http.get(`/books/getebookpagecount`);
};
const getBooksByFilter = (): Promise<any> => {
    const params = {
        name: localStorage.getItem('namefilter'),
        author: localStorage.getItem('authorfilter'),
    }
    return http.get(`/books/getbooksbyfilter`,{params});
};
const eBookAddLog = (userid,ebookid): Promise<any> => {
    const params = {
        userid: userid,
        ebookid: ebookid,
    }
    return http.get(`/books/ebookaddlog`,{params});
};
const getEBooksByFilter = (): Promise<any> => {
    const params = {
        name: localStorage.getItem('enamefilter'),
        author: localStorage.getItem('eauthorfilter'),
    }
    return http.get(`/books/getebooksbyfilter`,{params});
};
const getBooksByName = (): Promise<any> => {
    const params = {
        name: localStorage.getItem('bookSearch'),
    }
    return http.get(`/books/getbooksbyname`,{params});
};
const getBooksByISBN = (): Promise<any> => {
    const params = {
        ISBN: localStorage.getItem('bookSearch'),
    }
    return http.get(`/books/getbooksbyisbn`,{params});
};
const getBooksByKeyWords = (): Promise<any> => {
    const params = {
        keywords: localStorage.getItem('bookSearch'),
    }
    return http.get(`/books/getbooksbykeywords`,{params});
};
const getBooksByInventory = (): Promise<any> => {
    const params = {
        inventory: localStorage.getItem('bookSearch'),
    }
    return http.get(`/books/getbooksbyinventory`,{params});
};

const getBooksPerPage = (page:number): Promise<any> => {
    if (!Number.isNaN(parseInt(localStorage.getItem('currentPage')))) page = parseInt((localStorage.getItem('currentPage')));
    const params = {
        page: page,
    }
    return http.get(`/books/booksperpage`,{params});
};
const getEBooksPerPage = (page:number): Promise<any> => {
    if (!Number.isNaN(parseInt(localStorage.getItem('currentEPage')))) page = parseInt((localStorage.getItem('currentEPage')));
    const params = {
        page: page,
    }
    return http.get(`/books/ebooksperpage`,{params});
};
const getBooksByBarcode = (): Promise<any> => {
    const params = {
        barcode: localStorage.getItem('bookSearch'),
    }
    return http.get(`/books/getbooksbybarcode`,{params});
};
const getBook = (id): Promise<any> => {
    const params = {
        id: id,
    }
    return http.get(`/books/getbook`, { params });
};
const getEBook = (id): Promise<any> => {
    const params = {
        id: id,
    }
    return http.get(`/books/getebook`, { params });
};
const addBook = (Name, Author, Pages, Annotation, Barcode, Heading, ISBN, InventoryNumber, KeyWords, LLC, Language, Price, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, TypeOfBook, UDC): Promise<any> => {
    const params = {
        Name: Name,
        Author: Author,
        Pages: Pages,
        Annotation: Annotation,
        Barcode: Barcode,
        Heading: Heading,
        ISBN: ISBN,
        InventoryNumber: InventoryNumber,
        KeyWords: KeyWords,
        LLC: LLC,
        Language: Language,
        Price: Price,
        PublishedCountryCity: PublishedCountryCity,
        PublishedTime: PublishedTime,
        PublishingHouse: PublishingHouse,
        RLibraryCategoryRLibraryBook: RLibraryCategoryRLibraryBook,
        TypeOfBook: TypeOfBook,
        UDC: UDC
    }
    return http.get(`/books/addbook`, { params });
};
const addEBook = (file:File, Name, Author, Pages, ISBN, LLC, Language, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, UDC): Promise<any> => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append('Name', Name);
    formData.append('Author', Author);  
    formData.append('Pages', Pages);
    formData.append('ISBN', ISBN);
    formData.append('LLC', LLC);
    formData.append('Language', Language);
    formData.append('PublishedCountryCity', PublishedCountryCity);
    formData.append('PublishedTime', PublishedTime);
    formData.append('PublishingHouse', PublishingHouse);
    formData.append('RLibraryCategoryRLibraryBook', RLibraryCategoryRLibraryBook);
    formData.append('UDC', UDC);
    return http.post(`/upload/pdf`, formData );
};
const editBook = (id, Name, Author, Pages, Annotation, Barcode, Heading, ISBN, InventoryNumber, KeyWords, LLC, Language, Price, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, TypeOfBook, UDC): Promise<any> => {
    const params = {
        id: id,
        Name: Name,
        Author: Author,
        Pages: Pages,
        Annotation: Annotation,
        Barcode: Barcode,
        Heading: Heading,
        ISBN: ISBN,
        InventoryNumber: InventoryNumber,
        KeyWords: KeyWords,
        LLC: LLC,
        Language: Language,
        Price: Price,
        PublishedCountryCity: PublishedCountryCity,
        PublishedTime: PublishedTime,
        PublishingHouse: PublishingHouse,
        RLibraryCategoryRLibraryBook: RLibraryCategoryRLibraryBook,
        TypeOfBook: TypeOfBook,
        UDC: UDC
    }
    return http.get(`/books/editbook`, { params });
};
const findUser = (iin): Promise<any> => {
    const params = {
        iin: iin
    }
    return http.get(`/books/getuserdata`, { params });
};
const transferBook = (iin,bookid): Promise<any> => {
    const params = {
        iin: iin, 
        bookid: bookid
    }
    return http.get(`/books/transferbook`, { params });
};
const duplicateBook = (id): Promise<any>=>{
    const params = {
        id: id,
    }
    return http.get(`/books/duplicatebook`, { params });
}
const getLibraryStats = (year): Promise<any> => {
    const params = {
        year: year
    }
    return http.get(`/books/getlibrarystats`, { params });
};
const notifyDebtor = (userid,bookname): Promise<any> => {
    const params = {
        userid: userid, 
        bookname: bookname
    }
    return http.get(`/books/notifydebtor`, { params });
};
const transferBookBatch = (iin,bookidsJSON): Promise<any> => {
    const params = {
        iin: iin, 
        bookidsJSON: bookidsJSON
    }
    return http.get(`/books/transferbookbatch`, { params });
};
const deleteBook = (id): Promise<any> => {
    const params = {
        id: id,
    }
    return http.get(`/books/deletebook`, { params });
};
const resolveBookTransfer = (id): Promise<any> => {
    const params = {
        id: id,
    }
    return http.get(`/books/resolvebooktransfer`, { params });
};
const getDueBooks = (): Promise<any> => {
    return http.get(`/books/getduebooks`);
};
const getDueBookForUser = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id')
    }
    return http.get(`/books/getduebooksforuser`, { params });
};
const getBookCategories = (): Promise<any> => {
    return http.get(`/books/getbookcategories`);
};

const BookService = {
    getAllBooks,
    getPhysicalBookPageCount,
    getEBookPageCount,
    getBooksByName,
    getBooksByISBN,
    getBooksByKeyWords,
    getBooksByInventory,
    getBooksByBarcode,
    getBooksPerPage,
    getBooksByFilter,
    getEBooksByFilter,
    eBookAddLog,
    getEBooksPerPage,
    getBook,
    addEBook,
    duplicateBook,
    getEBook,
    editBook,
    getBookCategories,
    addBook,
    findUser,
    notifyDebtor,
    getLibraryStats,
    transferBook,
    transferBookBatch,
    deleteBook,
    getDueBooks,
    getDueBookForUser,
    resolveBookTransfer
};

export default BookService;
