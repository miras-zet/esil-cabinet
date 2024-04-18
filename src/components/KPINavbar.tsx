import {FC, useContext} from "react";
import { observer } from "mobx-react-lite";
import '../App.css';
import { Context } from "../main";
import { TbLogout } from "react-icons/tb";

const KPINavbar: FC = () => {
    const {store} = useContext(Context); 
    const data = JSON.parse(localStorage.getItem('data'));
    const FIO = data.lastname+' '+data.name+' '+data.middlename;
    const role = localStorage.getItem('role');
    let headertext='';
    switch(role){
        case 'plt_tutor': headertext='Система учета баллов KPI'; break;
        case 'plt_kpiadmin': headertext='Администратор системы KPI'; break;
        case 'plt_applicant': headertext='Кабинет абитуриента ESIL University'; break;
        case 'plt_student': headertext='Кабинет студента ESIL University'; break;
        case 'admissionadmin': headertext='Приёмная комиссия ESIL University'; break;
        case 'admissionstats': headertext='Статистика абитуриентов ESIL University'; break;
        case 'reader': headertext='Электронная библиотека ESIL University'; break;
        case 'technician': headertext='Отдел технического обслуживания и ремонта'; break;
        case 'librarian': headertext='Электронная библиотека и система учёта книг ESIL University'; break;
        default: headertext='ESIL University';
    }
    return(
        <div>
            <div className="topnav">
              <img src="logo_new.png" width={150}/>
              <div className='navbartitle'>{headertext}</div>      
            </div> 
            <div className="topnav2">
            {localStorage.getItem('role')=='plt_tutor' ? <div className='navbarname'>Кафедра {localStorage.getItem('cafedraname')}</div>:<div></div>}
              <div className='navbarname'>{FIO}</div>     
              <button className='navbarbutton' onClick={() => store.logout()}>Выйти <TbLogout  style={{verticalAlign:'middle', marginTop:'-3px'}}/></button>
            </div> 
        </div>
    )
};

export default observer(KPINavbar);