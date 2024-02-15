import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import '../App.css';
import UploadService from '../services/UploadService';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import ICafedraStat from '../models/ICafedraStat';
import IFacultyStat from '../models/IFacultyStat';

const KPIStats:FC = () => {  
      
    const [cafedraInfos, setCafedraInfos] = useState<Array<ICafedraStat>>([]);
    const [facultyInfos, setFacultyInfos] = useState<Array<IFacultyStat>>([]);
    const {store} = useContext(Context);  
    
      
      const getstats = () =>{
        UploadService.getStats().then((response) => {
            setCafedraInfos(response.data);
        }); 
        UploadService.getFacultyStats().then((response) => {
            setFacultyInfos(response.data);
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

  function redirectCafedra(id:string, name:string)  {
    localStorage.setItem('cafedraid',id);
    localStorage.setItem('cafedraname',name);
    window.location.href=window.location.protocol + '//' + window.location.host +'/kpiadmin';
    return;
  }
  const listCafedrasItems= cafedraInfos.map((element) =>  
    <tr key={element.id}>
        <td><a onClick={()=>redirectCafedra(""+element.id,element.cafedraNameRU)}>{element.cafedraNameRU}</a></td> 
        <td>&nbsp;&nbsp;{element.scoresum}</td>
        <td>&nbsp;&nbsp;{Math.round(element.scoresum/element.tutorcount)}</td>
        <td>{element.tutorcount}</td>
    </tr>
  );
  const listFacultyItems= facultyInfos.map((element) =>  
    <tr key={element.counter}>
        <td>{element.facultyNameRU}</td> 
        <td>&nbsp;&nbsp;{element.scoresum}</td>
        <td>&nbsp;&nbsp;{Math.round(element.scoresum/element.tutorcount)}</td>
        <td>{element.tutorcount}</td>
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
          <div className="card-header">Статистика по факультетам</div><br/>
            <center><table style={{textAlign: "center"}}><tbody>
                <tr>
                    <th>Факультет</th>
                    <th>&nbsp;&nbsp;Общий балл</th>
                    <th>&nbsp;&nbsp;Средний балл</th>
                    <th>&nbsp;&nbsp;Кол-во преподавателей</th>
                </tr>
                {listFacultyItems}

            </tbody>
            </table><br/>
            <div className="card-header">Статистика по кафедрам</div><br/>
            <table style={{textAlign: "center"}}><tbody>
                <tr>
                    <th>Наименование кафедры</th>
                    <th>&nbsp;&nbsp;Общий балл</th>
                    <th>&nbsp;&nbsp;Средний балл</th>
                    <th>&nbsp;&nbsp;Кол-во преподавателей</th>
                </tr>
                {listCafedrasItems}

            </tbody>
            </table></center>
          </div>
        </div>
      } )()}
  </div>);
}

export default observer(KPIStats)

