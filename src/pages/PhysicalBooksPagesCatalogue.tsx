import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import BookService from '../services/BookService';
import ILibraryBook from '../models/ILibraryBook';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const PhysicalBooksPages: FC = () => {
    const [books, setBookData] = useState<Array<ILibraryBook>>([]);
    let [bookPageCount, setBookPageCount] = useState<number>(1);
    let [page, setPage] = useState<number>(1);
    let [margin] = useState<string>('-23%');
    const navigate = useNavigate();
    
    useEffect(() => {
        // const handleScroll = () => {
        //     setScrollPosition(window.scrollY);
        // };
        // window.addEventListener('scroll', handleScroll);
        setPage(parseInt(localStorage.getItem('currentPage')));
        if (Number.isNaN(parseInt(localStorage.getItem('currentPage')))) setPage(1);
        BookService.getPhysicalBookPageCount().then((response) => {
            setBookPageCount(response.data);
        }).catch((err) => {
            console.log(err);
        });
        BookService.getBooksPerPage(page).then((response) => {
            setBookData(response.data);
        }).catch((err) => {
            console.log(err);
            setBookData([]);
        });
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };
    }, [])

    //setTotalPages(Math.floor(bookCount[0].count/1000));
    
    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
            localStorage.setItem('currentPage', page - 1 + '');
            location.reload();
        }
    }
    const nextPage = () => {
        if (page < bookPageCount) {
            setPage(page + 1);
            localStorage.setItem('currentPage', page + 1 + '');
            location.reload();
        }
    }
    const firstPage = () => {
        setPage(1);
        localStorage.setItem('currentPage', '1');
        location.reload();
    }
    const lastPage = () => {
        setPage(bookPageCount);
        localStorage.setItem('currentPage', bookPageCount + '');
        location.reload();
    }
    const booklist = books.map((element) => {
        return <tr key={element.id}>
            <td id="table-divider-stats">{element.NameRuBook}</td>
            <td id="table-divider-stats">{element.Author}</td>
            <td id="table-divider-stats">{element.Annotation}</td>
            <td id="table-divider-stats">{element.KeyWords}</td>
            <td id="table-divider-stats">{element.Language == 'kaz' ? <div>Казахский</div> : element.Language == 'rus' ? <div>Русский</div> : element.Language == 'eng' ? <div>Английский</div> : ''}</td>
            <td id="table-divider-stats">{element.Pages}</td>
            <td id="table-divider-stats">{element.TypeOfBook}</td>
            <td id="table-divider-stats">{element.bookcat}</td>
            <td id="table-divider-stats">{element.PublishedCountryCity}</td>
            <td id="table-divider-stats">{element.PublishedTime}</td>
            <td id="table-divider-stats">{element.PublishingHouse}</td>
            <td id="table-divider-stats">{element.ISBN}</td>
        </tr>

    });
    const goToPage = () => {
        let page = parseInt((document.getElementById("inputPageSearch") as HTMLInputElement).value);
        if (!Number.isNaN(page) && page != undefined && page > 0 && page <= bookPageCount) {
            setPage(page);
            localStorage.setItem('currentPage', page + '');
            location.reload();
        } else {
            alert(`Введено неправильное значение для страницы: \"${(document.getElementById("inputPageSearch") as HTMLInputElement).value}\"`);
        }
    }
    const showresults = () =>{
        localStorage.setItem('namefilter',(document.getElementById("searchByName") as HTMLInputElement).value);
        localStorage.setItem('authorfilter',(document.getElementById("searchByAuthor") as HTMLInputElement).value);
        navigate(`/bookcataloguefilter`);
    }
    return (
        <div>
            {(() => {
                //const role = localStorage.getItem('role');
                //const user = JSON.parse(localStorage.getItem('data'));
                const role = localStorage.getItem('role');
                if (role === 'plt_tutor' || role==='plt_student') {
                return <div style={{ textAlign: 'left', width: '900px', marginTop: '10%' }}>
                    <KPINavbar />
                    <br /><br /><br />
                    {/* <h3>Добро пожаловать, {user.lastname + ' ' + user.name + ' ' + user.middlename}</h3><br /> */}
                    <Link to={"/"}><button style={{ marginLeft: margin }} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
                    <br />
                    <h2 style={{ marginLeft: margin }}>Каталог книг в библиотеке</h2>
                    <br />
                    <div style={{ marginLeft: margin, backgroundColor:'#dfe0e0', borderRadius:'25px', padding:'20px 20px 20px 20px',width:'40%' }}>
                        <br/>
                        По названию: &nbsp;<input type="text" id="searchByName" className='btnNeutral' style={{color:'black'}}></input><br/><br/>
                        По автору: &nbsp;<input type="text" id="searchByAuthor" className='btnNeutral' style={{color:'black'}}></input><br/><br/>
                        <button style={{color:'white',backgroundColor:'#108c64'}} onClick={()=>showresults()}>Найти</button>
                    </div>
                    <br />
                    {books.length > 0 ? <div style={{ marginLeft: margin }}><button id="graybutton" onClick={() => firstPage()}>1</button>&nbsp;<button id="graybutton" onClick={() => previousPage()}><GrFormPrevious /></button>&nbsp;<button id="graybutton" onClick={() => nextPage()}><GrFormNext /></button>&nbsp;<button id="graybutton" onClick={() => lastPage()}>{bookPageCount}</button>&nbsp;<input className='btnNeutral' maxLength={5} style={{ color: 'black' }} type='text' id='inputPageSearch' placeholder='Введите страницу'></input>&nbsp;<button id="graybutton" onClick={() => goToPage()}>Перейти</button><br />
                        <h4>Страница {page}</h4></div> : ''}
                    <br />
                    {books.length > 0 ?
                        <table id='opaqueTable' style={{ fontSize: '10.5pt', marginLeft: '-30%', paddingLeft: '15px', maxWidth: '107%', tableLayout: 'fixed' }}>
                            <thead>
                                <tr><br /></tr>
                                <tr>
                                    <th id="table-divider-stats-header" style={{ minWidth: '120px' }}><br />&nbsp;Название<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '80px' }}><br />&nbsp;Автор<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '140px' }}><br />&nbsp;Аннотация<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '80px' }}><br />&nbsp;Ключевые слова<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '60px' }}><br />&nbsp;Язык<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '40px' }}><br />&nbsp;Кол-во страниц<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '60px' }}><br />&nbsp;Тип книги<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '60px' }}><br />&nbsp;Категория<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '110px' }}><br />&nbsp;Страна публикации<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '50px' }}><br />&nbsp;Год публикации<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '70px' }}><br />&nbsp;Издательство<br />&nbsp;</th>
                                    <th id="table-divider-stats-header" style={{ minWidth: '90px' }}><br />&nbsp;ISBN<br />&nbsp;</th>
                                    <th>&nbsp;&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booklist}
                                <tr>
                                    <td><br /></td>
                                </tr>
                            </tbody>
                        </table> : <h3 style={{ marginLeft: margin }}>Загрузка...</h3>}
                    <br />
                    {books.length > 0 ? <div style={{ marginLeft: margin }}><button onClick={() => firstPage()}>1</button>&nbsp;<button onClick={() => previousPage()}><GrFormPrevious /></button>&nbsp;<button onClick={() => nextPage()}><GrFormNext /></button>&nbsp;<button onClick={() => lastPage()}>{bookPageCount}</button><br />

                        <h4>Страница {page}</h4></div> : ''}
                </div>

            }
            else {
                return <Navigate to="/" />
            }
            })()}

        </div>
    );
}

export default observer(PhysicalBooksPages)