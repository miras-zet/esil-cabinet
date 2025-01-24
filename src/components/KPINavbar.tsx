import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import '../App.css';
import { Context } from "../main";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import INotificationIconData from "../models/INotificationIconData";
import NotificationService from "../services/NotificationService";
import { FaBell } from "react-icons/fa";
import config from "../http/version.json";
import logo from "/logo_new.png";
import InfoService from "../services/InfoService";

export const buildVer = config.buildVer;

const KPINavbar: FC = () => {
  const { store } = useContext(Context);
  const [notificationData, setNotificationData] = useState<Array<INotificationIconData>>([]);
  useEffect(() => {
    NotificationService.getIconData().then((response) => {
      setNotificationData(response.data);
    });
    InfoService.getRoleInfo().then((response) => {
      localStorage.setItem('role',response.data);
    });

  }, []);
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const toMain = () => {
    navigate('/');
  }


  let FIO = '';
  if (data) FIO = data.lastname + ' ' + data.name + ' ' + data.middlename;
  const role = localStorage.getItem('role');
  let headertext = '';
  switch (role) {
    case 'plt_tutor': headertext = 'Кабинет ППС Esil University'; break;
    case 'plt_employee': headertext = 'Кабинет сотрудника Esil University'; break;
    case 'plt_kpiadmin': headertext = 'Администратор системы KPI'; break;
    case 'plt_applicant': headertext = 'Кабинет абитуриента Esil University'; break;
    case 'plt_graduate': headertext = 'Выпускник Esil University'; break;
    case 'plt_student': headertext = 'Кабинет обучающегося Esil University'; break;
    case 'admissionadmin': headertext = 'Приёмная комиссия Esil University'; break;
    case 'admissionstats': headertext = 'Статистика абитуриентов Esil University'; break;
    case 'dean_students': headertext = 'Кабинет декана по работе со студентами'; break;
    case 'reader': headertext = 'Электронная библиотека Esil University'; break;
    case 'technician': headertext = 'Отдел технического обслуживания и ремонта'; break;
    case 'librarian': headertext = 'Электронная библиотека и система учёта книг Esil University'; break;
    case 'hradmin': headertext = 'Управление персоналом Esil University'; break;
    case 'csei': headertext = 'Кабинет ЦСЭИ Esil University'; break;
    case 'education_process_hq': headertext = 'Кабинет УПиМУП Esil University'; break;
    default: headertext = 'Кабинет Esil University';
  }
  if(window.location.port=='5173') document.title = 'dev build';
  else if(headertext!='') document.title=headertext;
  return (
    <div>
      <div className="topnav" style={{zIndex:'999'}}>
        <div style={{ marginLeft: '-100px', backgroundColor: 'white', height: '115%' }}>&nbsp;</div>
        <img onClick={() => toMain()} src={logo} width={150} />
        <div className='navbartitle'>{window.location.port=='5173'? <a style={{color:'red', fontWeight:'bold'}}>DEVELOPMENT VERSION, BUILD v{buildVer}</a>:headertext}</div>
      </div>
      <div className="topnav2" style={{zIndex:'999'}}>
      {localStorage.getItem('role') == 'plt_tutor' ? <div className='navbarname'>Кафедра {localStorage.getItem('cafedraname')}</div> : <div></div>}
        <div>
          {!window.location.href.includes('notifications') ? notificationData[0]?.unread_count > 0 ?
            <><Link style={{ color: 'white' }} to='/notifications'>
              <div>
                <div style={{ position: 'absolute', fontSize:'9pt', borderRadius: '100px', backgroundColor: 'red', verticalAlign: 'middle', textAlign: 'center', marginTop: '-12px', marginLeft: '44px', paddingTop: '2px', width: '20px', height: '20px' }}><b>{notificationData[0].unread_count}</b></div>
                <button style={{ backgroundColor: '#0b9e72', borderRadius: '100px', verticalAlign: 'middle' }}>
                  <FaBell style={{ fontSize: '15pt', backgroundColor: '#0b9e72' }} />
                </button>
              </div>
            </Link></>
            :
            <><Link style={{ color: 'white' }} to='/notifications'>
              <div>
                <button style={{ backgroundColor: '#0b9e72', borderRadius: '100px', verticalAlign: 'middle' }}>
                  <FaBell style={{ fontSize: '15pt', backgroundColor: '#0b9e72' }} />
                </button>
              </div>
            </Link></>
            : ''

          }


        </div>
        
        <div className='navbarname'>{FIO}</div>
        <button className='navbarbutton' onClick={() => store.logout()}>Выйти <TbLogout style={{ verticalAlign: 'middle', marginTop: '-3px' }} /></button>
      </div>
    </div>
  )
};

export default observer(KPINavbar);