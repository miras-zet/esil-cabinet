import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import '../App.css';
import UploadService from '../services/UploadService';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import ITopTen from '../models/ITopTen';

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
        <td>&nbsp;&nbsp;<a onClick={()=>redirectViewUser(element.userid, element.fio)}>{element.fio}</a></td>
        <td>&nbsp;&nbsp;{element.cafedraNameRU}</td>
        <td>{element.score}</td>
        <td>{element.kkson_count} (+{element.kkson_count*7})</td>
        <td>{element.scopus_count} (+{element.scopus_count*10})</td>
        <td>{element.wos_count} (+{element.wos_count*10})</td>
        <td>{element.monograph_count} (+{element.monograph_count*10})</td>
        <td>{element.international_count} (+{element.international_count*3})</td>
        <td>{element.nirs_count} (+{element.nirs_count*20})</td>
        <td>{element.nirs_count_manager} (+{element.nirs_count_manager*40})</td>
        <td>{element.tia_count} (+{element.tia_count*5})</td>
        <td>{element.h_index_scopus}</td>
        <td>{element.h_index_wos}</td>
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
        <Link to="/"><button>Вернуться назад</button></Link>
        <br/><br/>
        <div className="card mt-3" onLoad={getstats}>
            <div className="card-header">Топ-10 преподавателей</div><br/>
            <center><table style={{textAlign: "center"}}><tbody>
                <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>&nbsp;&nbsp;Кафедра</th>
                    <th>&nbsp;&nbsp;Баллы</th>
                    <th>&nbsp;&nbsp;Кол-во публикаций ККСОН</th>
                    <th>&nbsp;&nbsp;Кол-во публикаций Scopus</th>
                    <th>&nbsp;&nbsp;Кол-во публикаций Web of Science</th>
                    <th>&nbsp;&nbsp;Кол-во монографий</th>
                    <th>&nbsp;&nbsp;Кол-во международных статей</th>
                    <th>&nbsp;&nbsp;Кол-во участий в научно-исследовательских работах (исполнитель)</th>
                    <th>&nbsp;&nbsp;Кол-во участий в научно-исследовательских работах (руководитель)</th>
                    <th>&nbsp;&nbsp;Кол-во патентов</th>
                    <th>&nbsp;&nbsp;Индекс Хирша (Scopus)</th>
                    <th>&nbsp;&nbsp;Индекс Хирша (WoS)</th>
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

