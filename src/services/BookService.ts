import http from "../http-common";

const getAllBooks = (): Promise<any> => {
    return http.get(`/books/allbooks`);
};
const addBook = (Name, Pages, Annotation, Barcode, Subject, CopyrightSigns, Heading, ISBN, InventoryNumber, KeyWords, LLC, Language, Price, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, TypeOfBook, UDC): Promise<any> => {
    const params = {
        Name: Name,
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


const BookService = {
    getAllBooks,
    addBook,
    deleteBook,
    getDueBooks,
    resolveBookTransfer
};

export default BookService;
