import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate} from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import ITutorForAccounting from '../models/ITutorForAccounting';
import CafedraService from '../services/CafedraService';
import { exportHtmlTableToExcel } from '../models/exportHtmlTableToExcel';
import moment from 'moment';

const TutorDataExport:FC = () => {  
  const {store} = useContext(Context);  
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  const [tutorInfos, setTutorInfos] = useState<Array<ITutorForAccounting>>([]);
  moment.locale('ru');
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('data'));
    // if (user) {
    //   setUser(user);
    // }
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    CafedraService.getAllTutorBonusData().then((response) => {
      setTutorInfos(response.data);
    });

  }, [])

// useEffect(()=>{
//   setModal(modals)
// },[])
  
  const handleExport = () => {
    exportHtmlTableToExcel('opaqueTable', `Баллы ППС ${moment(Date.now()).format("LL")}`, [20, 260, 50, 80],[]);
  };
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
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.score}&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>+ {parseInt(element.bonus) != 0 ? element.bonus+'0 %':'0 %'}</td>
        </tr>
    );
  
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
          if(role == 'accounting') {
          return <div>
              <KPINavbar/>  
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <div className=''> 
                <h2>Баллы ППС за текущий месяц</h2>
                <h4>({tutorList.length} преподавателей)</h4> 
                <button className='navbarbutton' onClick={handleExport}>Экспорт</button><br/>
                        {/* <Link to={"/dormrequests"}><button className='graybutton'>Заявки на общежитие</button></Link> <br /><br /> */}
                        <br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Баллы<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Премирование<br />&nbsp;</th>
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

export default observer(TutorDataExport)