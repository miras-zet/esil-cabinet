import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import DocsService from '../services/DocsService';
import IApplicantList from '../models/IApplicantList';
import { RiFileListFill } from "react-icons/ri";
import { HiViewList } from "react-icons/hi";
import { FaHandshake } from 'react-icons/fa';

const ApplicantList: FC = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [applicants, setApplicantData] = useState<Array<IApplicantList>>([]);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        DocsService.getApplicantData().then((response) => {
            setApplicantData(response.data);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])

    const applicantList = applicants.map((element, index) =>
        <tr key={element.id}>
            <td style={{ verticalAlign:'middle', fontSize:'13pt', textAlign:'center'}}>{index+1}</td>
            <td style={{ verticalAlign:'middle', fontSize:'13pt'}}>{element.lastname + ' ' + element.name + ' ' + element.middlename}</td>
            <td style={{ verticalAlign:'middle', textAlign:'center'}}>
                <button style={{ verticalAlign: 'middle', height:'38px', marginBottom:'10px', backgroundColor: '#99373a', color: 'white', width:'73px'}} onClick={() => redirect(element.id, element.lastname,'Ru','application')}><RiFileListFill /></button>&nbsp;
                <button style={{ verticalAlign: 'middle', height:'38px', marginBottom:'10px', backgroundColor: '#4587ba', color: 'white', width:'73px'}} onClick={() => redirect(element.id, element.lastname,'Kz','application')}><RiFileListFill /></button><br/>
                <button style={{ verticalAlign: 'middle', height:'38px', marginBottom:'10px', backgroundColor: '#99373a', color: 'white' }} onClick={() => redirect(element.id, element.lastname, 'Ru','inventory')}><HiViewList /><HiViewList /></button>&nbsp;
                <button style={{ verticalAlign: 'middle', height:'38px', marginBottom:'10px', backgroundColor: '#4587ba', color: 'white' }} onClick={() => redirect(element.id, element.lastname, 'Kz','inventory')}><HiViewList /><HiViewList /></button><br/>
                <button style={{ verticalAlign: 'middle', height:'38px', marginBottom:'25px', backgroundColor: '#99373a', color: 'white', width:'73px'}} onClick={() => redirect(element.id, element.lastname, 'Ru','contract')}><FaHandshake /></button>&nbsp;
                <button style={{ verticalAlign: 'middle', height:'38px', marginBottom:'25px', backgroundColor: '#4587ba', color: 'white', width:'73px'}} onClick={() => redirect(element.id, element.lastname, 'Kz','contract')}><FaHandshake /></button></td>
        </tr>
    );
    if (store.isLoading) {
        return <div>Loading ...</div>
    }


    if (!store.isAuth) {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
    
    const redirect = (id: number, lastname:string, lang: string, type:string) => {
        localStorage.setItem('applicant_user_id', id + '');
        localStorage.setItem('currentApplicantFIO',lastname);
        navigate(`/${type}${lang}`);
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                const user = JSON.parse(localStorage.getItem('data'));
                if (role == 'admissionadmin') {
                    return <div style={{ textAlign: 'left', width: '1200px', marginTop:'10%'}}>
                        <KPINavbar />
                        <br /><br /><br /><br />
                        <h3>Добро пожаловать, {user.lastname + ' ' + user.name + ' ' + user.middlename}</h3><br />
                        <h2>Список абитуриентов</h2>
                        <Link to={"/addapplicant"}><button className='navbarbutton'>Копировать нового абитуриента из Platonus</button></Link> <br /><br />
                        <br />
                        <table id='opaqueTable' style={{width:'100%'}}>
                            <tr>
                                <th style={{textAlign:'center'}}><br/>№<br/>&nbsp;</th>
                                <th style={{textAlign:'center'}}><br/>ФИО<br/>&nbsp;</th>
                                <th style={{textAlign:'center'}}><br/>Документы<br/>&nbsp;</th>
                            </tr>
                            {applicantList}
                        </table>
                    </div>
                }
                else {
                    return <div><button onClick={() => store.logout()}>Назад</button>
                        <h4>Нет доступа к странице</h4></div>
                }
            })()}

        </div>
    );
}

export default observer(ApplicantList)