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
            //countCategoryScores();
            //alert(categoryScores[0]);
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
              return <div>
              <button onClick={() => store.logout()}>Выйти</button>
              <h1>{store.isAuth ? `Добро пожаловать, ${store.user.lastname} ${store.user.name}`  : 'АВТОРИЗУЙТЕСЬ'}</h1>       
              <button onClick={open}>Получить новую справку</button>
              <Link to="/list"><button onClick={()=> store.getCert()}>История подачи справок</button></Link>

              {modal && <CreateCert />}  </div>
            }
            else if(role==='plt_tutor'){
              return <div>
              <button onClick={() => store.logout()}>Выйти</button>
              <h2>{store.isAuth ? `Добро пожаловать, ${store.user.lastname} ${store.user.name}`  : 'АВТОРИЗУЙТЕСЬ'}</h2>       
              <h3>Кафедра {localStorage.getItem('cafedraname')}</h3>
              {/* <h4>Баллы KPI: <b style={{color: "yellow"}}>{localStorage.getItem('KPIScore')}</b></h4> */}
              <h4>Баллы KPI: <b style={{color: textcolor}}>{kpiInfo.toString()}</b></h4>
              <h4>{premiere ? `Премирование: ${premiere}`:''}</h4>
              <Link to="/kpi"><button>Загрузить документы</button></Link>
              <br/><br/><br/>
              <KPICategoryScores/>
              </div>
            }
            else if(role==='plt_kpiadmin'){
              return <div>
              <button onClick={() => store.logout()}>Выйти</button>
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
                    <p><button onClick={() => redirectCafedra('7','Информационных систем и технологий')}>Информационных систем и технологий</button></p>
                    <p><button onClick={() => redirectCafedra('15','Социально-гуманитарных дисциплин')}>Социально-гуманитарных дисциплин</button></p>
                    <p><button onClick={() => redirectCafedra('13','Международной торговли и Права')}>Международной торговли и Права</button></p>
                    <p><button onClick={() => redirectCafedra('2','Социальная работа и туризм')}>Социальная работа и туризм</button></p>
                  </td>
                  <td>
                    <p><button onClick={() => redirectCafedra('1','Финансы')}>Финансы</button></p>
                    <p><button onClick={() => redirectCafedra('3','Экономика')}>Экономика</button></p>
                    <p><button onClick={() => redirectCafedra('4','Менеджмент')}>Менеджмент</button></p>
                    <p><button onClick={() => redirectCafedra('5','Учет и аудит')}>Учет и аудит</button></p>
                  </td>
                </tr>
                </tbody>
              </table>    
              
              <br/><br/>
              <p><Link to="/kpistats"><button>Сводка по кафедрам</button></Link></p>
              <p><Link to="/kpitopten"><button>Топ-10 преподавателей</button></Link></p>
              </div>
            }
            else{
              <h3>internal error</h3>
            }
            return;
          } )()}
    </div>
  );
}

export default observer(HomePage)