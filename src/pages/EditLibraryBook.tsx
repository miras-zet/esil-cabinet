import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import BookService from '../services/BookService';
import ILibraryBook from '../models/ILibraryBook';

const EditLibraryBook: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>('');
    let [category, setCategory] = useState<string>('notchosen');
    let [lang, setLang] = useState<string>('notchosen');
    const [bookData, setBookData] = useState<ILibraryBook>();
    const [messagecolor, setMessageColor] = useState<string>("red");
    const loadvalues = () => {
        switch (bookData?.Language) {
            case 'kaz': setLang('kaz');
                break;
            case 'rus': setLang('rus');
                break;
            case 'eng': setLang('eng');
                break;
            default: setLang('notchosen');
        }
        setCategory(bookData?.RLibraryCategoryRLibraryBook + '');
        (document.getElementById("inputName") as HTMLInputElement).value = bookData?.NameRuBook;
        (document.getElementById("inputAuthor") as HTMLInputElement).value = bookData?.Author;
        (document.getElementById("inputPages") as HTMLInputElement).value = bookData?.Pages;
        (document.getElementById("inputAnnotation") as HTMLInputElement).value = bookData?.Annotation;
        (document.getElementById("inputBarcode") as HTMLInputElement).value = bookData?.Barcode;
        (document.getElementById("inputSubject") as HTMLInputElement).value = bookData?.Subject;
        (document.getElementById("inputCopyrightSigns") as HTMLInputElement).value = bookData?.CopyrightSigns;
        (document.getElementById("inputHeading") as HTMLInputElement).value = bookData?.Heading;
        (document.getElementById("inputISBN") as HTMLInputElement).value = bookData?.ISBN;
        (document.getElementById("inputInventoryNumber") as HTMLInputElement).value = bookData?.InventoryNumber;
        (document.getElementById("inputKeyWords") as HTMLInputElement).value = bookData?.KeyWords;
        (document.getElementById("inputLLC") as HTMLInputElement).value = bookData?.LLC;
        (document.getElementById("inputPrice") as HTMLInputElement).value = bookData?.Price;
        (document.getElementById("inputPublishedCountryCity") as HTMLInputElement).value = bookData?.PublishedCountryCity;
        (document.getElementById("inputPublishedTime") as HTMLInputElement).value = bookData?.PublishedTime;
        (document.getElementById("inputPublishingHouse") as HTMLInputElement).value = bookData?.PublishingHouse;
        (document.getElementById("inputTypeOfBook") as HTMLInputElement).value = bookData?.TypeOfBook;
        (document.getElementById("inputUDC") as HTMLInputElement).value = bookData?.UDC;
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        BookService.getBook(localStorage.getItem('editingbookid')).then((response) => {
            setBookData(response.data);
        });
        setTimeout(function () {
            document.getElementById('toClick').click();
            console.log('clicked');
          }, 400)
    }, [])

    // useEffect(()=>{
    // setModal(modals)
    // },[])

    if (store.isLoading) {
        return <div>Loading ...</div>
    }


    if (!store.isAuth) {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
    // const listItemsCategory = bookCategories.map((element) =>
    //     <option key={element.id} value={element.id}>{element.name}</option>
    // );
    const goBack = () =>{
        let prevpage = localStorage.getItem('prevLibrarianPage');
        switch(prevpage){
            case 'search': window.location.href=window.location.protocol + '//' + window.location.host +'/searchbookbyname';
            break;
            case 'pages': window.location.href=window.location.protocol + '//' + window.location.host +'/physicalbooksPages';
            break;
            default: window.location.href=window.location.protocol + '//' + window.location.host +'/';
        }
    }
    const saveBook = () => {
        if (lang != 'notchosen' && category != 'notchosen') {
            if (confirm('Вы уверены, что хотите сохранить изменения?')) {
                const id = localStorage.getItem('editingbookid');
                const Name = (document.getElementById("inputName") as HTMLInputElement).value;
                const Author = (document.getElementById("inputAuthor") as HTMLInputElement).value;
                const Pages = (document.getElementById("inputPages") as HTMLInputElement).value;
                const Annotation = (document.getElementById("inputAnnotation") as HTMLInputElement).value;
                const Barcode = (document.getElementById("inputBarcode") as HTMLInputElement).value;
                const Subject = (document.getElementById("inputSubject") as HTMLInputElement).value;
                const CopyrightSigns = (document.getElementById("inputCopyrightSigns") as HTMLInputElement).value;
                const Heading = (document.getElementById("inputHeading") as HTMLInputElement).value;
                const ISBN = (document.getElementById("inputISBN") as HTMLInputElement).value;
                const InventoryNumber = (document.getElementById("inputInventoryNumber") as HTMLInputElement).value;
                const KeyWords = (document.getElementById("inputKeyWords") as HTMLInputElement).value;
                const LLC = (document.getElementById("inputLLC") as HTMLInputElement).value;
                const Language = lang;
                const Price = (document.getElementById("inputPrice") as HTMLInputElement).value;
                const PublishedCountryCity = (document.getElementById("inputPublishedCountryCity") as HTMLInputElement).value;
                const PublishedTime = (document.getElementById("inputPublishedTime") as HTMLInputElement).value;
                const PublishingHouse = (document.getElementById("inputPublishingHouse") as HTMLInputElement).value;
                const RLibraryCategoryRLibraryBook = category;
                const TypeOfBook = (document.getElementById("inputTypeOfBook") as HTMLInputElement).value;
                const UDC = (document.getElementById("inputUDC") as HTMLInputElement).value;
                BookService.editBook(id, Name, Author, Pages, Annotation, Barcode, Subject, CopyrightSigns, Heading, ISBN, InventoryNumber, KeyWords, LLC, Language, Price, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, TypeOfBook, UDC).then((response) => {
                    setMessage(response.data.message);
                    if (response.data.message.indexOf('успешно') !== -1) {
                        setMessageColor("#2ecc71");
                    } else {
                        setMessageColor("red");
                    }
                })
                    .catch((err) => {
                        if (err.response && err.response.data && err.response.data.message) {
                            setMessage(err.response.data.message);
                        } else {
                            setMessage("Ошибка");
                        }
                    });
            }
        }
        else {
            alert('Выберите язык и категорию из выпадающего списка');
        }

    }
    const inputValues = [
        ['Name', 'Название', bookData?.NameRuBook],
        ['Author', 'Автор', bookData?.Author],
        ['Pages', 'Кол-во страниц', bookData?.Pages],
        ['Annotation', 'Аннотация', bookData?.Annotation],
        ['Barcode', 'Штрихкод', bookData?.Barcode],
        ['Subject', 'Предмет', bookData?.Subject],
        ['CopyrightSigns', 'Авторские права', bookData?.CopyrightSigns],
        ['Heading', 'Направление', bookData?.Heading],
        ['ISBN', 'ISBN', bookData?.ISBN],
        ['InventoryNumber', 'Инвентарный номер', bookData?.InventoryNumber],
        ['KeyWords', 'Ключевые слова', bookData?.KeyWords],
        ['LLC', 'LLC', bookData?.LLC],
        ['Price', 'Цена', bookData?.Price],
        ['PublishedCountryCity', 'Страна, город публикации', bookData?.PublishedCountryCity],
        ['PublishedTime', 'Год публикации', bookData?.PublishedTime],
        ['PublishingHouse', 'Издательство', bookData?.PublishingHouse],
        ['TypeOfBook', 'Тип книги', bookData?.TypeOfBook],
        ['UDC', 'UDC', bookData?.UDC]
    ];
    const inputMap = inputValues.map((element) => {
        const [a, b] = element;
        return <tr key={a}>
            <td style={{ paddingTop: '10px' }}>{b}</td>
            <td><input id={'input' + a} className='btnNeutral' style={{ width: '300px' }} type="text" placeholder={b + ''}></input></td>
        </tr>
    }
    );
    
    
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'librarian') {

                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br />
                        <button onClick={()=>goBack()}className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button><br /><br />
                        <br />
                        <h3>Редактировать книгу "{bookData?.NameRuBook}"</h3>
                        <button id='toClick' style={{visibility:'hidden'}} onLoad={()=>alert('a')} onClick={() => loadvalues()}>загрузить</button>
                        <table><tbody>
                            {inputMap}
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Язык</td>
                                <td><select className='btnNeutral' style={{ width: '340px' }} name="languages" id="lang" onChange={event => setLang(event.target.value)}>
                                    <option value="notchosen">Язык</option>
                                    {bookData?.Language == 'kaz' ? <option value="kaz" selected>Казахский</option> : <option value="kaz">Казахский</option>}
                                    {bookData?.Language == 'rus' ? <option value="rus" selected>Русский</option> : <option value="rus">Русский</option>}
                                    {bookData?.Language == 'eng' ? <option value="eng" selected>Английский</option> : <option value="eng">Английский</option>}
                                </select></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Категория</td>
                                <td><select className='btnNeutral' style={{ width: '340px' }} name="categories" id="cat" onChange={event => setCategory(event.target.value)}>
                                    <option value="notchosen">Категория</option>
                                    {bookData?.RLibraryCategoryRLibraryBook == 1 ? <option value="1" selected>Книги</option>:<option value="1" >Книги</option>}
                                    {bookData?.RLibraryCategoryRLibraryBook == 2 ? <option value="2" selected>Статьи</option>:<option value="2" >Статьи</option>}
                                    {bookData?.RLibraryCategoryRLibraryBook == 7 ? <option value="7" selected>Авторефераты</option>:<option value="7" >Авторефераты</option>}
                                    {bookData?.RLibraryCategoryRLibraryBook == 8 ? <option value="8" selected>Электронная база</option>:<option value="8" >Электронная база</option>}
                                    {bookData?.RLibraryCategoryRLibraryBook == 23 ? <option value="23" selected>Аудит</option>:<option value="23" >Аудит</option>}
                                </select></td>
                            </tr>
                        </tbody>
                        </table>
                        
                        <button className="navbarbutton" onClick={() => saveBook()}>Сохранить</button><br />
                        <div style={{ color: messagecolor, fontWeight: 'bold' }}>{message}</div>
                    </div>

                }
                else {
                    return <Navigate to="/" />
                }
            }

            )()}

        </div>
    );
}

export default observer(EditLibraryBook)