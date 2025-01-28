import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate} from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import ITutorForCSEI from '../models/ITutorForCSEI';
import moment from 'moment';
import DocsService from '../services/DocsService';
import { IoMdCheckmark } from 'react-icons/io';

const TutorCSEI:FC = () => {  
  const {store} = useContext(Context);  
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  const [tutorInfos, setTutorInfos] = useState<Array<ITutorForCSEI>>([]);
  moment.locale('ru');
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('data'));
    // if (user) {
    //   setUser(user);
    // }
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    DocsService.getTutorListCSEI().then((response) => {
      setTutorInfos(response.data);
    });

  }, [])

// useEffect(()=>{
//   setModal(modals)
// },[])
  
  const approveCSEI = (userid,category) =>{
    DocsService.approveCSEI(userid,category).then((response) => {
      setTutorInfos(response.data);
    });
  }
  const denyCSEI = (userid,category) =>{
    DocsService.denyCSEI(userid,category).then((response) => {
      setTutorInfos(response.data);
    });
  }
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
  // function redirect(id,fio)  {
  //   localStorage.setItem('viewinguserid',id);
  //   localStorage.setItem('viewinguserfio',fio);
  //   window.location.href=window.location.protocol + '//' + window.location.host +'/tutorpage';
  //   return;
  // }
  const tutorList = tutorInfos.map((element, index) =>
        <tr key={element.userid} style={{ textAlign: 'center' }}>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;&nbsp;&nbsp;{index + 1}&nbsp;&nbsp;&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.fio}&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.grants == 0 ? <><br/><button className='backbutton' onClick={()=>approveCSEI(element.userid,'grants')}>Подтвердить</button></>:<><p>Подтверждено <IoMdCheckmark /></p><button className="redbutton" onClick={()=>denyCSEI(element.userid,'grants')}>Удалить</button></>}&nbsp;<br/><br/></td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.nirs == 0 ? <><br/><button className='backbutton' onClick={()=>approveCSEI(element.userid,'nirs')}>Подтвердить</button></>:<><p>Подтверждено <IoMdCheckmark /></p><button className="redbutton" onClick={()=>denyCSEI(element.userid,'nirs')}>Удалить</button></>}&nbsp;<br/><br/></td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.science_event == 0 ? <><br/><button className='backbutton' onClick={()=>approveCSEI(element.userid,'science_event')}>Подтвердить</button></>:<><p>Подтверждено <IoMdCheckmark /></p><button className="redbutton" onClick={()=>denyCSEI(element.userid,'science_event')}>Удалить</button></>}&nbsp;<br/><br/></td>
        </tr>
    );
  
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
          if(role == 'csei') {
          return <div>
              <KPINavbar/>  
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <div className=''> 
                <h2>Показатели ППС за {localStorage.getItem('month_query')==='previous'?'предыдущий':'текущий'} месяц</h2>
                <h4>({tutorList.length} преподавателей)</h4> 
                <br/>
                        {/* <Link to={"/dormrequests"}><button className='graybutton'>Заявки на общежитие</button></Link> <br /><br /> */}
                        <br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Подготовка грантов<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Руководство НИРС<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Участие в научных меропр.<br />&nbsp;</th>
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

export default observer(TutorCSEI)