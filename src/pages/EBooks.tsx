import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import { MdOutlinePostAdd } from "react-icons/md";
import BookService from '../services/BookService';
import IEBook from '../models/IEBook';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const EBooks: FC = () => {
  const { store } = useContext(Context);
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  let [margin] = useState<string>('-5%');
  let [bookPageCount, setBookPageCount] = useState<number>(1);
  const [books, setBookData] = useState<Array<IEBook>>([]);
  let [page, setPage] = useState<number>(1);
  const role = localStorage.getItem('role');
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
  const openPDF = (url) =>{
    localStorage.setItem('pdfURL',url.split('/')[url.split('/').length-1]);
    window.location.href=window.location.protocol + '//' + window.location.host +'/readPDF';
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
      <td id="table-divider-stats"><button onClick={()=>openPDF(element.EBookPath)}>Открыть</button></td>
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
  return (
    <div>
      {(() => {
        if (role == 'librarian') {
          return <div style={{ textAlign: 'left', width: '1200px' }}>
            <KPINavbar />
            <br /><br />
            <Link to={"/"}><button className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
            <button className='navbarbutton'>Добавить новую книгу &nbsp;<MdOutlinePostAdd style={{ verticalAlign: 'middle', marginTop: '-5px', fontSize: '15pt' }} /></button>
          </div>
        }
        if (role == 'plt_student') {
          return <div style={{ textAlign: 'left', width: '1200px' }}>
            <KPINavbar />
            <br /><br /><br /><br /><br /><br /><br />
            <Link to={"/"}><button className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
            <h3>Электронные книги</h3><br />
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