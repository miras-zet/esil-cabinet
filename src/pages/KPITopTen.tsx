import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import '../App.css';
import UploadService from '../services/UploadService';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import ITopTen from '../models/ITopTen';
import KPINavbar from '../components/KPINavbar';

const KPITopTen:FC = () => {  
      
    const [topTenInfos, setTopTenInfos] = useState<Array<ITopTen>>([]);
    const {store} = useContext(Context);  
      
      const getstats = () =>{
        UploadService.getTopTen().then((response) => {
            setTopTenInfos(response.data);
        }); 
      }
 useEffect(() => {
    if (localStorage.getItem('token')){
      store.checkAuth()
    }
    getstats();
    
  },[]);

  if (store.isLoading){
    return <div>Loading ...</div>
  }
  let toptentype=localStorage.getItem('toptentype');
        if(toptentype=='0'||toptentype=='1') toptentype='(без звания)'; 
        if(toptentype=='2') toptentype='(доцент)';
        if(toptentype=='3') toptentype='(профессор)';
        if(toptentype=='4') toptentype='(ассоциативный профессор)';
        if(toptentype=='5') toptentype='(профессор по новой квалификации)';
        if(toptentype=='6') toptentype='';
  function redirectViewUser(id:any, fio: any)  {
    localStorage.setItem('user_id_view',id);
    localStorage.setItem('fio_view',fio);
    localStorage.setItem('currentlyviewing','topten');
    window.location.href=window.location.protocol + '//' + window.location.host +'/kpiadminview';
    return;
  }
  const listTopTenItems= topTenInfos.map((element) =>  
    <tr key={element.userid}>
        <td>{element.counter}</td> 
        <td><a onClick={()=>redirectViewUser(element.userid, element.fio)}>{element.fio}</a></td>
        <td>{element.cafedraNameRU}</td>
        <td>{element.score_base}</td>
        <td>{element.score_advanced}</td>
        <td>{element.international_count}</td>
        <td>{element.kkson_count}</td>
        <td>{element.scopus_count}</td>
        <td>{element.wos_count}</td>
        <td>{element.monograph_count}</td>
        <td>{element.nirs_count}</td>
        <td>{element.tia_count}</td>
    </tr>
  );

  if (!store.isAuth) {
    return (
        <div>
            <LoginForm/>            
        </div>
    );
  } 
  
  
  return ( <div>
    {(() => {
        //getfiles();
        const role = localStorage.getItem('role');
    if(role==='plt_kpiadmin')return <div>
        <KPINavbar/>
        <br/><br/><br/><br/><br/><br/>
        <Link to="/"><button>Вернуться назад</button></Link>
        <br/><br/>
        <div className="card mt-3" onLoad={getstats}>
            <div className="card-header">Топ-10 преподавателей {toptentype}</div><br/>
            <center><table style={{textAlign: "center"}}><tbody>
                <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Кафедра</th>
                    <th>Баллы (базовый)</th>
                    <th>Баллы (расширенный)</th>
                    <th>Кол-во международных статей (+3 базовый)</th>
                    <th>Кол-во публикаций ККСОН (+7 базовый)</th>
                    <th>Кол-во публикаций Scopus (+10)</th>
                    <th>Кол-во публикаций WoS (+10)</th>
                    <th>Кол-во монографий (+10)</th>
                    <th>Кол-во участий в НИР (исполнитель +20)</th>
                    <th>Кол-во патентов (+5)</th>
                </tr>
                {listTopTenItems}

            </tbody>
            </table></center>
          </div>
        </div>
        else{
          return <div><button onClick={() => store.logout()}>Назад</button>  
          <h4>Нет доступа к странице</h4></div>
        }
      } )()}
  </div>);
}

export default observer(KPITopTen)

