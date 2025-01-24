import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate} from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import ITutorForManager from '../models/ITutorForManager';
import CafedraService from '../services/CafedraService';

const FacultyManagement:FC = () => {  
  const {store} = useContext(Context);  
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  const [tutorInfos, setTutorInfos] = useState<Array<ITutorForManager>>([]);
  
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('data'));
    // if (user) {
    //   setUser(user);
    // }
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    CafedraService.getTutorsByFaculty().then((response) => {
      setTutorInfos(response.data);
    });

  }, [])

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
  function redirect(id,fio)  {
    localStorage.setItem('viewinguserid',id);
    localStorage.setItem('viewinguserfio',fio);
    window.location.href=window.location.protocol + '//' + window.location.host +'/tutorpage';
    return;
  }

  const tutorList = tutorInfos.map((element, index) =>
        <tr key={element.userid} style={{ textAlign: 'center' }}>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;&nbsp;&nbsp;{index + 1}&nbsp;&nbsp;&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.fio}&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.academicstatus!='—'?element.academicstatus:'Без звания'}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle'}}><button className='greenbutton' onClick={() => redirect(element.userid,element.fio)}>Просмотр</button></td>
        </tr>
    );
  
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
        if(role=='plt_tutor') {
          if(localStorage.getItem('facultymanager') == '0') return <Navigate to="/ktu" />
          return <div>
              <KPINavbar/>  
              <br/><br/><br/><br/><br/><br/><br/><Link to={"/"}><button className="navbarbutton"><TiArrowBack style={{verticalAlign:'middle'}}/> Вернуться назад</button></Link> <br/>
              <div className=''>
                <h2>ППС Вашего факультета</h2>
                        {/* <Link to={"/dormrequests"}><button className='graybutton'>Заявки на общежитие</button></Link> <br /><br /> */}
                        <br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Степень<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Просмотр<br />&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            {tutorList}
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                <br/>
                
              </div>
        </div>
        }
        else{
          return <Navigate to="/"/>
        }
      } )()}

    </div>
  );
}

export default observer(FacultyManagement)