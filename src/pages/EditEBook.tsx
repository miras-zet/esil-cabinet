import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import BookService from '../services/BookService';
import IEBook from '../models/IEBook';

const EditEBook: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>('');
    let [category, setCategory] = useState<string>('notchosen');
    let [lang, setLang] = useState<string>('notchosen');
    const [bookData, setBookData] = useState<IEBook>();
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
        (document.getElementById("inputLLC") as HTMLInputElement).value = bookData?.LLC;
        (document.getElementById("inputISBN") as HTMLInputElement).value = bookData?.ISBN;
        (document.getElementById("inputPublishedCountryCity") as HTMLInputElement).value = bookData?.PublishedCountryCity;
        (document.getElementById("inputPublishedTime") as HTMLInputElement).value = bookData?.PublishedTime;
        (document.getElementById("inputPublishingHouse") as HTMLInputElement).value = bookData?.PublishingHouse;
        (document.getElementById("inputUDC") as HTMLInputElement).value = bookData?.UDC;
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        BookService.getEBook(localStorage.getItem('editingebookid')).then((response) => {
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
            case 'search': window.location.href=window.location.protocol + '//' + window.location.host +'/ebooksfilter';
            break;
            case 'pages': window.location.href=window.location.protocol + '//' + window.location.host +'/ebooks';
            break;
            default: window.location.href=window.location.protocol + '//' + window.location.host +'/';
        }
    }
    const saveBook = () => {
        if (lang != 'notchosen' && category != 'notchosen') {
            if (confirm('Вы уверены, что хотите сохранить изменения?')) {
                const id = localStorage.getItem('editingebookid');
                const Name = (document.getElementById("inputName") as HTMLInputElement).value;
                const Author = (document.getElementById("inputAuthor") as HTMLInputElement).value;
                const Pages = (document.getElementById("inputPages") as HTMLInputElement).value;
                const LLC = (document.getElementById("inputLLC") as HTMLInputElement).value;
                const ISBN = (document.getElementById("inputISBN") as HTMLInputElement).value;
                const Language = lang;
                const PublishedCountryCity = (document.getElementById("inputPublishedCountryCity") as HTMLInputElement).value;
                const PublishedTime = (document.getElementById("inputPublishedTime") as HTMLInputElement).value;
                const PublishingHouse = (document.getElementById("inputPublishingHouse") as HTMLInputElement).value;
                const RLibraryCategoryRLibraryBook = category;
                const UDC = (document.getElementById("inputUDC") as HTMLInputElement).value;
                BookService.editEBook(id, Name, Author, Pages, LLC, ISBN, Language, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, UDC).then((response) => {
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
        ['UDC', 'УДК', bookData?.UDC],
        ['LLC', 'ББК', bookData?.LLC],
        ['ISBN', 'ISBN', bookData?.ISBN],
        ['PublishingHouse', 'Издательство', bookData?.PublishingHouse],
        ['PublishedCountryCity', 'Страна, город публикации', bookData?.PublishedCountryCity],
        ['PublishedTime', 'Год публикации', bookData?.PublishedTime],
        ['Pages', 'Кол-во страниц', bookData?.Pages],
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
                                    {bookData?.RLibraryCategoryRLibraryBook == 25 ? <option value="25" selected>Монографии</option>:<option value="25" >Монографии</option>}
                                    {bookData?.RLibraryCategoryRLibraryBook == 26 ? <option value="26" selected>Учебники</option>:<option value="26" >Учебники</option>}
                                    {bookData?.RLibraryCategoryRLibraryBook == 27 ? <option value="27" selected>Учебные пособия</option>:<option value="27" >Учебные пособия</option>}
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

export default observer(EditEBook)