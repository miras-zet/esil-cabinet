import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import BookService from '../services/BookService';
import ILibraryBook from '../models/ILibraryBook';
import { Link, Navigate } from 'react-router-dom';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';

const PhysicalBooks: FC = () => {
    // const navigate = useNavigate();
    const [books, setBookData] = useState<Array<ILibraryBook>>([]);
    let [margin, setMargin] = useState<string>('-23%');
    useEffect(() => {
        setMargin('-23%');
        if(window.innerWidth<940) setMargin('0%');
        // const user = JSON.parse(localStorage.getItem('data'));
        BookService.getAllBooks().then((response) => {
            setBookData(response.data);
        }).catch((err) => {
            console.log(err);
            setBookData([]);
        });

    }, [])
    // useEffect(()=>{
    //   setModal(modals)
    // },[])
    //alert(date);
    //const d = new Date();
    //let current_year = d.getFullYear();
    const deleteBook = async (id: number, name:string) => {
        if (confirm(`Вы уверены, что хотите удалить книгу "${name}"?`)) {
          BookService.deleteBook(id)
            .then(() => {
              return BookService.getAllBooks();
            })
            .then((books) => {
                setBookData(books.data);
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
    const editBook = async (id:number) =>{
        localStorage.setItem('editingbookid',id+'');
        <Navigate to='/editbook'/>;
    }
    const booklist = books.map((element) =>
        <tr key={element.id}>
            <td id="table-divider-stats">{element.NameRuBook}</td>
            <td id="table-divider-stats">{element.Author}</td>
            <td id="table-divider-stats">{element.InventoryNumber}</td>
            <td id="table-divider-stats">{element.KeyWords}</td>
            <td id="table-divider-stats">{element.Language=='kaz'? <div>Казахский</div>:element.Language=='rus'? <div>Русский</div>:element.Language=='eng'? <div>Английский</div>:''}</td>
            <td id="table-divider-stats">{element.Pages}</td>
            <td id="table-divider-stats">{element.TypeOfBook}</td>
            <td id="table-divider-stats">{element.Subject}</td>
            <td id="table-divider-stats">{element.PublishedCountryCity}</td>
            <td id="table-divider-stats">{element.PublishedTime}</td>
            <td id="table-divider-stats">{element.PublishingHouse}</td>
            <td id="table-divider-stats">{element.ISBN}</td>
            <td id="table-divider-stats">{element.Annotation}</td>
            <td id="table-divider-stats" style={{whiteSpace:'nowrap'}}><button className="greenbutton" onClick={() => editBook(element.id)}><FaPen /></button>&nbsp;<button className="redbutton" onClick={() => deleteBook(element.id, element.NameRuBook)}><FaTrashAlt /></button></td>
        </tr>
    );
    
    return (
        <div>
            {(() => {
                //const role = localStorage.getItem('role');
                //const user = JSON.parse(localStorage.getItem('data'));
                
                    return <div style={{ textAlign: 'left', width: '900px', marginTop: '10%' }}>
                        <KPINavbar />
                        <br /><br /><br />
                        {/* <h3>Добро пожаловать, {user.lastname + ' ' + user.name + ' ' + user.middlename}</h3><br /> */}
                        <Link to={"/"}><button style={{ marginLeft: margin}} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
                        <br />
                        <h2 style={{ marginLeft: margin}}>Список книг</h2>
                        <br/>
                        <Link to={"/addlibrarybook"}><button style={{ marginLeft: margin}} className='navbarbutton'>Добавить новую книгу</button></Link> <br /><br />

                        {books.length>0?<table id='opaqueTable' style={{ fontSize:'12pt', marginLeft: '-30%', paddingLeft: '15px', width: '107%' }}>
                            <tbody>
                                <tr><br/></tr>
                                <tr>
                                <th id="table-divider-stats-header"><br />&nbsp;Название книги<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Автор<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Инвентарный номер<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Ключевые слова<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Язык<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Кол-во страниц<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Тип книги<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Предмет<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Страна публикации<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Год публикации<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Издательство<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;ISBN<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Аннотация<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Действия<br />&nbsp;</th>
                                <th>&nbsp;&nbsp;</th>
                            </tr>
                            
                            {booklist}
                            <tr>
                                <td><br/></td>
                            </tr>
                            </tbody>
                        </table>:<h3 style={{marginLeft: margin}}>Не удалось получить список книг. Обратитесь в 125 кабинет</h3>}
                    </div>   
                
            })()}

        </div>
    );
}

export default observer(PhysicalBooks)