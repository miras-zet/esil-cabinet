import {FC, useContext} from "react";
import { observer } from "mobx-react-lite";
import '../App.css';
import { Context } from "../main";

const KPINavbar: FC = () => {
    const {store} = useContext(Context); 
    const data = JSON.parse(localStorage.getItem('data'));
    const FIO = data.lastname+' '+data.name+' '+data.middlename;
    return(
        <div>
            <div className="topnav">
              <img src="logo_new.png" width={150}/>
              <div className='navbartitle'>Система учета баллов KPI</div>
            </div> 
            <div className="topnav2">
            <div className='navbarname'>Кафедра {localStorage.getItem('cafedraname')}</div>
              <div className='navbarname'>{FIO}</div>     
              <button className='navbarbutton' onClick={() => store.logout()}>Выйти</button>
            </div> 
        </div>
    )
};

export default observer(KPINavbar);