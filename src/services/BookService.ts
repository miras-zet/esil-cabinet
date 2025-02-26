import api from "../http-common";

const getAllBooks = (): Promise<any> => {
    return api.get(`/books/allbooks`);
};
const getPhysicalBookPageCount = (): Promise<any> => {
    return api.get(`/books/getphysicalbookpagecount`);
};
const getEBookPageCount = (): Promise<any> => {
    return api.get(`/books/getebookpagecount`);
};
const getBooksByFilter = (): Promise<any> => {
    const params = {
        name: localStorage.getItem('namefilter'),
        author: localStorage.getItem('authorfilter'),
    }
    return api.get(`/books/getbooksbyfilter`,{params});
};
const eBookAddLog = (userid,ebookid): Promise<any> => {
    const params = {
        userid: userid,
        ebookid: ebookid,
    }
    return api.get(`/books/ebookaddlog`,{params});
};
const getEBooksByFilter = (): Promise<any> => {
    const params = {
        name: localStorage.getItem('enamefilter'),
        author: localStorage.getItem('eauthorfilter'),
    }
    return api.get(`/books/getebooksbyfilter`,{params});
};
const getBooksByName = (): Promise<any> => {
    const params = {
        name: localStorage.getItem('bookSearch'),
    }
    return api.get(`/books/getbooksbyname`,{params});
};
const getBooksByISBN = (): Promise<any> => {
    const params = {
        ISBN: localStorage.getItem('bookSearch'),
    }
    return api.get(`/books/getbooksbyisbn`,{params});
};
const getBooksByKeyWords = (): Promise<any> => {
    const params = {
        keywords: localStorage.getItem('bookSearch'),
    }
    return api.get(`/books/getbooksbykeywords`,{params});
};
const getBooksByInventory = (): Promise<any> => {
    const params = {
        inventory: localStorage.getItem('bookSearch'),
    }
    return api.get(`/books/getbooksbyinventory`,{params});
};

const getBooksPerPage = (page:number): Promise<any> => {
    if (!Number.isNaN(parseInt(localStorage.getItem('currentPage')))) page = parseInt((localStorage.getItem('currentPage')));
    const params = {
        page: page,
    }
    return api.get(`/books/booksperpage`,{params});
};
const getEBooksPerPage = (page:number): Promise<any> => {
    if (!Number.isNaN(parseInt(localStorage.getItem('currentEPage')))) page = parseInt((localStorage.getItem('currentEPage')));
    const params = {
        page: page,
    }
    return api.get(`/books/ebooksperpage`,{params});
};
const getBooksByBarcode = (): Promise<any> => {
    const params = {
        barcode: localStorage.getItem('bookSearch'),
    }
    return api.get(`/books/getbooksbybarcode`,{params});
};
const getBook = (id): Promise<any> => {
    const params = {
        id: id,
    }
    return api.get(`/books/getbook`, { params });
};
const getEBook = (id): Promise<any> => {
    const params = {
        id: id,
    }
    return api.get(`/books/getebook`, { params });
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
    return api.get(`/books/addbook`, { params });
};
const editEBook = (id, Name, Author, Pages, LLC, ISBN, Language, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, UDC): Promise<any> => {
    const params = {
        id: id,
        Name: Name,
        Author: Author,
        Pages: Pages,
        LLC: LLC,
        ISBN: ISBN,
        Language: Language,
        PublishedCountryCity: PublishedCountryCity,
        PublishedTime: PublishedTime,
        PublishingHouse: PublishingHouse,
        RLibraryCategoryRLibraryBook: RLibraryCategoryRLibraryBook,
        UDC: UDC
    }
    return api.get(`/books/editebook`, { params });
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
    return api.get(`/books/editbook`, { params });
};
const findUser = (iin): Promise<any> => {
    const params = {
        iin: iin
    }
    return api.get(`/books/getuserdata`, { params });
};
const transferBook = (iin,bookid): Promise<any> => {
    const params = {
        iin: iin, 
        bookid: bookid
    }
    return api.get(`/books/transferbook`, { params });
};
const duplicateBook = (id): Promise<any>=>{
    const params = {
        id: id,
    }
    return api.get(`/books/duplicatebook`, { params });
}
const getLibraryStats = (year): Promise<any> => {
    const params = {
        year: year
    }
    return api.get(`/books/getlibrarystats`, { params });
};
const notifyDebtor = (userid,bookname): Promise<any> => {
    const params = {
        userid: userid, 
        bookname: bookname
    }
    return api.get(`/books/notifydebtor`, { params });
};
const transferBookBatch = (iin,bookidsJSON): Promise<any> => {
    const params = {
        iin: iin, 
        bookidsJSON: bookidsJSON
    }
    return api.get(`/books/transferbookbatch`, { params });
};
const deleteBook = (id): Promise<any> => {
    const params = {
        id: id,
    }
    return api.get(`/books/deletebook`, { params });
};
const resolveBookTransfer = (id): Promise<any> => {
    const params = {
        id: id,
    }
    return api.get(`/books/resolvebooktransfer`, { params });
};
const getDueBooks = (): Promise<any> => {
    return api.get(`/books/getduebooks`);
};
const getDueBookForUser = (): Promise<any> => {
    const params = {
        user_id: localStorage.getItem('user_id')
    }
    return api.get(`/books/getduebooksforuser`, { params });
};
const getBookCategories = (): Promise<any> => {
    return api.get(`/books/getbookcategories`);
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
    duplicateBook,
    getEBook,
    editBook,
    editEBook,
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
