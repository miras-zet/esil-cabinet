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
    return <div>
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
                </tr>
                {listTopTenItems}

            </tbody>
            </table></center>
          </div>
        </div>
      } )()}
  </div>);
}

export default observer(KPITopTen)

