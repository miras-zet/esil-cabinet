import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { ModalContext } from '../http/ModalContext';
import LoginForm from '../components/LoginForm';
import CreateCert from '../components/CreateCert';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import UploadService from '../services/UploadService';
//import IKPI from '../models/IKPI';
//import KPICategoryScores from '../components/KPICategoryScores';
import KPINavbar from '../components/KPINavbar';
//import { HiSparkles } from "react-icons/hi2";
import { FaBook, FaDownload, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { FaBookAtlas, FaDisplay } from "react-icons/fa6";
import { IoIosAlarm, IoIosBook } from "react-icons/io";
import { MdNoteAdd } from 'react-icons/md';
import StudentDebt from '../components/StudentDebt';
import StudentBookDebt from '../components/StudentBookDebt';
import StudentDormRequest from '../components/StudentDormRequest';
import IBookCart from '../models/IBookCart';
import PhotoChecker from '../components/PhotoChecker';
import config from "../http/version.json";
import CafedraService from '../services/CafedraService';
import { FaTableList } from "react-icons/fa6";
import StudentAttendance from '../components/StudentAttendance';
import EmployeeAttendance from '../components/EmployeeAttendance';
import api from '../http-common';
import configFile from "../http/config.json";
import astanahubvideo from "/astanahub.mp4";

export const buildVer = config.buildVer;

// import dotenv from 'dotenv';
// dotenv.config();
// const api_url=process.env.REACT_APP_API_URL;

const HomePage: FC = () => {
  const currentVersion = buildVer;
  const cachedVersion = localStorage.getItem('appVersion');

  if (cachedVersion !== currentVersion) {
    localStorage.setItem('appVersion', currentVersion);
    window.location.reload();
  }
  if (localStorage.getItem('data')) UploadService.checkPhotoUploadEligibility().then((response) => {
    localStorage.setItem('eligibility', response.data);
  });

  const { store } = useContext(Context);
  const { modal, open } = useContext(ModalContext);
  //const [kpiInfo, setKpiInfo] = useState<Array<IKPI>>([]);
  let [searchtype, setSearchType] = useState<string>('name');
  const [booksParsed, setParsedBooks] = useState<Array<IBookCart>>([]);
  const [isfacultymanager, setFacultyManager] = useState<boolean>(false);

  useEffect(() => {
    //setKpiInfo([]);
    let books = JSON.parse(localStorage.getItem('bookCartJSON'));
    if (books != null) setParsedBooks(books)
    else {
      localStorage.setItem('bookCartJSON', '[]');
      setParsedBooks([])
    };
    if (!booksParsed) setParsedBooks([]);

    if (!localStorage.getItem('bookCartJSON')) localStorage.setItem('bookCartJSON', '[]');
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

  function openModal(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    open();
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
          //return setKpiInfo(response.data.score);
        }
      );
  }
  const getManagerStatus = () => {
    CafedraService.checkManagerStatus().then((response) => {
      localStorage.setItem('cafedramanager', response.data);
    });
    CafedraService.checkFacultyStatus().then((response) => {
      setFacultyManager(response.data);
    });
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
  async function handleFileDownloadLetter() {
    try {
      const response = await api.get(`${configFile.API_URL}/upload/downloadletter`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Письмо.docx');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Ошибка загрузки файла.');
    }
  };
  async function handleFileDownload() {
    try {
      const response = await api.get(`${configFile.API_URL}/upload/downloadinstruction`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Инструкция.pptx');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Ошибка загрузки файла.');
    }
  };

  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
        const suspended = JSON.parse(localStorage.getItem('data')).suspended;
        if (suspended == 1) {
          return <center>
            <h2>Доступ к аккаунту отключен</h2>
            <br /><button id="backbutton" onClick={() => store.logout()}>Выйти</button>
          </center>
        }
        // let KPIScore = "0";
        // let textcolor;
        if (role == 'plt_tutor') {
          countKpi();
          getManagerStatus();
          //KPIScore = localStorage.getItem('KPIScore');
        }
        // let premiere = '';
        // if (parseInt(KPIScore) == 0) {
        //   premiere = "Нет";
        // }
        // if (parseInt(KPIScore) > 0) {
        //   premiere = "C";
        // }
        // if (parseInt(KPIScore) >= 50) {
        //   //textcolor = 'orange';
        //   premiere = "B";
        // }
        // if (parseInt(KPIScore) >= 84) {
        //   premiere = "A";
        // }
        // if (parseInt(KPIScore) >= 200) {
        //   premiere = "Silver";
        // }
        // if (parseInt(KPIScore) >= 300) {
        //   premiere = "Gold";
        // }
        // if (parseInt(KPIScore) >= 400) {
        //   premiere = "Platinum";
        // }
        // if (parseInt(KPIScore) == 0) {
        //   premiere = "Нет";
        // }
        if (role === 'plt_student') {
          return <div className='root' style={{ textAlign: 'left' }}>
            <KPINavbar /> <br /><br /><br /><br /><br /><br /><br />
            <h2>{store.isAuth ? `Добро пожаловать, ${store.user.lastname} ${store.user.name}` : 'АВТОРИЗУЙТЕСЬ'}</h2>
            <br />

            <table>
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tr><div id='homepagePanel'>
                        <h2>Объявление для обучающихся</h2>
                        <h4 style={{ color: 'red' }}>При возникновении проблем нажмите кнопку ниже:</h4>
                        <Link to="/astanahubhelp"><button className='redbutton'>Помощь</button></Link><br /><br />
                        В соответствии с письмом министерства науки и высшего образования № 4-07-02-06/1250-И от 24.02.2025 все обучающиеся университета Esil University должны пройти следующий курс на образовательной платформе от Astana Hub:<br />
                        <br /><a href="https://corp.lerna.kz/astanahub_registration?company=033f2f74-4795-4ae6-a3dc-f6ea1fe08d29" target='_blank'>"Основы Искусственного Интеллекта: чат GPT"</a>
                        <br /><br />По завершению курсов необходимо загрузить сертификат.<br />
                        <Link to="/uploadcoursera"><button className='navbarbutton'>Загрузить сертификат</button></Link><br />
                        <br />Курс необходимо пройти до 20.04.2025.
                        <br /><b>Без сертификата у обучающихся не будет допуска к рубежным контролям и экзаменационной сессии.</b>
                        <br /><br />Скачать письмо:&ensp;
                        <button className='backbutton' style={{ width: '40px', height: '40px' }} onClick={() => handleFileDownloadLetter()}><FaDownload style={{ width: '20px', height: '20px', position: 'absolute', marginLeft: '-10px', marginTop: '-10px' }} /></button><br />
                        <br /><br />Скачать инструкцию:&ensp;
                        <button className='backbutton' style={{ width: '40px', height: '40px' }} onClick={() => handleFileDownload()}><FaDownload style={{ width: '20px', height: '20px', position: 'absolute', marginLeft: '-10px', marginTop: '-10px' }} /></button><br />
                        <br />Видеоинструкция:
                        <video width="500" height="220" controls>
                          <source src={astanahubvideo} type="video/mp4" />
                          Ваш браузер не поддерживает это видео.
                        </video>
                        {/* <br /><StudentEmail/> */}
                        <br />
                        
                      </div><br /></tr>
                      <tr><div id='homepagePanel'>
                        <h2>Справки</h2>
                        <button className='navbarbutton' onClick={openModal}><FaPlus style={{ verticalAlign: 'middle', fontSize: '11pt' }} /> Получить новую справку</button>
                        &nbsp;&nbsp;
                        <Link to="/list">
                          {/* <button className='navbarbutton' onClick={() => store.getCert()}> <FaClock style={{ verticalAlign: 'middle', fontSize: '14pt' }} /> История справок</button> */}
                        </Link><br /><br />
                      </div><br /></tr>
                      <tr><div id='homepagePanel'>
                        <h2>Регистрация FaceID</h2>
                        <PhotoChecker /><br /><br />
                      </div><br /></tr>
                      <tr><div id='homepagePanel'>
                        <h2>Оплата</h2>
                        <StudentDebt />
                        <br /></div><br /></tr>
                    </table>
                  </td>
                  <td style={{ width: '25px' }}></td>
                  <td>
                    <table>
                    <tr><div id='homepagePanel'>
                        <h2>Уважаемые студенты!</h2>
                        В этом семестре мы проводим анкетирование по качеству преподавания по всем дисциплинам. Ваш отклик поможет нам объективно оценить работу каждого преподавателя и улучшить образовательный процесс.<br/>
                        <br/><b>Порядок прохождения анкеты:</b><br/>
                        <br/>● Анкета размещена по единой ссылке: <a href="https://docs.google.com/forms/d/e/1FAIpQLSdgnUV5cBoQhMgVbtLmmewz3jFpfGzUtQJZpBzHP4K26LNfPw/viewform?usp=header" target="_blank">Ссылка на анкету</a>
                        <br/>● Анкетирование <b>анонимное</b>: ни ваши ФИО, ни другие персональные данные не сохраняются.
                        <br/>● <b>По каждой дисциплине</b> и <b>по каждому преподавателю</b> <b>заполняется отдельная анкета</b>.
                        <br/>Например, если вы изучаете 5 дисциплин и по каждой у вас было по две формы занятий (лекции и практические), и на каждом из этих занятий с вами работали разные преподаватели, вам потребуется заполнить форму <b>10 раз</b> (по одному опросу на каждого преподавателя).
                        <br/>● Заполните анкету <b>в течении недели 2 рейтингового контроля.</b>
                        <br/>● Опрос необходимо пройти по всем преподавателям, с которыми вы взаимодействовали.
                        <br/><br/><b>Почему это важно:</b>
                        <br/>● Ваши объективные оценки мотивируют преподавателей совершенствовать методы обучения.
                        <br/>● На основе статистики мы сможем выявить сильные практики и зоны для развития, скорректировать учебные планы и методы оценки.
                        <br/><br/>Если у вас возникнут вопросы по форме, обращайтесь к куратору, в деканат или в Отдел обеспечения качества и стратегического анализа (202 кабинет).
                        <br/><br/>Спасибо за вашу активность и честные ответы!
                        <br/>Ваш вклад — залог качества образования в Esil University.

                        <br /></div><br /></tr>
                      <tr><div id='homepagePanel'>
                        <h2>Библиотека</h2>
                        <Link to="/bookrepo"><button className='navbarbutton'><IoIosBook style={{ verticalAlign: 'middle' }} /> Каталог книг</button></Link><br /><br />
                        <Link to="/ebooks"><button className='navbarbutton'><FaBookAtlas style={{ verticalAlign: 'middle' }} /> Электронные книги</button></Link>
                        <br /><StudentBookDebt />
                        <br /></div><br /></tr>
                      <tr><div id='homepagePanel'>
                        <h2>Посещаемость занятий</h2>
                        <StudentAttendance />
                        <Link to="/attendance"><button className='backbutton' style={{ marginLeft: '18px' }}>Посмотреть всё</button></Link><br /><br />
                      </div><br /></tr>
                      <tr><div id='homepagePanel'>
                        <h2>Дом студентов</h2>
                        <StudentDormRequest />
                        <br /></div><br /></tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
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
            <br /><button id="backbutton" onClick={() => store.logout()}>Выйти</button>
          </center>
        }
        else if (role === 'plt_tutor') {
          return <div className='root'>
            <KPINavbar /> <br /><br /><br /><br /><br /><br /><br />
            <table style={{ textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td>
                    <table>
                      {/* <tr><div id='homepagePanel'>
                        <h2 style={{ fontSize: 20 }}>Ключевые показатели эффективности (KPI)</h2>
                        <h4 style={{ fontSize: 27 }}>Баллы: <b style={{ color: textcolor }}>{kpiInfo ? kpiInfo.toString() : <></>}</b></h4>
                        <h4 style={{ fontSize: 15 }}>{premiere ? `Премирование: ${premiere} ` : ''}{parseInt(KPIScore) >= 200 ? <HiSparkles style={{ verticalAlign: 'middle', marginTop: '-7px' }} /> : ''}</h4>
                        <Link to="/kpi"><button className='navbarbutton'><FaUpload />&nbsp;&nbsp;Загрузить документы</button></Link><br /><br />
                        <KPICategoryScores />
                      </div><br /></tr> */}
                      {localStorage.getItem('cafedramanager') !== '0' ? <tr><div id='homepagePanel'>
                        <h2>Коэффициент трудового участия</h2>
                        <Link to="/cafedramanagement"><button className='navbarbutton'><FaTableList style={{ verticalAlign: 'middle' }} /> Показатели</button></Link><br /><br />
                        <br /></div><br />
                      </tr> :
                        <tr><div id='homepagePanel'>
                          <h2>Коэффициент трудового участия</h2>
                          <Link to="/ktu"><button className='navbarbutton'><FaTableList style={{ verticalAlign: 'middle' }} /> Показатели</button></Link><br /><br />
                          <br /></div><br />
                        </tr>
                      }
                      {isfacultymanager ? <tr><div id='homepagePanel'>
                        <h2>Факультет</h2>
                        <Link to="/facultymanagement"><button className='navbarbutton'><FaTableList style={{ verticalAlign: 'middle' }} /> Заведующие кафедр</button></Link><br /><br />
                        <br /></div><br />
                      </tr> : ''
                      }
                      <tr><div id='homepagePanel'>
                        <h2>Регистрация FaceID</h2>
                        <PhotoChecker /><br /><br />
                      </div><br /></tr>
                      <tr></tr>
                      <tr><div id='homepagePanel'>
                        <h2>Учёт трудового времени</h2>
                        <EmployeeAttendance />
                        <Link to="/attendanceEmployee"><button className='backbutton' style={{ marginLeft: '18px' }}>Посмотреть всё</button></Link><br /><br />
                      </div><br /></tr>
                    </table>
                  </td>
                  <td style={{ width: '15px' }}></td>
                  <td>
                    <table>

                      <tr><div id='homepagePanel'>
                        <h2>Библиотека</h2>
                        <Link to="/bookrepo"><button className='navbarbutton'><IoIosBook style={{ verticalAlign: 'middle' }} /> Каталог книг</button></Link><br /><br />
                        <Link to="/ebooks"><button className='navbarbutton'><FaBookAtlas style={{ verticalAlign: 'middle' }} /> Электронные книги</button></Link>
                        <br /><StudentBookDebt />
                        <br /></div><br />
                      </tr>
                      <tr></tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            {/* <div className='tutorcontent'>
              <h4 style={{ fontSize: 35 }}>Баллы KPI: <b style={{ color: textcolor }}>{kpiInfo ? kpiInfo.toString() : <></>}</b></h4>
              <h4 style={{ fontSize: 20 }}>{premiere ? `Премирование: ${premiere} ` : ''}{parseInt(KPIScore) >= 200 ? <HiSparkles style={{ verticalAlign: 'middle', marginTop: '-7px' }} /> : ''}</h4>
              <Link to="/kpi"><button className='navbarbutton'><FaUpload />&nbsp;&nbsp;Загрузить документы</button></Link><br /><br />
              <Link to="/bookrepo"><button className='navbarbutton'><FaBook />&nbsp;&nbsp;Каталог книг</button></Link><br /><br />
              
              <PhotoChecker/><br/>
              <StudentBookDebt />
              <h5>* Каждый несёт персональную ответственность за ввод данных в систему оценки KPI.</h5>
              <KPICategoryScores />
            </div> */}
          </div>
        }
        else if (role === 'plt_employee') {
          return <div className='root'>
            <KPINavbar /> <br /><br /><br /><br /><br /><br /><br />
            <table style={{ textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tr><div id='homepagePanel'>
                        <h2>Регистрация FaceID</h2>
                        <PhotoChecker /><br /><br />
                      </div><br /></tr>
                      <tr></tr>
                      <tr><div id='homepagePanel'>
                        <h2>Учёт трудового времени</h2>
                        <EmployeeAttendance />
                        <Link to="/attendanceEmployee"><button className='backbutton' style={{ marginLeft: '18px' }}>Посмотреть всё</button></Link><br /><br />
                      </div><br /></tr>
                    </table>
                  </td>
                  <td style={{ width: '15px' }}></td>
                  <td>
                    <table>
                      <tr></tr>
                      <tr></tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
          </div>
        }
        else if (role === 'plt_foreign_student') {
          return <div className='root'>
            <KPINavbar /> <br /><br /><br /><br /><br /><br /><br />
            <table style={{ textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tr><div id='homepagePanel'>
                        <h2>Регистрация FaceID</h2>
                        <PhotoChecker /><br /><br />
                      </div><br /></tr>
                      <tr></tr>
                    </table>
                  </td>
                  <td style={{ width: '15px' }}></td>
                  <td>
                    <table>
                      <tr></tr>
                      <tr></tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
          </div>
        }
        else if (role === 'technician') {
          return <div className='rootTutor'>
            <KPINavbar />
            <div className='tutorcontent'>
              <h2>Кабинет ОТОиР</h2>
              <Link to="/techNewDocument"><button className='navbarbutton'>Новое представление &nbsp;<MdNoteAdd style={{ verticalAlign: 'middle', marginTop: '-4px' }} /></button></Link> <br /><br /><br />
              <Link to="/techDueDocuments"><button id='backbutton'>Активные</button></Link><br /><br />
              <Link to="/techOldDocuments"><button id='backbutton'>Завершенные</button></Link>
            </div>
          </div>
        }
        else if (role === 'admin') {
          return <div className='rootTutor'>
            <KPINavbar />
            <div className='tutorcontent'>
              <h2>Кабинет администратора</h2>
              <Link to="/addUser"><button className='navbarbutton'>Добавить пользователя&nbsp;<MdNoteAdd style={{ verticalAlign: 'middle', marginTop: '-4px' }} /></button></Link> <br /><br /><br />
            </div>
          </div>
        }
        else if (role === 'accounting') {
          return <Navigate to='/accounting' />
        }
        else if (role === 'ai_sana') {
          return <Navigate to='/aisanadocslist' />
        }
        else if (role === 'education_process_hq') {
          return <Navigate to='/tutorpenalty' />
        }
        else if (role === 'csei') {
          return <Navigate to='/cseipage' />
        }
        else if (role === 'admission_bonus') {
          return <Navigate to='/tutorproforientation' />
        }
        else if (role === 'science_secretary') {
          return <Navigate to='/science_secretary_page' />
        }
        else if (role === 'admissionadmin') {
          return <Navigate to='/applicants' />
        }
        else if (role === 'photo_admin') {
          return <Navigate to='/photoadminpage' />
        }
        else if (role === 'hradmin') {
          return <Navigate to='/employeelist' />
        }
        else if (role === 'admissionstats') {
          return <Navigate to='/admission_statistics' />
        }
        else if (role === 'dean_students') {
          return <Navigate to='/dormrequests' />
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
                  <select onChange={handleSelectChange} className='btnNeutral'>
                    {options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                  <br /><br />
                  {searchtype == 'name' ? <div><input type="text" id='inputSearchBookByName' className='btnNeutral' maxLength={100} placeholder='Поиск по названию'></input>&nbsp;<button id="navbarbutton" style={{ backgroundColor: '#088c64', color: 'white' }} onClick={() => findBookName()}>Найти</button></div> : ''}
                  {searchtype == 'keywords' ? <div><input type="text" id='inputSearchBookByKeyWords' className='btnNeutral' maxLength={100} placeholder='Поиск по ключевым словам'></input>&nbsp;<button id="navbarbutton" style={{ backgroundColor: '#088c64', color: 'white' }} onClick={() => findBookKeyWords()}>Найти</button></div> : ''}
                  {searchtype == 'isbn' ? <div><input type="text" id='inputSearchBookByISBN' className='btnNeutral' maxLength={100} placeholder='Поиск по ISBN'></input>&nbsp;<button id="navbarbutton" style={{ backgroundColor: '#088c64', color: 'white' }} onClick={() => findBookISBN()}>Найти</button></div> : ''}
                  {searchtype == 'inventory' ? <div><input type="text" id='inputSearchBookByInventory' className='btnNeutral' maxLength={100} placeholder='Поиск по инвентарному номеру'></input>&nbsp;<button id="navbarbutton" style={{ backgroundColor: '#088c64', color: 'white' }} onClick={() => findBookInventory()}>Найти</button></div> : ''}
                  {searchtype == 'barcode' ? <div><input type="text" id='inputSearchBookByBarcode' className='btnNeutral' maxLength={100} placeholder='Поиск по штрихкоду'></input>&nbsp;<button id="navbarbutton" style={{ backgroundColor: '#088c64', color: 'white' }} onClick={() => findBookBarcode()}>Найти</button></div> : ''}
                  <br /><br /><br />
                  <Link to="/ebooks"><button className='navbarbutton'>Список электронных книг &nbsp;<FaDisplay style={{ verticalAlign: 'middle', marginTop: '-4px' }} /></button></Link><br /><br />
                  <br />
                  <Link to="/duebooks"><button className='redbutton'>Должники &nbsp;<IoIosAlarm style={{ verticalAlign: 'middle', marginTop: '-4px' }} /></button></Link>
                </td>
                <td style={{ width: '15%' }}></td>
                <td>
                  {booksParsed.length > 0 ? <>
                    <br />
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
          return <div><center><h3>Произошла внутренняя ошибка</h3><button id="backbutton" onClick={() => store.logout()}>Выйти</button></center></div>
        }
      })()}
    </div>
  );
}

export default observer(HomePage)