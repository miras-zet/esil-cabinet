import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import BookService from '../services/BookService';
import ILibraryBook from '../models/ILibraryBook';
import { Link, Navigate } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';

const PhysicalBooksSearch: FC = () => {
    const [books, setBookData] = useState<Array<ILibraryBook>>([]);
    let [margin] = useState<string>('-23%');
    
    useEffect(() => {  
        // const user = JSON.parse(localStorage.getItem('data'));
        BookService.getBooksByFilter().then((response) => {
                setBookData(response.data);
            }).catch((err) => {
                console.log(err);
                setBookData([]);
        });
        (document.getElementById("searchByName") as HTMLInputElement).value = localStorage.getItem('namefilter'); 
        (document.getElementById("searchByAuthor") as HTMLInputElement).value = localStorage.getItem('authorfilter');   
    }, [])
    //alert(date);
    //const d = new Date();
    //let current_year = d.getFullYear();
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
    const showresults = () =>{
        localStorage.setItem('namefilter',(document.getElementById("searchByName") as HTMLInputElement).value);
        localStorage.setItem('authorfilter',(document.getElementById("searchByAuthor") as HTMLInputElement).value);
        location.reload();
    }
    return (
        <div>
            {(() => {
                //const role = localStorage.getItem('role');
                //const user = JSON.parse(localStorage.getItem('data'));
                const role = localStorage.getItem('role');
                if (role === 'plt_student' || role === 'plt_tutor') {
                return <div style={{ textAlign: 'left', width: '900px', marginTop: '10%' }}>
                    <KPINavbar />
                    <br /><br /><br />
                    <Link to={"/"}><button style={{ marginLeft: margin }} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
                    <br />
                    <h3 style={{ marginLeft: margin }}>Список книг по результатам поиска</h3>
                    <h5 style={{ marginLeft: margin }}>Максимальное количество результатов - 1000</h5><br/>
                    <div style={{ marginLeft: margin, backgroundColor:'#dfe0e0', borderRadius:'25px', padding:'20px 20px 20px 20px',width:'40%' }}>
                        <br/>
                        По названию: &nbsp;<input type="text" id="searchByName" className='btnNeutral' style={{color:'black'}}></input><br/><br/>
                        По автору: &nbsp;<input type="text" id="searchByAuthor" className='btnNeutral' style={{color:'black'}}></input><br/><br/>
                        <button style={{color:'white',backgroundColor:'#108c64'}} onClick={()=>showresults()}>Найти</button>
                    </div><br/>
                    {books.length > 0 ? <table id='opaqueTable' style={{ fontSize: '10.5pt', marginLeft: '-30%', paddingLeft: '15px', maxWidth: '107%', tableLayout:'fixed'}}>
                        <tbody>
                            <tr><br/></tr>
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
                            {booklist}
                            <tr>
                                <td><br /></td>
                            </tr>
                        </tbody>
                    </table> : <h3 style={{ marginLeft: margin }}>Не найдены книги по запросу</h3>}
                    <br/>
                </div>

            }
            else{
                return <Navigate to="/" />
            }
            })()}

        </div>
    );
}

export default observer(PhysicalBooksSearch)