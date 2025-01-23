import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate} from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import ITutorForHR from '../models/ITutorForHR';
import { exportHtmlTableToExcel } from '../models/exportHtmlTableToExcel';
import moment from 'moment';
import DocsService from '../services/DocsService';

const TutorPenalty:FC = () => {  
  const {store} = useContext(Context);  
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  const [tutorInfos, setTutorInfos] = useState<Array<ITutorForHR>>([]);
  moment.locale('ru');
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('data'));
    // if (user) {
    //   setUser(user);
    // }
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    DocsService.getTutorListPenalty().then((response) => {
      setTutorInfos(response.data);
    });

  }, [])

// useEffect(()=>{
//   setModal(modals)
// },[])
  
  const handleExport = () => {
    exportHtmlTableToExcel('opaqueTable', `Нарушения ППС ${moment(Date.now()).format("LL")}`, [20, 260, 50, 80],[]);
  };
  const createPenalty = (userid,penalty_type) =>{
    DocsService.createPenalty(userid,penalty_type).then(() => {
        location.reload();
    });
  }
  const deletePenalty = (userid,penalty_type) =>{
    DocsService.deletePenalty(userid,penalty_type).then(() => {
        location.reload();
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
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.penalty_hr == 0 ? <><br/><button className='backbutton' onClick={()=>createPenalty(element.userid, 'penalty_hr')}>Записать нарушение</button></>:<><p>Имеется нарушение</p><button className="redbutton" onClick={()=>deletePenalty(element.userid, 'penalty_hr')}>Удалить</button></>}&nbsp;<br/><br/></td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.penalty_ed == 0 ? <><br/><button className='backbutton' onClick={()=>createPenalty(element.userid, 'penalty_ed')}>Записать нарушение</button></>:<><p>Имеется нарушение</p><button className="redbutton" onClick={()=>deletePenalty(element.userid, 'penalty_ed')}>Удалить</button></>}&nbsp;<br/><br/></td>
        </tr>
    );
  
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
          if(role == 'education_process_hq' || role == 'hradmin') {
          return <div>
              <KPINavbar/>  
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <div className=''> 
                <h2>Нарушения ППС за {localStorage.getItem('month_query')==='previous'?'предыдущий':'текущий'} месяц</h2>
                <h4>({tutorList.length} преподавателей)</h4> 
                <button className='navbarbutton' onClick={handleExport}>Экспорт</button><br/>
                        {/* <Link to={"/dormrequests"}><button className='graybutton'>Заявки на общежитие</button></Link> <br /><br /> */}
                        <br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Несоблюдение кодекса чести<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Нарушение труд. дисциплины<br />&nbsp;</th>
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

export default observer(TutorPenalty)