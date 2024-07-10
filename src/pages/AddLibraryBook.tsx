import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import BookService from '../services/BookService';

const AddLibraryBook: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>("");
    const [messagecolor, setMessageColor] = useState<string>("red");
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

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
    const addBook = () => {
        const Name = (document.getElementById("inputName") as HTMLInputElement).value;
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
        const Language = (document.getElementById("inputLanguage") as HTMLInputElement).value;
        const Price = (document.getElementById("inputPrice") as HTMLInputElement).value;
        const PublishedCountryCity = (document.getElementById("inputPublishedCountryCity") as HTMLInputElement).value;
        const PublishedTime = (document.getElementById("inputPublishedTime") as HTMLInputElement).value;
        const PublishingHouse = (document.getElementById("inputPublishingHouse") as HTMLInputElement).value;
        const RLibraryCategoryRLibraryBook = (document.getElementById("inputRLibraryCategoryRLibraryBook") as HTMLInputElement).value;
        const TypeOfBook = (document.getElementById("inputTypeOfBook") as HTMLInputElement).value;
        const UDC = (document.getElementById("inputUDC") as HTMLInputElement).value;
        BookService.addBook(Name, Pages, Annotation, Barcode, Subject, CopyrightSigns, Heading, ISBN, InventoryNumber, KeyWords, LLC, Language, Price, PublishedCountryCity, PublishedTime, PublishingHouse, RLibraryCategoryRLibraryBook, TypeOfBook, UDC).then((response) => {
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
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'librarian') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br />
                        <Link to={"/physicalbooks"}><button className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
                        <br />
                        <h3>Добавить новую книгу</h3>
                        <input id="inputName" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Название книги'></input><br />
                        <input id="inputName" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Автор книги'></input><br />
                        <input id="inputPages" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Количество страниц'></input><br />
                        <input id="inputAnnotation" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Аннотация'></input><br />
                        <input id="inputBarcode" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Штрихкод'></input><br />
                        <input id="inputSubject" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Предмет'></input><br />
                        <input id="inputCopyrightSigns" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Авторские права'></input><br />
                        <input id="inputHeading" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Heading'></input><br />
                        <input id="inputISBN" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='ISBN'></input><br />
                        <input id="inputInventoryNumber" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Инвентарный номер'></input><br />
                        <input id="inputKeyWords" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Ключевые слова'></input><br />
                        <input id="inputLLC" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='LLC'></input><br />
                        <input id="inputLanguage" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Язык'></input><br />
                        <input id="inputPrice" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Цена'></input><br />
                        <input id="inputPublishedCountryCity" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Страна, город публикации'></input><br />
                        <input id="inputPublishedTime" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Год публикации'></input><br />
                        <input id="inputPublishingHouse" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Издательство'></input><br />
                        <input id="inputRLibraryCategoryRLibraryBook" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Категория' value="1"></input><br />
                        <input id="inputTypeOfBook" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Тип книги'></input><br />
                        <input id="inputUDC" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='UDC'></input><br /><br />


                        <button className="navbarbutton" onClick={() => addBook()}>Добавить</button><br /><br />
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