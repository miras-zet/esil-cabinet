import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import DocsService from '../services/DocsService';
import IApplicantList from '../models/IApplicantList';
import { RiFileListFill } from "react-icons/ri";
import { HiViewList } from "react-icons/hi";
import { FaHandshake } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { RiArchiveFill } from "react-icons/ri";

const ApplicantList: FC = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [applicants, setApplicantData] = useState<Array<IApplicantList>>([]);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        DocsService.getApplicantData().then((response) => {
            setApplicantData(response.data);
        }).catch((err) => {
            console.log(err);
            setApplicantData([]);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])

    const applicantList = applicants.map((element, index) =>
        <tr key={element.id} style={{ textAlign: 'center' }}>
            <td style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{index + 1}&nbsp;&nbsp;&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>&nbsp;{element.lastname + ' ' + element.firstname + ' ' + element.patronymic}&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.specialization}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', width:'20%' }}>{element.study_form}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.degree_type}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.study_language}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                {element.study_language == 'русский' ? 
                <div>
                    <Tooltip id="application-tooltip" /><a data-tooltip-id="application-tooltip" data-tooltip-content={'Анкета ('+element.lastname+')'}><button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#52A177', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Ru', 'application')}><RiFileListFill /></button></a>&nbsp;
                    <Tooltip id="inventory-tooltip" /><a data-tooltip-id="inventory-tooltip" data-tooltip-content={'Опись ('+element.lastname+')'}><button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#4587ba', color: 'white' }} onClick={() => redirect(element.id, element.lastname, 'Ru', 'inventory')}><HiViewList /><HiViewList /></button></a>&nbsp;
                    <Tooltip id="contract-tooltip" /><a data-tooltip-id="contract-tooltip" data-tooltip-content={'Договор ('+element.lastname+')'}><button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#99373a', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Ru', 'contract')}><FaHandshake /></button></a>&nbsp;
                </div>
                    :
                <div>
                    <Tooltip id="application-tooltip" /><a data-tooltip-id="application-tooltip" data-tooltip-content={'Анкета ('+element.lastname+')'}><button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#52A177', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Kz', 'application')}><RiFileListFill /></button></a>&nbsp;
                    <Tooltip id="inventory-tooltip" /><a data-tooltip-id="inventory-tooltip" data-tooltip-content={'Опись ('+element.lastname+')'}><button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#4587ba', color: 'white' }} onClick={() => redirect(element.id, element.lastname, 'Kz', 'inventory')}><HiViewList /><HiViewList /></button></a>&nbsp;
                    <Tooltip id="contract-tooltip" /><a data-tooltip-id="contract-tooltip" data-tooltip-content={'Договор ('+element.lastname+')'}><button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#99373a', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Kz', 'contract')}><FaHandshake /></button></a>&nbsp;
                </div>}
            </td>
            <td  id="table-divider" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
            {element.study_language == 'русский' ? 
            <div>
                <Tooltip id="title-tooltip" /><a data-tooltip-id="title-tooltip" data-tooltip-content={'Титульный лист ('+element.lastname+')'}><button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#A585C4', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Ru', 'title')}><RiArchiveFill/></button></a>&nbsp;
            </div>
            :
            <div>
                <Tooltip id="title-tooltip" /><a data-tooltip-id="title-tooltip" data-tooltip-content={'Титульный лист ('+element.lastname+')'}><button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#A585C4', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Kz', 'title')}><RiArchiveFill/></button></a>&nbsp;
            </div>}
            </td>
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

    const redirect = (id: number, lastname: string, lang: string, type: string) => {
        localStorage.setItem('applicant_user_id', id + '');
        localStorage.setItem('currentApplicantFIO', lastname);
        navigate(`/${type}${lang}`);
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                const user = JSON.parse(localStorage.getItem('data'));
                if (role == 'admissionadmin') {
                    return <div style={{ textAlign: 'left', width: '1200px', marginTop: '10%' }}>
                        <KPINavbar />
                        <br /><br /><br /><br />
                        <h3>Добро пожаловать, {user.lastname + ' ' + user.name + ' ' + user.middlename}</h3><br />
                        <h2>Список абитуриентов</h2>
                        <Link to={"/addapplicant"}><button className='navbarbutton'>Добавить нового абитуриента (из Platonus)</button></Link> <br /><br />
                        <br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Специальность<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Форма обучения<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Академическая степень<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Язык обучения<br />&nbsp;</th>
                                <th style={{ textAlign: 'center', width:'20%' }}><br />Документы<br />&nbsp;</th>
                                <th style={{ textAlign: 'center'}}><br />Титульный лист<br />&nbsp;</th>
                            </tr>
                            {applicantList}
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(ApplicantList)