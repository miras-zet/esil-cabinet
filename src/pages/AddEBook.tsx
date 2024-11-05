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

const AddEBook: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>("");
    const [ currentFile, setCurrentFile ] = useState<File>();
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
    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
    };

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
        if (lang != 'notchosen' || category != 'notchosen') {
            const Name = (document.getElementById("inputName") as HTMLInputElement).value;
            const Author = (document.getElementById("inputAuthor") as HTMLInputElement).value;
            const Pages = (document.getElementById("inputPages") as HTMLInputElement).value;        
            const ISBN = (document.getElementById("inputISBN") as HTMLInputElement).value; 
            const LLC = (document.getElementById("inputLLC") as HTMLInputElement).value;
            const Language = lang;
            const PublishedCountryCity = (document.getElementById("inputPublishedCountryCity") as HTMLInputElement).value;
            const PublishedTime = (document.getElementById("inputPublishedTime") as HTMLInputElement).value;
            const PublishingHouse = (document.getElementById("inputPublishingHouse") as HTMLInputElement).value;
            const RLibraryCategoryRLibraryBook = category;
            const UDC = (document.getElementById("inputUDC") as HTMLInputElement).value;
            (document.getElementById("mainbutton") as HTMLInputElement).value='Идёт загрузка..';
            BookService.addEBook(currentFile, Name, Author, Pages, ISBN, LLC, Language, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, UDC).then((response) => {
                setMessage(response.data.message);
                if (response.data.message.indexOf('успешно') !== -1) {
                    setMessageColor("#2ecc71");
                    setCurrentFile(undefined);
                } else {
                    setMessageColor("red");
                }
                (document.getElementById("mainbutton") as HTMLInputElement).value='Добавить';
            })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.message) {
                        setMessage(err.response.data.message);
                    } else {
                        setMessage(err);
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
            case 'search': window.location.href=window.location.protocol + '//' + window.location.host +'/ebooksfilter';
            break;
            case 'pages': window.location.href=window.location.protocol + '//' + window.location.host +'/ebooks';
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
                        <h3>Добавить новую электронную книгу</h3>
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
                                <td style={{ paddingTop: '10px' }}>УДК</td>
                                <td><input id="inputUDC" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='УДК'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>ББК</td>
                                <td><input id="inputLLC" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='ББК'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>ISBN</td>
                                <td><input id="inputISBN" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='ISBN'></input></td>
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
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Издательство</td>
                                <td><input id="inputPublishingHouse" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Издательство'></input></td>
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
                                <td style={{ paddingTop: '10px' }}>Количество страниц</td>
                                <td><input id="inputPages" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Количество страниц'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Прикрепить .pdf файл</td>
                                <td style={{ paddingTop: '10px' }}><label className="btnNeutral" style={{ backgroundColor: 'silver', color: 'DimGray' }} >{currentFile ? `Выбран файл:  ${currentFile.name}` : 'Выберите файл...'}<input type="file" hidden onChange={selectFile} style={{ backgroundColor: 'silver', color: 'DimGray' }} />
                                    </label>
                                </td>
                            </tr>
                        </table>
                        <br/>
                        <button className="navbarbutton" id='mainbutton' onClick={addBook} disabled={!currentFile}>Добавить</button><br />
                        <br/><div style={{ color: messagecolor, fontWeight: 'bold' }}>{message}</div>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(AddEBook)