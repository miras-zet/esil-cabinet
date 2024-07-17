import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import BookService from '../services/BookService';
import IBookCategory from '../models/IBookCategory';

const AddLibraryBook: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>("");
    let [category, setCategory] = useState<string>('notchosen');
    let [lang, setLang] = useState<string>('notchosen');
    const [bookCategories, setBookCategories] = useState<Array<IBookCategory>>([]);
    const [messagecolor, setMessageColor] = useState<string>("red");
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        BookService.getBookCategories().then((response) => {
            setBookCategories(response.data);
        });
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
    const listItemsCategory = bookCategories.map((element) =>
        <option key={element.id} value={element.id}>{element.name}</option>
    );
    const addBook = () => {
        if (lang != 'notchosen' && category != 'notchosen') {
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
            BookService.addBook(Name, Author, Pages, Annotation, Barcode, Subject, CopyrightSigns, Heading, ISBN, InventoryNumber, KeyWords, LLC, Language, Price, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, TypeOfBook, UDC).then((response) => {
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
        else {
            alert('Выберите язык и категорию из выпадающего списка');
        }

    }
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
                        <h3>Добавить новую книгу</h3>
                        <table >
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Название</td>
                                <td><input id="inputName" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Название книги'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Автор книги</td>
                                <td><input id="inputAuthor" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Автор книги'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Количество страниц</td>
                                <td><input id="inputPages" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Количество страниц'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Аннотация</td>
                                <td><input id="inputAnnotation" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Аннотация'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Штрихкод</td>
                                <td><input id="inputBarcode" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Штрихкод'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Предмет</td>
                                <td><input id="inputSubject" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Предмет'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Авторские права</td>
                                <td><input id="inputCopyrightSigns" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Авторские права'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Направление</td>
                                <td><input id="inputHeading" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Направление'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>ISBN</td>
                                <td><input id="inputISBN" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='ISBN'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Инвентарный номер</td>
                                <td><input id="inputInventoryNumber" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Инвентарный номер'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Ключевые слова</td>
                                <td><input id="inputKeyWords" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Ключевые слова'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>LLC</td>
                                <td><input id="inputLLC" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='LLC'></input></td>
                            </tr>
                            
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Цена</td>
                                <td><input id="inputPrice" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Цена'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Страна, город публикации&nbsp;&nbsp;&nbsp;</td>
                                <td><input id="inputPublishedCountryCity" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Страна, город публикации'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Год публикации</td>
                                <td><input id="inputPublishedTime" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Год публикации'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Издательство</td>
                                <td><input id="inputPublishingHouse" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Издательство'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Тип книги</td>
                                <td><input id="inputTypeOfBook" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Тип книги'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>UDC</td>
                                <td><input id="inputUDC" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='UDC'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Язык</td>
                                <td><select className='btnNeutral' style={{ width: '340px' }} name="languages" id="lang" onChange={event => setLang(event.target.value)}>
                                    <option value="notchosen">Язык</option>
                                    <option value="kaz">Казахский</option>
                                    <option value="rus">Русский</option>
                                    <option value="eng">Английский</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Категория</td>
                                <td><select className='btnNeutral' style={{ width: '340px' }} name="categories" id="cat" onChange={event => setCategory(event.target.value)}>
                                    <option value="notchosen">Категория</option>
                                    {listItemsCategory}
                                </select></td>
                            </tr>
                        </table>
                        <button className="navbarbutton" onClick={() => addBook()}>Добавить</button><br />
                        <div style={{ color: messagecolor, fontWeight: 'bold' }}>{message}</div>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(AddLibraryBook)