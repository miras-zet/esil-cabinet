import http from "../http-common";

const getAllBooks = (): Promise<any> => {
    return http.get(`/books/allbooks`);
};
const getBook = (id): Promise<any> => {
    const params = {
        id: id,
    }
    return http.get(`/books/getbook`, { params });
};
const addBook = (Name, Author, Pages, Annotation, Barcode, Subject, CopyrightSigns, Heading, ISBN, InventoryNumber, KeyWords, LLC, Language, Price, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, TypeOfBook, UDC): Promise<any> => {
    const params = {
        Name: Name,
        Author: Author,
        Pages: Pages,
        Annotation: Annotation,
        Barcode: Barcode,
        Subject: Subject,
        CopyrightSigns: CopyrightSigns,
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
const editBook = (id, Name, Author, Pages, Annotation, Barcode, Subject, CopyrightSigns, Heading, ISBN, InventoryNumber, KeyWords, LLC, Language, Price, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, TypeOfBook, UDC): Promise<any> => {
    const params = {
        id: id,
        Name: Name,
        Author: Author,
        Pages: Pages,
        Annotation: Annotation,
        Barcode: Barcode,
        Subject: Subject,
        CopyrightSigns: CopyrightSigns,
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
const transferBook = (iin,bookid): Promise<any> => {
    const params = {
        iin: iin, 
        bookid: bookid
    }
    return http.get(`/books/transferbook`, { params });
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
const getBookCategories = (): Promise<any> => {
    return http.get(`/books/getbookcategories`);
};

const BookService = {
    getAllBooks,
    getBook,
    editBook,
    getBookCategories,
    addBook,
    transferBook,
    deleteBook,
    getDueBooks,
    resolveBookTransfer
};

export default BookService;
