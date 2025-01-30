import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import {  Navigate} from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import moment from 'moment';
import DocsService from '../services/DocsService';
import ITutorForAdmission from '../models/ITutorForAdmission';
import UploadService from '../services/UploadService';


const TutorProforientation:FC = () => {  
  const {store} = useContext(Context);  
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  const [tutorInfos, setTutorInfos] = useState<Array<ITutorForAdmission>>([]);
  moment.locale('ru');

  const setValues = () =>{
    for (const row of tutorInfos){
      (document.getElementById(row.userid+'input') as HTMLInputElement).value = row.proforientation+'';
    }
  }
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('data'));
    // if (user) {
    //   setUser(user);
    // }
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    DocsService.getTutorListAdmission().then((response) => {
      setTutorInfos(response.data);   
      setTimeout(function () {
        document.getElementById('toClick').click();
        console.log('clicked');
      }, 1000)
    });
    

  }, [])

// useEffect(()=>{
//   setModal(modals)
// },[])
  
  // const approveAuditorium = (userid) =>{
  //   DocsService.approveAuditorium(userid).then(() => {
  //       location.reload();
  //   });
  // }
  // const denyAuditorium = (userid) =>{
  //   DocsService.denyAuditorium(userid).then(() => {
  //       location.reload();
  //   });
  // }
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
  const updateStudentCount = (userid) => {

    UploadService.updateProforientationAdmission(userid,(document.getElementById(userid+'input') as HTMLInputElement).value)
        .then((response) => {
          setTutorInfos(response.data);
          (document.getElementById(userid+'button') as HTMLButtonElement).style.backgroundColor='#088c64';
          (document.getElementById(userid+'button') as HTMLButtonElement).innerText='Сохранено';
          (document.getElementById(userid+'button') as HTMLButtonElement).style.color='white';
        })
        .catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Ошибка");
            }
        });
  }
  const tutorList = tutorInfos.map((element, index) =>
        <tr key={element.userid} style={{ textAlign: 'center' }}>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;&nbsp;&nbsp;{index + 1}&nbsp;&nbsp;&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.fio}&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;<br/><input type="number" onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }} style={{width:'45px'}}className='btnNeutral' id={element.userid+'input'}></input>&nbsp;<button className='backbutton' id={element.userid+'button'} onClick={()=>updateStudentCount(element.userid)}>Сохранить</button>&nbsp;
      <br/><br/></td>
        </tr>
    );
  
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
          if(role == 'admission_bonus') {
          return <div>
              <KPINavbar/>  
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <div className=''> 
              <button id='toClick' style={{visibility:'hidden'}} onLoad={()=>alert('a')} onClick={() => setValues()}>загрузить</button>
                <h2>Количество приведенных абитуриентов (по ППС) за {localStorage.getItem('month_query')==='previous'?'предыдущий':'текущий'} учебный год</h2>
                <h4>({tutorList.length} преподавателей)</h4> 
                <br />
                <br/>
                        {/* <Link to={"/dormrequests"}><button className='graybutton'>Заявки на общежитие</button></Link> <br /><br /> */}
                        <br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Количество<br />&nbsp;</th>
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

export default observer(TutorProforientation)