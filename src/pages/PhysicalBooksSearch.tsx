import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import BookService from '../services/BookService';
import ILibraryBook from '../models/ILibraryBook';
import { Link, useNavigate } from 'react-router-dom';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { GrDocumentTransfer } from "react-icons/gr";

const PhysicalBooksSearch: FC = () => {
    const navigate = useNavigate();
    const [books, setBookData] = useState<Array<ILibraryBook>>([]);
    let [margin] = useState<string>('-23%');
    let [specificLabel, setLabel] = useState<string>('')
    const searchType = localStorage.getItem('searchType');
    useEffect(() => {  
        // const user = JSON.parse(localStorage.getItem('data'));
        switch(searchType){
            case 'name':BookService.getBooksByName().then((response) => {
                setBookData(response.data);
                setLabel('в названии');
            }).catch((err) => {
                console.log(err);
                setBookData([]);
            });
            break;
            case 'isbn':BookService.getBooksByISBN().then((response) => {
                setBookData(response.data);
                setLabel('в ISBN');
            }).catch((err) => {
                console.log(err);
                setBookData([]);
            });
            break;
            case 'keywords':BookService.getBooksByKeyWords().then((response) => {
                setBookData(response.data);
                setLabel('в ключевых словах');
            }).catch((err) => {
                console.log(err);
                setBookData([]);
            });
            break;
            case 'inventory':BookService.getBooksByInventory().then((response) => {
                setBookData(response.data);
                setLabel('в инвентарном номере');
            }).catch((err) => {
                console.log(err);
                setBookData([]);
            });
            break;
            default: setBookData([]);
        }
        
    }, [])
    //alert(date);
    //const d = new Date();
    //let current_year = d.getFullYear();
    const deleteBook = async (id: number, name: string) => {
        if (confirm(`Вы уверены, что хотите удалить книгу "${name}"?`)) {
            BookService.deleteBook(id)
                .then(() => {
                    location.reload();
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
    const editBook = async (id: number) => {
        localStorage.setItem('editingbookid', id + '');
        localStorage.setItem('prevLibrarianPage','search');
        navigate(`/editlibrarybook`);
    }
    const transferBook = async (id: number, name:string) => {
        localStorage.setItem('transferringbookid', id + '');
        localStorage.setItem('transferringBookName', name + '');
        localStorage.setItem('prevLibrarianPage','search');
        navigate(`/transferlibrarybook`);
    }
    
    const booklist = books.map((element) => {
            return <tr key={element.id}>
            <td id="table-divider-stats">{element.NameRuBook}</td>
            <td id="table-divider-stats">{element.Author}</td>
            <td id="table-divider-stats">{element.Annotation}</td>
            <td id="table-divider-stats">{element.Subject}</td>
            <td id="table-divider-stats">{element.InventoryNumber}</td>
            <td id="table-divider-stats">{element.KeyWords}</td>
            <td id="table-divider-stats">{element.Language == 'kaz' ? <div>Казахский</div> : element.Language == 'rus' ? <div>Русский</div> : element.Language == 'eng' ? <div>Английский</div> : ''}</td>
            <td id="table-divider-stats">{element.Pages}</td>
            <td id="table-divider-stats">{element.TypeOfBook}</td>
            <td id="table-divider-stats">{element.bookcat}</td>       
            <td id="table-divider-stats">{element.PublishedCountryCity}</td>
            <td id="table-divider-stats">{element.PublishedTime}</td>
            <td id="table-divider-stats">{element.PublishingHouse}</td>
            <td id="table-divider-stats">{element.ISBN}</td>      
            <td id="table-divider-stats" style={{ whiteSpace: 'nowrap' }}><button className="greenbutton" onClick={() => transferBook(element.id, element.NameRuBook)}><GrDocumentTransfer /></button>&nbsp;<button className="backbutton" onClick={() => editBook(element.id)}><FaPen /></button>&nbsp;<button className="redbutton" onClick={() => deleteBook(element.id, element.NameRuBook)}><FaTrashAlt /></button></td>
        </tr>
    });
    
    return (
        <div>
            {(() => {
                //const role = localStorage.getItem('role');
                //const user = JSON.parse(localStorage.getItem('data'));

                return <div style={{ textAlign: 'left', width: '900px', marginTop: '10%' }}>
                    <KPINavbar />
                    <br /><br /><br />
                    <Link to={"/"}><button style={{ marginLeft: margin }} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
                    <br />
                    <h3 style={{ marginLeft: margin }}>Список книг по совпадениям "{localStorage.getItem('bookSearch')}" {specificLabel}</h3>
                    <h5 style={{ marginLeft: margin }}>Максимальное количество результатов - 1000</h5><br/>
                    {books.length > 0 ? <table id='opaqueTable' style={{ fontSize: '10.5pt', marginLeft: '-30%', paddingLeft: '15px', maxWidth: '107%', tableLayout:'fixed'}}>
                        <tbody>
                            <tr><br/></tr>
                            <tr>
                                <th id="table-divider-stats-header" style={{minWidth:'120px'}}><br/>&nbsp;Название<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'80px'}}><br />&nbsp;Автор<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'140px'}}><br/>&nbsp;Аннотация<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'80px'}}><br />&nbsp;Предмет<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'50px'}}><br />&nbsp;Инвентарный номер<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'80px'}}><br />&nbsp;Ключевые слова<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'60px'}}><br />&nbsp;Язык<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'40px'}}><br />&nbsp;Кол-во страниц<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'60px'}}><br />&nbsp;Тип книги<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'60px'}}><br />&nbsp;Категория<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'110px'}}><br/>&nbsp;Страна публикации<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'50px'}}><br />&nbsp;Год публикации<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'70px'}}><br />&nbsp;Издательство<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'90px'}}><br />&nbsp;ISBN<br />&nbsp;</th>
                                <th id="table-divider-stats-header" style={{minWidth:'180px'}}><br/>&nbsp;Действия<br />&nbsp;</th>
                                <th>&nbsp;&nbsp;</th>

                            </tr>
                            {booklist}
                            <tr>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table> : <h3 style={{ marginLeft: margin }}>Не найдены книги по запросу</h3>}
                    <br/>
                </div>

            })()}

        </div>
    );
}

export default observer(PhysicalBooksSearch)