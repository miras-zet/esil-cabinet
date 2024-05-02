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
import { FaArrowRight, FaBook, FaUpload } from 'react-icons/fa';
import { IoIosAlarm } from "react-icons/io";
import { MdNoteAdd } from 'react-icons/md';

// import dotenv from 'dotenv';
// dotenv.config();
// const api_url=process.env.REACT_APP_API_URL;

const HomePage:FC = () => {  
  const {store} = useContext(Context);  
  const {modal, open} = useContext(ModalContext); 
  const [kpiInfo, setKpiInfo] = useState<Array<IKPI>>([]);
  
 useEffect(() => {
    setKpiInfo([]);
    //setCategoryScores([]);
    // USEEFFECT DOES NOT WORK ON FIRST RENDER (FIX ASAP)

    if (localStorage.getItem('token')){
      store.checkAuth()
    }    
  },[])
  
  // const kpiItems = kpiInfo.map((element)=>
  //   [element.score]
  // );

  if (store.isLoading){
    return <div>Loading ...</div>
  }

 
  if (!store.isAuth) {
    return (
        <div>
            <LoginForm/>            
        </div>
    );
  } 
  
  if(store.certificat?.id !== 0 && store.certificat?.id !== undefined){
    return <Navigate to='/certificate' />;
  } 

  function redirectCafedra(id:string, name:string)  {
    localStorage.setItem('cafedraid',id);
    localStorage.setItem('cafedraname',name);
    window.location.href=window.location.protocol + '//' + window.location.host +'/kpiadmin';
    return;
  }
  function redirectTopTen(toptentype:string)  {
    localStorage.setItem('toptentype',toptentype);
    window.location.href=window.location.protocol + '//' + window.location.host +'/kpitopten';
    return;
  }

  const countKpi = ()=>{
    UploadService.getKpi()
    .then(
      (response) => {
        localStorage.setItem('KPIScore',response.data.score)
        return setKpiInfo(response.data.score);
      }
    );
  }
  
  return (
    <div>
        {(() => {
            countKpi();
            const role = localStorage.getItem('role');
            let KPIScore="0";
            let textcolor;
            if(kpiInfo===undefined && role==='plt_tutor'){
              location.reload();
            }
            if(role==='plt_tutor') KPIScore = localStorage.getItem('KPIScore');
            let premiere="";
            if (parseInt(KPIScore)==0){
              premiere= "Нет";
            }
            if (parseInt(KPIScore)>0){
              premiere= "C";
            }
            if (parseInt(KPIScore)>=50){
              premiere= "B"; 
            }
            if (parseInt(KPIScore)>=84){
              premiere= "A";
            }
            if (parseInt(KPIScore)>=100) textcolor='orange';
            if (parseInt(KPIScore)>=200){
              premiere= "Silver";
            }
            if (parseInt(KPIScore)>=300){
              premiere= "Gold";
            }
            if (parseInt(KPIScore)>=400){
              premiere= "Platinum";
            }
            if (parseInt(KPIScore)==0){
              premiere="Нет";
            }
            if(role==='plt_student'){
              return <div className='root'>
              <button onClick={() => store.logout()}>Выйти</button>
              <h1>{store.isAuth ? `Добро пожаловать, ${store.user.lastname} ${store.user.name}`  : 'АВТОРИЗУЙТЕСЬ'}</h1>       
              <button className='navbarbutton' onClick={open}>Получить новую справку</button>
              <Link to="/list"><button className='navbarbutton' onClick={()=> store.getCert()}>История подачи справок</button></Link>

              {modal && <CreateCert />}  </div>
            }
            else if(role==='plt_tutor'){
              return <div className='rootTutor'>
              <KPINavbar/>       
              <div className='tutorcontent'>
                <h4 style={{fontSize:35}}>Баллы KPI: <b style={{color: textcolor}}>{kpiInfo.toString()}</b></h4>
                <h4 style={{fontSize:20}}>{premiere ? `Премирование: ${premiere} `:''}{parseInt(KPIScore)>=200 ?<HiSparkles style={{verticalAlign:'middle', marginTop:'-7px'}}/>:''}</h4>
                <Link to="/kpi"><button className='navbarbutton'>Загрузить документы &nbsp;&nbsp;<FaUpload /></button></Link>
                <h5>* Каждый несёт персональную ответственность за ввод данных в систему оценки KPI.</h5>
                <KPICategoryScores/>
                </div>
              </div>
            }
            else if(role==='technician'){
              return <div className='rootTutor'>
              <KPINavbar/>       
              <div className='tutorcontent'>
                <h2>Кабинет ОТОиР</h2>
                <Link to="/techNewDocument"><button className='navbarbutton'>Новое представление &nbsp;<MdNoteAdd style={{verticalAlign:'middle', marginTop:'-4px'}}/></button></Link> <br/><br/><br/>
                <Link to="/techDueDocuments"><button>Активные</button></Link><br/><br/>
                <Link to="/techOldDocuments"><button>Завершенные</button></Link>
                </div>
              </div>
            }
            else if (role==='admissionadmin'){
              return <Navigate to='/applicants'  />
            }
            else if (role==='admissionstats'){
              return <Navigate to='/admission_statistics'  />
            }
            else if (role==='reader'){
              return <div className='root'>
              <KPINavbar/>
              <br/>
              <h2>Добро пожаловать!</h2>
              <h3>Электронная библиотека ESIL University</h3>
              <Link to="/ebooks"><button className='navbarbutton'>Электронные книги &nbsp;<FaBook style={{verticalAlign:'middle', marginTop:'-4px'}}/></button></Link><br/><br/>
              </div>
            }
            else if (role==='librarian'){
              return <div style={{textAlign:'left', width:'1000px'}}>
              <KPINavbar/>
              <br/>
              <h2>Добро пожаловать!</h2>
              <br/>
              <Link to="/ebooks"><button className='navbarbutton'>Список электронных книг &nbsp;<FaBook style={{verticalAlign:'middle', marginTop:'-4px'}}/></button></Link><br/><br/>
              <Link to="/physicalbooks"><button className='navbarbutton'>Список книг &nbsp;<FaBook style={{verticalAlign:'middle', marginTop:'-4px'}}/></button></Link><br/><br/><br/>
              <Link to="/bookassignment"><button className='navbarbutton'>Выдать книгу &nbsp;<FaBook style={{verticalAlign:'middle', marginTop:'-4px'}}/><FaArrowRight style={{verticalAlign:'middle', marginTop:'-4px'}}/></button></Link><br/><br/>
              <Link to="/duebooks"><button className='redbutton'>Должники &nbsp;<IoIosAlarm style={{verticalAlign:'middle', marginTop:'-4px'}}/></button></Link>
              </div>
            }
            else if(role==='plt_kpiadmin'){
              return <div className='root'>
              <KPINavbar/>
              <br/><br/><br/><br/><br/>
              <h2>{store.isAuth ? `Кабинет администратора KPI`  : 'АВТОРИЗУЙТЕСЬ'}</h2> 
              <br/><br/>  
              <table>
                <tbody>
                <tr>
                  <th>Факультет прикладных наук</th>  
                  <th>Факультет бизнеса и управления</th>  
                </tr>
                <tr>
                  <td>
                    <p><button className="backbutton" onClick={() => redirectCafedra('7','Информационных систем и технологий')}>Информационных систем и технологий</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('15','Социально-гуманитарных дисциплин')}>Социально-гуманитарных дисциплин</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('13','Международной торговли и Права')}>Международной торговли и Права</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('2','Социальная работа и туризм')}>Социальная работа и туризм</button></p>
                  </td>
                  <td>
                    <p><button className="backbutton" onClick={() => redirectCafedra('1','Финансы')}>Финансы</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('3','Экономика')}>Экономика</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('4','Менеджмент')}>Менеджмент</button></p>
                    <p><button className="backbutton" onClick={() => redirectCafedra('5','Учет и аудит')}>Учет и аудит</button></p>
                  </td>
                </tr>
                </tbody>
              </table>    
              
              <br/><br/>
              <p><Link to="/kpistats"><button className="backbutton">Сводка по кафедрам</button></Link></p>
              <p><button className="backbutton" onClick={() => redirectTopTen('6')}>Топ-10 преподавателей (все преподаватели)</button></p>
              <br/>
              <p><button className="backbutton" onClick={() => redirectTopTen('0')}>Топ-10 преподавателей (без звания)</button></p>
              <p><button className="backbutton" onClick={() => redirectTopTen('2')}>Топ-10 преподавателей (доцент / ассоц. профессор)</button></p>
              <p><button className="backbutton" onClick={() => redirectTopTen('3')}>Топ-10 преподавателей (профессор)</button></p>
              </div>
            }
            else{
              return <div><center><h3>Произошла внутренняя ошибка</h3><button onClick={() => store.logout()}>Выйти</button></center></div>
            }
          } )()}
    </div>
  );
}

export default observer(HomePage)