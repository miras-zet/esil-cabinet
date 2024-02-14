import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link} from 'react-router-dom';
import '../App.css';
import ITutors from '../models/ITutors';
import UploadService from '../services/UploadService';

const KPIAdminPage:FC = () => {  
  const {store} = useContext(Context);  
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  
  const [tutorInfos, setTutorInfos] = useState<Array<ITutors>>([]);
 useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('data'));
    // if (user) {
    //   setUser(user);
    // }
    if (localStorage.getItem('token')){
      store.checkAuth()
    }    
    UploadService.getTutors().then((response) => {
        setTutorInfos(response.data);
    }); 
     
  },[])

// useEffect(()=>{
//   setModal(modals)
// },[])
  

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

function redirectViewUser(id:any, fio: any)  {
    localStorage.setItem('user_id_view',id);
    localStorage.setItem('fio_view',fio);
    localStorage.setItem('currentlyviewing','cafedratutors');
    window.location.href=window.location.protocol + '//' + window.location.host +'/kpiadminview';
    return;
  }

  const listTutors = tutorInfos.map((element) =>  
  <tr key={element.userid}>
    {/* <td><a onClick={redirectViewUser(element.userid)}>{element.fio}</a></td>  */}
      <td>{element.fio}</td> 
      <td><b>{element.score}</b></td>
      <td>&nbsp;&nbsp;<button onClick={()=>redirectViewUser(element.userid, element.fio)}>Просмотр</button></td>
  </tr>
);
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
        const cafedraname = localStorage.getItem('cafedraname');
        if(role=='plt_kpiadmin') {
          return <div>
              <Link to={"/"} className='btn'>Вернуться назад</Link> 
              <br/><br/>
              <h3>Баллы ППС</h3> 
              <h4>Кафедра {cafedraname}</h4> 
              <br></br>
              <center>
                <table style={{textAlign: "center"}}><tbody>
                <tr>
                    <th>ФИО</th>
                    <th>&nbsp;&nbsp;Баллы</th>
                    <th>&nbsp;&nbsp;Действия</th>
                </tr>
                {listTutors}
          
                </tbody>
                </table>
               </center>
              {/* <p><button onClick={() => redirect('1')}>-</button></p> */}
             
        </div>
        }
        else{
          return <div><button onClick={() => store.logout()}>Назад</button>  
          <h4>Нет доступа к странице</h4></div>
        }
      } )()}
        
     
        
         
    </div>
  );
}

export default observer(KPIAdminPage)