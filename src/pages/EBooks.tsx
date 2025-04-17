import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
//import { MdOutlinePostAdd } from "react-icons/md";
import BookService from '../services/BookService';
import IEBook from '../models/IEBook';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { FaPen, FaTrash } from 'react-icons/fa';

const EBooks: FC = () => {
  const { store } = useContext(Context);
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  let [margin] = useState<string>('-5%');
  let [bookPageCount, setBookPageCount] = useState<number>(1);
  const [books, setBookData] = useState<Array<IEBook>>([]);
  let [page, setPage] = useState<number>(1);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  useEffect(() => {

    // const user = JSON.parse(localStorage.getItem('data'));
    // if (user) {
    //   setUser(user);
    // }
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    setPage(parseInt(localStorage.getItem('currentEPage')));
    if (Number.isNaN(parseInt(localStorage.getItem('currentEPage')))) setPage(1);
    BookService.getEBookPageCount().then((response) => {
      setBookPageCount(response.data);
    }).catch((err) => {
      console.log(err);
    });
    BookService.getEBooksPerPage(page).then((response) => {
      setBookData(response.data);
    }).catch((err) => {
      console.log(err);
      setBookData([]);
    });
  }, [])

  // useEffect(()=>{
  //   setModal(modals)
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
  const deleteEBook = (ebookid) =>{
    if(confirm('Вы действительно хотите удалить книгу?')){
      BookService.deleteEBook(ebookid)
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
  }
  const openPDF = (url, ebookid) => {
    localStorage.setItem('pdfURL', url.split('/')[url.split('/').length - 1]);
    BookService.eBookAddLog(localStorage.getItem('user_id'), ebookid).then(() => {
      window.location.href = window.location.protocol + '//' + window.location.host + '/readPDF';
    }).catch((err) => {
      console.log(err);
    });
  }
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      localStorage.setItem('currentEPage', page - 1 + '');
      location.reload();
    }
  }
  const nextPage = () => {
    if (page < bookPageCount) {
      setPage(page + 1);
      localStorage.setItem('currentEPage', page + 1 + '');
      location.reload();
    }
  }
  const firstPage = () => {
    setPage(1);
    localStorage.setItem('currentEPage', '1');
    location.reload();
  }
  const lastPage = () => {
    setPage(bookPageCount);
    localStorage.setItem('currentEPage', bookPageCount + '');
    location.reload();
  }
  const booklist = books.map((element) => {
    return <tr key={element.id}>
      <td id="table-divider-stats"><button className='backbutton' onClick={() => openPDF(element.EBookPath, element.id)}>Открыть</button>&nbsp;
      {localStorage.getItem('role')=='librarian'?<button className="backbutton" onClick={() => editBook(element.id)}><FaPen /></button>:''}
      {localStorage.getItem('role')=='librarian'?<button className="redbutton" onClick={() => deleteEBook(element.id)}><FaTrash /></button>:''}<br/>
      {localStorage.getItem('role')=='librarian'?<a href={'https://cloud.esil.edu.kz/api/view?filename='+element.EBookPath.split('/')[element.EBookPath.split('/').length-1]} target='_blank'>Скачать</a>:''}
      </td>
      <td id="table-divider-stats">{element.NameRuBook}</td>
      <td id="table-divider-stats">{element.Author}</td>
      <td id="table-divider-stats">{element.Language == 'kaz' ? <div>Казахский</div> : element.Language == 'rus' ? <div>Русский</div> : element.Language == 'eng' ? <div>Английский</div> : ''}</td>
      <td id="table-divider-stats">{element.PublishedCountryCity}</td>
      <td id="table-divider-stats">{element.PublishedTime}</td>
      <td id="table-divider-stats">{element.PublishingHouse}</td>
    </tr>

  });
  const goToPage = () => {
    let page = parseInt((document.getElementById("inputPageSearch") as HTMLInputElement).value);
    if (!Number.isNaN(page) && page != undefined && page > 0 && page <= bookPageCount) {
      setPage(page);
      localStorage.setItem('currentEPage', page + '');
      location.reload();
    } else {
      alert(`Введено неправильное значение для страницы: \"${(document.getElementById("inputPageSearch") as HTMLInputElement).value}\"`);
    }

  }
  const editBook = async (id: number) => {
    localStorage.setItem('editingebookid', id + '');
    localStorage.setItem('prevLibrarianPage', 'pages');
    navigate(`/editebook`);
  }
  const showresults = () => {
    localStorage.setItem('enamefilter', (document.getElementById("searchByName") as HTMLInputElement).value);
    localStorage.setItem('eauthorfilter', (document.getElementById("searchByAuthor") as HTMLInputElement).value);
    navigate(`/ebooksfilter`);
  }
  const addBookRedirect = () => {
    localStorage.setItem('prevLibrarianPage', 'pages');
    navigate(`/addebook`);
  }
  return (
    <div>
      {(() => {
        if (role == 'plt_student' || role == 'librarian' || role == 'plt_tutor') {
          return <div style={{ textAlign: 'left', width: '1200px' }}>
            <KPINavbar />
            <br /><br /><br /><br /><br /><br /><br />
            <Link to={"/"}><button className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
            <h2>Электронные книги</h2><br />
            <div style={{ marginLeft: margin, backgroundColor: '#dfe0e0', borderRadius: '25px', padding: '20px 20px 20px 20px', width: '40%' }}>
              <br />
              По названию: &nbsp;<input type="text" id="searchByName" className='btnNeutral' style={{ color: 'black' }}></input><br /><br />
              По автору: &nbsp;<input type="text" id="searchByAuthor" className='btnNeutral' style={{ color: 'black' }}></input><br /><br />
              <button style={{ color: 'white', backgroundColor: '#108c64' }} onClick={() => showresults()}>Найти</button>
            </div><br /><br />
            {role == 'librarian' ? <div><button onClick={() => addBookRedirect()} style={{ marginLeft: margin }} className='navbarbutton'>Добавить новую эл.книгу</button><br /><br /></div> : ''}
            {books.length > 0 ? <div style={{ marginLeft: margin }}><button id="graybutton" onClick={() => firstPage()}>1</button>&nbsp;<button id="graybutton" onClick={() => previousPage()}><GrFormPrevious /></button>&nbsp;<button id="graybutton" onClick={() => nextPage()}><GrFormNext /></button>&nbsp;<button id="graybutton" onClick={() => lastPage()}>{bookPageCount}</button>&nbsp;<input className='btnNeutral' maxLength={5} style={{ color: 'black' }} type='text' id='inputPageSearch' placeholder='Введите страницу'></input>&nbsp;<button id="graybutton" onClick={() => goToPage()}>Перейти</button><br />
              <h4>Страница {page}</h4></div> : ''}
            <br />
            {books.length > 0 ?
              <table id='opaqueTable' style={{ fontSize: '10.5pt', marginLeft: margin, paddingLeft: '15px', maxWidth: '107%', tableLayout: 'fixed' }}>
                <thead>
                  <tr><br /></tr>
                  <tr>
                    <th id="table-divider-stats-header" style={{ minWidth: '180px' }}><br />&nbsp;Действия<br />&nbsp;</th>
                    <th id="table-divider-stats-header" style={{ minWidth: '120px' }}><br />&nbsp;Название<br />&nbsp;</th>
                    <th id="table-divider-stats-header" style={{ minWidth: '80px' }}><br />&nbsp;Автор<br />&nbsp;</th>
                    <th id="table-divider-stats-header" style={{ minWidth: '60px' }}><br />&nbsp;Язык<br />&nbsp;</th>
                    <th id="table-divider-stats-header" style={{ minWidth: '110px' }}><br />&nbsp;Страна публикации<br />&nbsp;</th>
                    <th id="table-divider-stats-header" style={{ minWidth: '50px' }}><br />&nbsp;Год публикации<br />&nbsp;</th>
                    <th id="table-divider-stats-header" style={{ minWidth: '70px' }}><br />&nbsp;Издательство<br />&nbsp;</th>
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
          return <div><button onClick={() => store.logout()}>Назад</button>
            <h4>Нет доступа к странице</h4></div>
        }
      })()}

    </div>
  );
}

export default observer(EBooks)