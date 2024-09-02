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
import { FaCheck, FaHandshake, FaRegClock } from 'react-icons/fa';
//import { Tooltip } from 'react-tooltip';
import { RiArchiveFill } from "react-icons/ri";
import { FaHouseChimney } from 'react-icons/fa6';
import UploadService from '../services/UploadService';

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

    const redirectDorms = (id,lastname,firstname) => {
        if (confirm(`Вы уверены, что хотите подать заявку на общежитие для ${lastname} ${firstname}?`)) {
          UploadService.createDormRequestForUserSelected(id).then(() => {
            location.reload();
          }).catch((err) => {
            console.log(err);
        });
        }
      }

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
                    <button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#52A177', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Ru', 'application')}><RiFileListFill /></button>&nbsp;
                    <button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#4587ba', color: 'white' }} onClick={() => redirect(element.id, element.lastname, 'Ru', 'inventory')}><HiViewList /><HiViewList /></button>&nbsp;
                    <button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#99373a', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Ru', 'contract')}><FaHandshake /></button>&nbsp;
                </div>
                    :
                <div>
                    <button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#52A177', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Kz', 'application')}><RiFileListFill /></button>&nbsp;
                    <button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#4587ba', color: 'white' }} onClick={() => redirect(element.id, element.lastname, 'Kz', 'inventory')}><HiViewList /><HiViewList /></button>&nbsp;
                    <button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#99373a', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Kz', 'contract')}><FaHandshake /></button>&nbsp;
                </div>}
            </td>
            <td id="table-divider" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
            {element.study_language == 'русский' ? 
            <div>
                <button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#A585C4', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Ru', 'title')}><RiArchiveFill/></button>&nbsp;
            </div>
            :
            <div>
                <button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#A585C4', color: 'white', width: '73px' }} onClick={() => redirect(element.id, element.lastname, 'Kz', 'title')}><RiArchiveFill/></button>&nbsp;
            </div>}
            </td>
            <td id="table-divider" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
            <div>
                {element.approved=='0'?
                <><button disabled style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#e88c56', color: 'white', width: '73px' }} onClick={() => redirectDorms(element.id,element.lastname,element.firstname)}><FaRegClock /></button>&nbsp;
                </> 
                : element.approved=='1'?
                <>
                <button disabled style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#52A177', color: 'white', width: '73px' }} onClick={() => redirectDorms(element.id,element.lastname,element.firstname)}><FaCheck /></button>&nbsp;
                </>
                :
                <>
                <button style={{ verticalAlign: 'middle', height: '38px', paddingBottom: '25px', backgroundColor: '#e8bc56', color: 'white', width: '73px' }} onClick={() => redirectDorms(element.id,element.lastname,element.firstname)}><FaHouseChimney /></button>&nbsp;</>
                }
                
            </div>
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
                        <h4>({applicants.length} абитуриентов)</h4>
                        <Link to={"/addapplicant"}><button className='navbarbutton'>Добавить нового абитуриента (из Platonus)</button></Link> <br /><br />
                        <Link to={"/dormrequests"}><button className='greybutton'>Заявки на общежитие</button></Link> <br /><br />
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
                                <th style={{ textAlign: 'center'}}><br />Общежитие<br />&nbsp;</th>
                                <th>&nbsp;</th>
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