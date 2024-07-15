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
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { ImCross } from "react-icons/im";

const PhysicalBooks: FC = () => {
    const navigate = useNavigate();
    const [books, setBookData] = useState<Array<ILibraryBook>>([]);

    let [margin, setMargin] = useState<string>('-23%');
    let [namefilter, setNameFilter] = useState<string>('');
    let [authorfilter, setAuthorFilter] = useState<string>('');
    let [subjectfilter, setSubjectFilter] = useState<string>('');
    let [inumfilter, setINumFilter] = useState<string>('');

    useEffect(() => {
        setMargin('-23%');
        if (window.innerWidth < 940) setMargin('0%');
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
    const deleteBook = async (id: number, name: string) => {
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
    const editBook = async (id: number) => {
        localStorage.setItem('editingbookid', id + '');
        navigate(`/editlibrarybook`);
    }
    const transferBook = async (id: number, name:string) => {
        localStorage.setItem('transferringbookid', id + '');
        localStorage.setItem('transferringBookName', name + '');
        navigate(`/transferlibrarybook`);
    }
    const clearFilter = async (id:number) => {
        switch(id){
            case 1: {
                (document.getElementById("bookNameFilter") as HTMLInputElement).value='';
                setNameFilter('');
            }
            break;
            case 2: {
                (document.getElementById("bookAuthorFilter") as HTMLInputElement).value='';
                setAuthorFilter('');
            }
            break;
            case 3: {
                (document.getElementById("bookSubjectFilter") as HTMLInputElement).value='';
                setSubjectFilter('');
            }
            break;
            case 4: {
                (document.getElementById("bookInvNumFilter") as HTMLInputElement).value='';
                setINumFilter('');
            }
            break;
        }
        
    }
    const booklist = books.map((element) => {
        let clearedname = '';
        let clearedauthor = '';
        let clearedsubject = '';
        let clearedinum = '';
        if(element.NameRuBook!=null)clearedname = element.NameRuBook;
        if(element.Author!=null)clearedauthor = element.Author;
        if(element.Subject!=null)clearedsubject = element.Subject;
        if(element.InventoryNumber!=null)clearedinum= element.InventoryNumber;
        if(clearedname.toLowerCase().includes(namefilter.toLowerCase())
        && clearedauthor.toLowerCase().includes(authorfilter.toLowerCase())
        && clearedsubject.toLowerCase().includes(subjectfilter.toLowerCase())
        && clearedinum.toLowerCase().includes(inumfilter.toLowerCase())){
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
        }
    });
    // const booklist = books.map((element) =>
    //     ((element.NameRuBook == null ? false:element.NameRuBook.toLowerCase().includes(namefilter.toLowerCase())) 
    //     ? (element.Subject == null ? false: element.Subject.toLowerCase().includes(subjectfilter.toLowerCase())) 
    //     ? (element.InventoryNumber == null ? false:element.InventoryNumber.toLowerCase().includes(inumfilter.toLowerCase())) 
    //     ? (element.Author == null ? false:element.Author.toLowerCase().includes(authorfilter.toLowerCase()))
    //     ? <tr key={element.id}>
    //         <td id="table-divider-stats">{element.NameRuBook}</td>
    //         <td id="table-divider-stats">{element.Author}</td>
    //         <td id="table-divider-stats">{element.Annotation}</td>
    //         <td id="table-divider-stats">{element.Subject}</td>
    //         <td id="table-divider-stats">{element.InventoryNumber}</td>
    //         <td id="table-divider-stats">{element.KeyWords}</td>
    //         <td id="table-divider-stats">{element.Language == 'kaz' ? <div>Казахский</div> : element.Language == 'rus' ? <div>Русский</div> : element.Language == 'eng' ? <div>Английский</div> : ''}</td>
    //         <td id="table-divider-stats">{element.Pages}</td>
    //         <td id="table-divider-stats">{element.TypeOfBook}</td>
    //         <td id="table-divider-stats">{element.bookcat}</td>       
    //         <td id="table-divider-stats">{element.PublishedCountryCity}</td>
    //         <td id="table-divider-stats">{element.PublishedTime}</td>
    //         <td id="table-divider-stats">{element.PublishingHouse}</td>
    //         <td id="table-divider-stats">{element.ISBN}</td>      
    //         <td id="table-divider-stats" style={{ whiteSpace: 'nowrap' }}><button className="greenbutton" onClick={() => transferBook(element.id)}><GrDocumentTransfer /></button>&nbsp;<button className="backbutton" onClick={() => editBook(element.id)}><FaPen /></button>&nbsp;<button className="redbutton" onClick={() => deleteBook(element.id, element.NameRuBook)}><FaTrashAlt /></button></td>
    //     </tr>:<tr></tr>:<tr></tr>:<tr></tr>:<tr></tr>)
    // );

    return (
        <div>
            {(() => {
                //const role = localStorage.getItem('role');
                //const user = JSON.parse(localStorage.getItem('data'));

                return <div style={{ textAlign: 'left', width: '900px', marginTop: '10%' }}>
                    <KPINavbar />
                    <br /><br /><br />
                    {/* <h3>Добро пожаловать, {user.lastname + ' ' + user.name + ' ' + user.middlename}</h3><br /> */}
                    <Link to={"/"}><button style={{ marginLeft: margin }} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
                    <br />
                    <h2 style={{ marginLeft: margin }}>Список книг</h2>
                    <br />
                    <Link to={"/addlibrarybook"}><button style={{ marginLeft: margin }} className='navbarbutton'>Добавить новую книгу</button></Link> <br /><br />

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
                            <tr>
                                <th><div className='btn' style={{whiteSpace:'nowrap', backgroundColor:'lightgrey', color:'black'}}><FaMagnifyingGlass />&nbsp;&nbsp;<input type="text" id="bookNameFilter" style={{backgroundColor:'lightgrey', color:'black'}} onChange={() => setNameFilter((document.getElementById("bookNameFilter") as HTMLInputElement).value)}></input>{namefilter.length>0?<b onClick={()=>clearFilter(1)} style={{ fontSize:'10pt', fontWeight:'bold', marginLeft:'-16px', marginTop:'-5px'}}><ImCross /></b>:''}</div></th>
                                <th><div className='btn' style={{whiteSpace:'nowrap', backgroundColor:'lightgrey', color:'black'}}><FaMagnifyingGlass />&nbsp;&nbsp;<input type="text" id="bookAuthorFilter" style={{backgroundColor:'lightgrey', color:'black'}} onChange={() => setAuthorFilter((document.getElementById("bookAuthorFilter") as HTMLInputElement).value)}></input>{authorfilter.length>0?<b onClick={()=>clearFilter(2)} style={{ fontSize:'10pt', fontWeight:'bold', marginLeft:'-16px', marginTop:'-5px'}}><ImCross /></b>:''}</div></th>
                                <th></th>
                                <th><div className='btn' style={{whiteSpace:'nowrap', backgroundColor:'lightgrey', color:'black'}}><FaMagnifyingGlass />&nbsp;&nbsp;<input type="text" id="bookSubjectFilter" style={{backgroundColor:'lightgrey', color:'black'}} onChange={() => setSubjectFilter((document.getElementById("bookSubjectFilter") as HTMLInputElement).value)}></input>{subjectfilter.length>0?<b onClick={()=>clearFilter(3)} style={{ fontSize:'10pt', fontWeight:'bold', marginLeft:'-16px', marginTop:'-5px'}}><ImCross /></b>:''}</div></th>
                                <th><div className='btn' style={{whiteSpace:'nowrap', backgroundColor:'lightgrey', color:'black'}}><FaMagnifyingGlass />&nbsp;&nbsp;<input type="text" id="bookInvNumFilter" style={{backgroundColor:'lightgrey', color:'black'}} onChange={() => setINumFilter((document.getElementById("bookInvNumFilter") as HTMLInputElement).value)}></input>{inumfilter.length>0?<b onClick={()=>clearFilter(4)} style={{ fontSize:'10pt', fontWeight:'bold', marginLeft:'-16px', marginTop:'-5px'}}><ImCross /></b>:''}</div></th>
                            
                            </tr>
                            {booklist}
                            <tr>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table> : <h3 style={{ marginLeft: margin }}>Не удалось получить список книг. Обратитесь в 125 кабинет</h3>}
                </div>

            })()}

        </div>
    );
}

export default observer(PhysicalBooks)