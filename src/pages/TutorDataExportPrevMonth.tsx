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

const TutorDataExportPrevMonth:FC = () => {  
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
    CafedraService.getAllTutorBonusDataPrevMonth().then((response) => {
      setTutorInfos(response.data);
    });

  }, [])

// useEffect(()=>{
//   setModal(modals)
// },[])
  
  const handleExport = (tableid) => {
    exportHtmlTableToExcel(tableid, `Баллы ППС кафедры ${tableid} (за предыдущий месяц)`, [20, 260, 50, 80],[]);
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

  const departments = {
    "Финансы": [],
    "Социальная работа и туризм": [],
    "Экономика и маркетинг": [],
    "Менеджмент": [],
    "Учет и аудит": [],
    "Информационных систем и технологии": [],
    "Право": [],
    "Социально-гуманитарных дисциплин": []
  };
  tutorInfos.forEach(tutor => {
    if (departments[tutor.cafedra]) {
        departments[tutor.cafedra].push(tutor);
    } else {
        console.warn(`Unknown cafedra: ${tutor.cafedra}`);
    }
  });
  const departmentTables = Object.entries(departments).map(([departmentName, tutors]) => (
    <div key={departmentName} style={{ marginBottom: '20px' }}>
        <h3 style={{ textAlign: 'center' }}>{departmentName}</h3>
        <button className='navbarbutton' onClick={()=>handleExport(departmentName)}>Экспорт</button><br/><br/>
        <table id={departmentName} border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ФИО</th>
                    <th>Оценка</th>
                    <th>Бонус</th>
                </tr>
            </thead>
            <tbody>
                {tutors.length > 0 ? (
                    tutors.map((element, index) => (
                        <tr key={element.userid} style={{ textAlign: 'center' }}>
                            <td style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{index + 1}</td>
                            <td style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.fio}</td>
                            <td style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.score}</td>
                            <td style={{ verticalAlign: 'middle', fontSize: '13pt' }}>
                                + {parseInt(element.bonus) !== 0 ? element.bonus + '0 %' : '0 %'}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} style={{ textAlign: 'center' }}>Загрузка.. Пожалуйста, подождите</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
));
  // const tutorList = tutorInfos.map((element, index) =>
  //       <tr key={element.userid} style={{ textAlign: 'center' }}>
  //           <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;&nbsp;&nbsp;{index + 1}&nbsp;&nbsp;&nbsp;</td>
  //           <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.fio}&nbsp;</td>
  //           <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.cafedra}&nbsp;</td>
  //           <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.score}&nbsp;</td>
  //           <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>+ {parseInt(element.bonus) != 0 ? element.bonus+'0 %':'0 %'}</td>
  //       </tr>
  //   );
  
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
          if(role == 'accounting') {
          return <div>
              <KPINavbar/>  
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <div className=''> 
                <h2>Баллы ППС за предыдущий месяц</h2>
                {departmentTables}
                
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

export default observer(TutorDataExportPrevMonth)