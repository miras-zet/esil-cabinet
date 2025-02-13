import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import BookService from '../services/BookService';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import IBookTransfer from '../models/IBookTransfer';
import moment from 'moment';
import { ImCross } from 'react-icons/im';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import ILibraryStats from '../models/ILibraryStats';

const DueBooks: FC = () => {
    const [dueData, setDueData] = useState<Array<IBookTransfer>>([]);
    const [libraryStats, setLibraryStats] = useState<Array<ILibraryStats>>([]);
    let [fiofilter, setFioFilter] = useState<string>('');
    let [booknamefilter, setBookNameFilter] = useState<string>('');
    let [bookbarcodefilter, setBookBarcodeFilter] = useState<string>('');

    useEffect(() => {
        BookService.getLibraryStats(new Date().getFullYear()).then((response) => {
            setLibraryStats(response.data);
        }).catch((err) => {
            console.log(err);
            setLibraryStats([]);
        });
        BookService.getDueBooks().then((response) => {
            setDueData(response.data);
        }).catch((err) => {
            console.log(err);
            setDueData([]);
        });

    }, [])
    const clearFilter = async (id: number) => {
        switch (id) {
            case 1: {
                (document.getElementById("fioFilter") as HTMLInputElement).value = '';
                setFioFilter('');
            }
                break;
            case 2: {
                (document.getElementById("bookNameFilter") as HTMLInputElement).value = '';
                setBookNameFilter('');
            }
                break;
            case 3: {
                (document.getElementById("bookBarcodeFilter") as HTMLInputElement).value = '';
                setBookBarcodeFilter('');
            }
                break;
        }
    }
    //alert(date);
    //const d = new Date();
    //let current_year = d.getFullYear();
    const deleteBook = async (id: number, name: string) => {
        if (confirm(`Вы уверены, что хотите вернуть книгу от пользователя ${name}?`)) {
            BookService.resolveBookTransfer(id)
                .then(() => {
                    return BookService.getDueBooks();
                })
                .then((due) => {
                    setDueData(due.data);
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.message) {
                        alert(err.response.data.message);
                    } else {
                        alert("Ошибка удаления");
                    }
                });
        }
    };
    const notifydebtor = (userid,bookname,fio) =>{
        if (confirm(`Вы уверены, что хотите уведомить пользователя о необходимости возвращения этой книги?`)) {
            BookService.notifyDebtor(userid,bookname)
                .then(() => {
                    return BookService.getDueBooks();
                })
                .then((due) => {
                    setDueData(due.data);
                    alert(`Пользователю ${fio} отправлено уведомление`);
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.message) {
                        alert(err.response.data.message);
                    } else {
                        alert("Ошибка удаления");
                    }
                });
                
        }
    };
    const convert = (role) =>{
        switch(role){
            case 'plt_tutor': return 'Преподаватель'; 
            case 'plt_student': return 'Студент'; 
            case 'plt_graduate': return 'Выпускник'; 
            case 'plt_employee': return 'Сотрудник'; 
            default: return '';
        }
    }
    const booklist = dueData.map((element) => {
        let clearedfio = '';
        let clearedbookname = '';
        let clearedbarcode = '';
        if (element.fio != null) clearedfio = element.fio;
        if (element.bookname != null) clearedbookname = element.bookname;
        if (element.barcode != null) clearedbarcode = element.barcode;
        if (clearedfio.toLowerCase().includes(fiofilter.toLowerCase())
            && clearedbookname.toLowerCase().includes(booknamefilter.toLowerCase())
            && clearedbarcode.toLowerCase().includes(bookbarcodefilter.toLowerCase())) return <tr key={element.id}>
                <td id="table-divider-stats">{element.fio}</td>
                <td id="table-divider-stats">{element.bookname}</td>
                <td id="table-divider-stats">{element.barcode}</td>
                <td id="table-divider-stats">{convert(element.role)}</td> 
                <td id="table-divider-stats">{element.DateCreated!='2024-08-31T18:59:00.000Z'? moment(element.DateCreated).format("DD.MM.YYYY HH:mm"):'e-university'}</td>
                <td id="table-divider-stats" style={{whiteSpace:'nowrap'}}>
                    <button className="redbutton" onClick={() => deleteBook(element.id, element.fio)}><FaTrashAlt /></button>
                    &nbsp;<button style={{backgroundColor:'#e8b641',color:'white'}} onClick={() => notifydebtor(element.userid, element.bookname, element.fio)}><IoIosMail  /></button>
                </td>
            </tr>
    }

    ); 
    const currentYear = new Date().getMonth() < 9 ? new Date().getFullYear()-1 : new Date().getFullYear()
    const libraryStatsMini = libraryStats.map((element) =>
        <div key={element.booksonhand}>
            <h3>Статистика на {currentYear}-{currentYear+1} год обучения</h3>
           <p>Выдано книг: {element.booksgiven}</p>
           <p>Возвращено книг: {element.booksreturned}</p>
           <p>Книги "на руках": {element.booksonhand}</p>
           <p>Количество уникальных пользователей: {element.unique_users_this_year}</p>
        </div>
    );

    return (
        <div>
            {(() => {
                //const role = localStorage.getItem('role');
                //const user = JSON.parse(localStorage.getItem('data'));

                return <div style={{ textAlign: 'left', width: '1200px', marginTop: '10%' }}>
                    <KPINavbar />
                    <br /><br /><br />
                    {/* <h3>Добро пожаловать, {user.lastname + ' ' + user.name + ' ' + user.middlename}</h3><br /> */}
                    <Link to={"/"}><button className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
                    <br />
                    <h2>Список должников по книгам</h2>
                    <br />
                    <div id="table-divider-stats-header" style={{ marginLeft: '0px', textAlign: 'left', paddingLeft: '4%', height: '100%', width: '40%' }}><br />{libraryStatsMini}<br /></div>
                    <br />
                    {dueData.length > 0 ? <table id='opaqueTable' style={{ fontSize: '12pt', paddingLeft: '15px', width: '105%' }}>
                        <tbody>
                            <tr><br /></tr>
                            <tr>
                                <th id="table-divider-stats-header"><br />&nbsp;ФИО<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Название книги<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Штрихкод<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Роль<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Дата выдачи<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Действия<br />&nbsp;</th>
                                <th>&nbsp;&nbsp;</th>
                            </tr>
                            <tr>
                                <th><div className='btn' style={{ paddingLeft: '5%', whiteSpace: 'nowrap', backgroundColor: 'lightgrey', color: 'black' }}><FaMagnifyingGlass />&nbsp;&nbsp;<input type="text" id="fioFilter" style={{ backgroundColor: 'lightgrey', color: 'black' }} onChange={() => setFioFilter((document.getElementById("fioFilter") as HTMLInputElement).value)}></input>{fiofilter.length > 0 ? <b onClick={() => clearFilter(1)} style={{ fontSize: '10pt', fontWeight: 'bold', marginLeft: '-16px', marginTop: '-5px' }}><ImCross /></b> : ''}</div></th>
                                <th><div className='btn' style={{ paddingLeft: '5%', whiteSpace: 'nowrap', backgroundColor: 'lightgrey', color: 'black' }}><FaMagnifyingGlass />&nbsp;&nbsp;<input type="text" id="bookNameFilter" style={{ backgroundColor: 'lightgrey', color: 'black' }} onChange={() => setBookNameFilter((document.getElementById("bookNameFilter") as HTMLInputElement).value)}></input>{booknamefilter.length > 0 ? <b onClick={() => clearFilter(2)} style={{ fontSize: '10pt', fontWeight: 'bold', marginLeft: '-16px', marginTop: '-5px' }}><ImCross /></b> : ''}</div></th>
                                <th><div className='btn' style={{ paddingLeft: '5%', whiteSpace: 'nowrap', backgroundColor: 'lightgrey', color: 'black' }}><FaMagnifyingGlass />&nbsp;&nbsp;<input type="text" id="bookBarcodeFilter" style={{ backgroundColor: 'lightgrey', color: 'black' }} onChange={() => setBookBarcodeFilter((document.getElementById("bookBarcodeFilter") as HTMLInputElement).value)}></input>{bookbarcodefilter.length > 0 ? <b onClick={() => clearFilter(3)} style={{ fontSize: '10pt', fontWeight: 'bold', marginLeft: '-16px', marginTop: '-5px' }}><ImCross /></b> : ''}</div></th>
                            </tr>
                            {booklist}
                            <tr>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table> : <h3>Должников нет</h3>}
                </div>

            })()}

        </div>
    );
}

export default observer(DueBooks)