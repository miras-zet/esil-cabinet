import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { ModalContext } from '../http/ModalContext';
import LoginForm from '../components/LoginForm';
import CreateCert from '../components/CreateCert';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import UploadService from '../services/UploadService';
import IKPI from '../models/IKPI';
import KPICategoryScores from '../components/KPICategoryScores';
import KPINavbar from '../components/KPINavbar';
import { HiSparkles } from "react-icons/hi2";
import { FaBook, FaTrashAlt, FaUpload } from 'react-icons/fa';
import { FaDisplay } from "react-icons/fa6";
import { IoIosAlarm } from "react-icons/io";
import { MdNoteAdd } from 'react-icons/md';
import StudentDebt from '../components/StudentDebt';
import StudentBookDebt from '../components/StudentBookDebt';
import StudentDormRequest from '../components/StudentDormRequest';
import IBookCart from '../models/IBookCart';

// import dotenv from 'dotenv';
// dotenv.config();
// const api_url=process.env.REACT_APP_API_URL;

const HomePage: FC = () => {
  const currentVersion = '1.0.5';
  const cachedVersion = localStorage.getItem('appVersion');

  if (cachedVersion !== currentVersion) {
    localStorage.setItem('appVersion', currentVersion);
    window.location.reload();
  }
  const { store } = useContext(Context);
  const { modal, open } = useContext(ModalContext);
  const [kpiInfo, setKpiInfo] = useState<Array<IKPI>>([]);
  let [searchtype, setSearchType] = useState<string>('name');
  const [booksParsed, setParsedBooks] = useState<Array<IBookCart>>([]);

  useEffect(() => {
    setKpiInfo([]);
    let books = JSON.parse(localStorage.getItem('bookCartJSON'));
    if (books!=null) setParsedBooks(books)
    else {
      localStorage.setItem('bookCartJSON','[]');
      setParsedBooks([])
    };
    if (!booksParsed) setParsedBooks([]);
    if(!localStorage.getItem('bookCartJSON')) localStorage.setItem('bookCartJSON','[]');
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }

  }, [])

  // const kpiItems = kpiInfo.map((element)=>
  //   [element.score]
  // );

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

  if (store.certificat?.id !== 0 && store.certificat?.id !== undefined) {
    return <Navigate to='/certificate' />;
  }

  function redirectCafedra(id: string, name: string) {
    localStorage.setItem('cafedraid', id);
    localStorage.setItem('cafedraname', name);
    window.location.href = window.location.protocol + '//' + window.location.host + '/kpiadmin';
    return;
  }
  function redirectTopTen(toptentype: string) {
    localStorage.setItem('toptentype', toptentype);
    window.location.href = window.location.protocol + '//' + window.location.host + '/kpitopten';
    return;
  }

  const bookCart = booksParsed.map((element) =>
    <tr key={element.id}>
      <td></td>
      <td id="table-divider" style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
      <td id="table-divider" style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.barcode}</td>
      <td id="table-divider" style={{ textAlign: 'center', verticalAlign: 'middle' }}><button className='redbutton' onClick={() => deleteFromCart(element.id)}><FaTrashAlt /></button></td>
    </tr>
  );
  const deleteFromCart = (id) => {
    for (var i = booksParsed.length - 1; i >= 0; --i) {
      if (booksParsed[i].id == id) {
        booksParsed.splice(i, 1);
      }
    }
    setParsedBooks(booksParsed);
    localStorage.setItem('bookCartJSON', JSON.stringify(booksParsed));
    setParsedBooks(JSON.parse(localStorage.getItem('bookCartJSON')));
  }
  const clearCart = () => {
    if (confirm('Вы уверены, что хотите очистить корзину?')) {
      for (var i = booksParsed.length - 1; i >= 0; --i) {
        booksParsed.splice(i, 1);
      }
      setParsedBooks(booksParsed);
      localStorage.setItem('bookCartJSON', JSON.stringify(booksParsed));
      setParsedBooks(JSON.parse(localStorage.getItem('bookCartJSON')));
    }

  }
  const countKpi = () => {
    UploadService.getKpi()
      .then(
        (response) => {
          localStorage.setItem('KPIScore', response.data.score)
          return setKpiInfo(response.data.score);
        }
      );
  }
  const findBookName = () => {
    localStorage.setItem('searchType', 'name');
    let bookName = (document.getElementById("inputSearchBookByName") as HTMLInputElement).value;
    bookName = bookName.trim();
    (document.getElementById("inputSearchBookByName") as HTMLInputElement).value = bookName;
    if (bookName != undefined && bookName.length >= 4) {
      localStorage.setItem('bookSearch', bookName + '');
      localStorage.setItem('prevLibrarianPage', 'home');
      window.location.href = window.location.protocol + '//' + window.location.host + '/searchbook';
    }
    else {
      alert('Введите как минимум 4 символа в поле поиска');
    }
  }
  const findBookISBN = () => {
    localStorage.setItem('searchType', 'isbn');
    let bookISBN = (document.getElementById("inputSearchBookByISBN") as HTMLInputElement).value;
    bookISBN = bookISBN.trim();
    (document.getElementById("inputSearchBookByISBN") as HTMLInputElement).value = bookISBN;
    if (bookISBN != undefined && bookISBN.length >= 4) {
      localStorage.setItem('bookSearch', bookISBN + '');
      localStorage.setItem('prevLibrarianPage', 'home');
      window.location.href = window.location.protocol + '//' + window.location.host + '/searchbook';
    }
    else {
      alert('Введите как минимум 4 символа в поле поиска');
    }
  }
  const findBookKeyWords = () => {
    localStorage.setItem('searchType', 'keywords');
    let bookKeyWords = (document.getElementById("inputSearchBookByKeyWords") as HTMLInputElement).value;
    bookKeyWords = bookKeyWords.trim();
    (document.getElementById("inputSearchBookByKeyWords") as HTMLInputElement).value = bookKeyWords;
    if (bookKeyWords != undefined && bookKeyWords.length >= 4) {
      localStorage.setItem('bookSearch', bookKeyWords + '');
      localStorage.setItem('prevLibrarianPage', 'home');
      window.location.href = window.location.protocol + '//' + window.location.host + '/searchbook';
    }
    else {
      alert('Введите как минимум 4 символа в поле поиска');
    }
  }
  const findBookInventory = () => {
    localStorage.setItem('searchType', 'inventory');
    let bookInventory = (document.getElementById("inputSearchBookByInventory") as HTMLInputElement).value;
    bookInventory = bookInventory.trim();
    (document.getElementById("inputSearchBookByInventory") as HTMLInputElement).value = bookInventory;
    if (bookInventory != undefined && bookInventory.length >= 4) {
      localStorage.setItem('bookSearch', bookInventory + '');
      localStorage.setItem('prevLibrarianPage', 'home');
      window.location.href = window.location.protocol + '//' + window.location.host + '/searchbook';
    }
    else {
      alert('Введите как минимум 4 символа в поле поиска');
    }
  }
  const findBookBarcode = () => {
    localStorage.setItem('searchType', 'barcode');
    let bookBarcode = (document.getElementById("inputSearchBookByBarcode") as HTMLInputElement).value;
    bookBarcode = bookBarcode.trim();
    (document.getElementById("inputSearchBookByBarcode") as HTMLInputElement).value = bookBarcode;
    if (bookBarcode != undefined && bookBarcode.length >= 3) {
      localStorage.setItem('bookSearch', bookBarcode + '');
      localStorage.setItem('prevLibrarianPage', 'home');
      window.location.href = window.location.protocol + '//' + window.location.host + '/searchbook';
    }
    else {
      alert('Введите как минимум 3 символа в поле поиска');
    }
  }
  const searchTypeSelected = (type: string) => {
    localStorage.setItem('searchType', type);
    setSearchType(type);
    return 1;
  }
  interface Option {
    id: number;
    value: string;
  }

  const options: Option[] = [
    { id: 1, value: "По названию" },
    { id: 2, value: "По ключевым словам" },
    { id: 3, value: "По ISBN" },
    { id: 4, value: "По инвентарному номеру" },
    { id: 5, value: "По штрихкоду" }
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    switch (selectedId) {
      case 1: searchTypeSelected('name');
        break;
      case 2: searchTypeSelected('keywords');
        break;
      case 3: searchTypeSelected('isbn');
        break;
      case 4: searchTypeSelected('inventory');
        break;
      case 5: searchTypeSelected('barcode');
        break;
      default: searchTypeSelected('name');
    }
  };

  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
        let KPIScore = "0";
        let textcolor;
        if (role == 'plt_tutor') countKpi();
        if (kpiInfo === undefined && role === 'plt_tutor') {
          //location.reload();
        }
        if (role === 'plt_tutor') KPIScore = localStorage.getItem('KPIScore');
        let premiere = "";
        if (parseInt(KPIScore) == 0) {
          premiere = "Нет";
        }
        if (parseInt(KPIScore) > 0) {
          premiere = "C";
        }
        if (parseInt(KPIScore) >= 50) {
          premiere = "B";
        }
        if (parseInt(KPIScore) >= 84) {
          premiere = "A";
        }
        if (parseInt(KPIScore) >= 100) textcolor = 'orange';
        if (parseInt(KPIScore) >= 200) {
          premiere = "Silver";
        }
        if (parseInt(KPIScore) >= 300) {
          premiere = "Gold";
        }
        if (parseInt(KPIScore) >= 400) {
          premiere = "Platinum";
        }
        if (parseInt(KPIScore) == 0) {
          premiere = "Нет";
        }
        if (role === 'plt_student') {
          return <div className='root' style={{ textAlign: 'left' }}>
            <KPINavbar /> <br /><br /><br /><br /><br /><br /><br />
            <h2>{store.isAuth ? `Добро пожаловать, ${store.user.lastname} ${store.user.name}` : 'АВТОРИЗУЙТЕСЬ'}</h2>
            <button className='navbarbutton' onClick={open}>Получить новую справку</button>
            &nbsp;&nbsp;<Link to="/list"><button className='navbarbutton' onClick={() => store.getCert()}>История подачи справок</button></Link>
            <br /><StudentDormRequest />
            {/* &nbsp;&nbsp;<Link to="/ebooks"><button className='navbarbutton'>Электронная библиотека</button></Link> */}
            <br /><br /><StudentBookDebt />
            <br /><StudentDebt />
            <br />

            <br />

            {modal && <CreateCert />}  </div>
        }
        if (role === 'plt_graduate') {
          return <div className='root' style={{ textAlign: 'left' }}>
            <KPINavbar /> <br /><br /><br /><br /><br /><br /><br />
            <h2>{store.isAuth ? `Добро пожаловать, ${store.user.lastname} ${store.user.name}` : 'АВТОРИЗУЙТЕСЬ'}</h2>
            <h3>Статус в системе: выпускник</h3>
            <br /><br /><StudentBookDebt />
            <br /><StudentDebt />
            <br />
            <br />
          </div>
        }
        else if (role === 'plt_applicant') {
          return <center>
            <h2>Ваш статус в системе: абитуриент. <br />После зачисления будут доступен сервис выдачи справок.</h2>
            <br /><button id="graybutton" onClick={() => store.logout()}>Выйти</button>
          </center>
        }
        else if (role === 'plt_tutor') {
          return <div className='rootTutor'>
            <KPINavbar />
            <div className='tutorcontent'>
              <h4 style={{ fontSize: 35 }}>Баллы KPI: <b style={{ color: textcolor }}>{kpiInfo ? kpiInfo.toString() : <></>}</b></h4>
              <h4 style={{ fontSize: 20 }}>{premiere ? `Премирование: ${premiere} ` : ''}{parseInt(KPIScore) >= 200 ? <HiSparkles style={{ verticalAlign: 'middle', marginTop: '-7px' }} /> : ''}</h4>
              <Link to="/kpi"><button className='navbarbutton'>Загрузить документы &nbsp;&nbsp;<FaUpload /></button></Link>
              <h5>* Каждый несёт персональную ответственность за ввод данных в систему оценки KPI.</h5>
              <KPICategoryScores />
            </div>
          </div>
        }
        else if (role === 'technician') {
          return <div className='rootTutor'>
            <KPINavbar />
            <div className='tutorcontent'>
              <h2>Кабинет ОТОиР</h2>
              <Link to="/techNewDocument"><button className='navbarbutton'>Новое представление &nbsp;<MdNoteAdd style={{ verticalAlign: 'middle', marginTop: '-4px' }} /></button></Link> <br /><br /><br />
              <Link to="/techDueDocuments"><button>Активные</button></Link><br /><br />
              <Link to="/techOldDocuments"><button>Завершенные</button></Link>
            </div>
          </div>
        }
        else if (role === 'admissionadmin') {
          return <Navigate to='/applicants' />
        }
        else if (role === 'admissionstats') {
          return <Navigate to='/admission_statistics' />
        }
        else if (role === 'dean_students') {
          return <Navigate to='/dormrequests' />
        }
        else if (role === 'reader') {
          return <div className='root'>
            <KPINavbar />
            <br />
            <h2>Добро пожаловать!</h2>
            <h3>Электронная библиотека ESIL University</h3>
            <Link to="/ebooks"><button className='navbarbutton'>Электронные книги &nbsp;<FaBook style={{ verticalAlign: 'middle', marginTop: '-4px' }} /></button></Link><br /><br />
          </div>
        }
        else if (role === 'librarian') {
          return <div style={{ textAlign: 'left', width: '700px' }}>
            <KPINavbar />
            <br /><br /><br /><br /><br /><br />
            <table style={{ width: '110%' }}>
              <tbody>
                <td>
                  <h2>Добро пожаловать!</h2>
                  <br />
                  <Link to="/physicalbooksPages"><button className='navbarbutton'>Список книг &nbsp;<FaBook style={{ verticalAlign: 'middle', marginTop: '-4px' }} /></button></Link> <br /><br />
                  Выберите настройки поиска<br />
                  <select onChange={handleSelectChange} className='btnNeutral' >

                    {options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.value}
                      </option>
                    ))}
                  </select>

                  <br /><br />
                  {searchtype == 'name' ? <div><input type="text" id='inputSearchBookByName' className='btnNeutral' maxLength={100} placeholder='Поиск по названию'></input>&nbsp;<button id="graybutton" onClick={() => findBookName()}>Найти</button></div> : ''}
                  {searchtype == 'keywords' ? <div><input type="text" id='inputSearchBookByKeyWords' className='btnNeutral' maxLength={100} placeholder='Поиск по ключевым словам'></input>&nbsp;<button id="graybutton" onClick={() => findBookKeyWords()}>Найти</button></div> : ''}
                  {searchtype == 'isbn' ? <div><input type="text" id='inputSearchBookByISBN' className='btnNeutral' maxLength={100} placeholder='Поиск по ISBN'></input>&nbsp;<button id="graybutton" onClick={() => findBookISBN()}>Найти</button></div> : ''}
                  {searchtype == 'inventory' ? <div><input type="text" id='inputSearchBookByInventory' className='btnNeutral' maxLength={100} placeholder='Поиск по инвентарному номеру'></input>&nbsp;<button id="graybutton" onClick={() => findBookInventory()}>Найти</button></div> : ''}
                  {searchtype == 'barcode' ? <div><input type="text" id='inputSearchBookByBarcode' className='btnNeutral' maxLength={100} placeholder='Поиск по штрихкоду'></input>&nbsp;<button id="graybutton" onClick={() => findBookBarcode()}>Найти</button></div> : ''}
                  <br /><br /><br />
                  <Link to="/ebooks"><button className='navbarbutton' >Список электронных книг &nbsp;<FaDisplay style={{ verticalAlign: 'middle', marginTop: '-4px' }} /></button></Link><br /><br />
                  <br />
                  <Link to="/duebooks"><button className='redbutton' >Должники &nbsp;<IoIosAlarm style={{ verticalAlign: 'middle', marginTop: '-4px' }} /></button></Link>
                </td>
                <td style={{ width: '15%' }}></td>
                <td>
                  {booksParsed.length > 0 ? <>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>Корзина</h3>
                    <table id='opaqueTable'>
                      <thead>
                        <tr><br /></tr>
                        <tr>
                          <th>&nbsp;</th>
                          <th style={{ textAlign: 'center', width: '400px' }}>
                            &nbsp;Название&nbsp;
                          </th>
                          <th style={{ textAlign: 'center' }}>
                            &nbsp;Штрихкод&nbsp;
                          </th>
                          <th style={{ textAlign: 'center' }}>
                            &nbsp;Действия&nbsp;
                          </th>
                          <th>&nbsp;<br /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookCart != null ? bookCart : <></>}
                        <tr><br /></tr>
                      </tbody>
                    </table>
                    <br />
                    <center><Link to='/transferlibrarybookJSON'><button className='greenbutton'>Выдать книги</button></Link> <button className='redbutton' onClick={() => clearCart()}>Очистить</button></center>
                  </> : <></>}
                </td>
              </tbody>
            </table>
          </div>
        }
        else if (role === 'plt_kpiadmin') {
          return <div className='root'>
            <KPINavbar />
            <br /><br /><br /><br /><br />
            <h2>{store.isAuth ? `Кабинет администратора KPI` : 'АВТОРИЗУЙТЕСЬ'}</h2>
            <br /><br />
            <table>
              <tbody>
                <tr>
                  <th>Факультет прикладных наук</th>
                  <th>Факультет бизнеса и управления</th>
                </tr>
                <tr>
                  <td>
                    <p><button className="backbutton" onClick={() => redirectCafedra('7', 'Информационных систем и технологий')}>Информационных систем и технологий</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('15', 'Социально-гуманитарных дисциплин')}>Социально-гуманитарных дисциплин</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('13', 'Международной торговли и Права')}>Международной торговли и Права</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('2', 'Социальная работа и туризм')}>Социальная работа и туризм</button></p>
                  </td>
                  <td>
                    <p><button className="backbutton" onClick={() => redirectCafedra('1', 'Финансы')}>Финансы</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('3', 'Экономика')}>Экономика</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('4', 'Менеджмент')}>Менеджмент</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('5', 'Учет и аудит')}>Учет и аудит</button></p>
                  </td>
                </tr>
              </tbody>
            </table>

            <br /><br />
            <p><Link to="/kpistats"><button className="backbutton">Сводка по кафедрам</button></Link></p>
            <p><button className="backbutton" onClick={() => redirectTopTen('6')}>Топ-10 преподавателей (все преподаватели)</button></p>
            <br />
            <p><button className="backbutton" onClick={() => redirectTopTen('0')}>Топ-10 преподавателей (без звания)</button></p>
            <p><button className="backbutton" onClick={() => redirectTopTen('2')}>Топ-10 преподавателей (доцент / ассоц. профессор)</button></p>
            <p><button className="backbutton" onClick={() => redirectTopTen('3')}>Топ-10 преподавателей (профессор)</button></p>
          </div>
        }
        else {
          return <div><center><h3>Произошла внутренняя ошибка</h3><button id="graybutton" onClick={() => store.logout()}>Выйти</button></center></div>
        }
      })()}
    </div>
  );
}

export default observer(HomePage)