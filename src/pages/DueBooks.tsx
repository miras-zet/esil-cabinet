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

const DueBooks: FC = () => {
    // const navigate = useNavigate();
    const [dueData, setDueData] = useState<Array<IBookTransfer>>([]);
    let [margin, setMargin] = useState<string>('-15%');
    useEffect(() => {
        setMargin('-15%');
        if(window.innerWidth<940) setMargin('0%');
        // const user = JSON.parse(localStorage.getItem('data'));
        BookService.getDueBooks().then((response) => {
            setDueData(response.data);
        }).catch((err) => {
            console.log(err);
            setDueData([]);
        });

    }, [])
    // useEffect(()=>{
    //   setModal(modals)
    // },[])
    //alert(date);
    //const d = new Date();
    //let current_year = d.getFullYear();
    const deleteBook = async (id: number, name:string) => {
        if (confirm(`Вы уверены, что хотите удалить закрепление для студента ${name}?`)) {
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
    const booklist = dueData.map((element) =>
        <tr key={element.id}>
            <td id="table-divider-stats">{element.fio}</td>
            <td id="table-divider-stats">{element.bookname}</td>
            <td id="table-divider-stats">{moment(element.DateCreated).format("DD.MM.YYYY HH:mm")}</td>
            <td id="table-divider-stats"><button className="redbutton" onClick={() => deleteBook(element.id, element.fio)}><FaTrashAlt /></button></td>
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
                        <Link to={"/"}><button className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
                        <br />
                        <h2>Список должников по книгам</h2>
                        <br/>
                        
                        {dueData.length>0?<table id='opaqueTable' style={{ fontSize:'12pt', paddingLeft: '15px', width: '107%' }}>
                            <tbody>
                                <tr><br/></tr>
                                <tr>
                                <th id="table-divider-stats-header"><br />&nbsp;ФИО студента<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Название книги<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Дата выдачи<br />&nbsp;</th>
                                <th id="table-divider-stats-header"><br />&nbsp;Действия<br />&nbsp;</th>
                                <th>&nbsp;&nbsp;</th>
                            </tr>
                            
                            {booklist}
                            <tr>
                                <td><br/></td>
                            </tr>
                            </tbody>
                        </table>:<h3>Должников нет</h3>}
                    </div>   
                
            })()}

        </div>
    );
}

export default observer(DueBooks)