import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import './Certificate.css'
import KPINavbar from '../components/KPINavbar';
import { FaDownload } from 'react-icons/fa';
import CafedraService from '../services/CafedraService';
import ICourseraDocsList from '../models/ICourseraDocsList';
import api from '../http-common';
import configFile from "../http/config.json";
import { exportHtmlTableToExcel } from '../models/exportHtmlTableToExcel';
import moment from 'moment';

const CourseraDocsList: FC = () => {
    const { store } = useContext(Context);
    //const navigate = useNavigate();
    const [data, setData] = useState<Array<ICourseraDocsList>>([]);
    moment.locale('ru');
    useEffect(() => {
        CafedraService.getCourseraDocsAll().then((response) => {
            setData(response.data);
        }).catch((err) => {
            console.log(err);
            setData([]);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])



    // const redirectDocs = (type,data,extradata,iin) =>{
    //     switch(type){
    //         case 'statement': {
    //             localStorage.setItem('statementdata',data);
    //             window.location.href = window.location.protocol + '//' + window.location.host + '/viewdormstatement';
    //         } break;
    //         case 'card': {
    //             localStorage.setItem('viewinguseriin',iin)
    //             localStorage.setItem('carddata',data);
    //             localStorage.setItem('parentsdata',extradata);
    //             window.location.href = window.location.protocol + '//' + window.location.host + '/viewdormcard';
    //         } break;
    //         case 'agreement': {
    //             localStorage.setItem('viewinguseriin',iin)
    //             window.location.href = window.location.protocol + '//' + window.location.host + '/viewdormagreement';
    //         } break;
    //     }
    // }
    const handleExport = (tableid) => {
        exportHtmlTableToExcel(tableid, `Студенты, сдавшие курсы AI-Sana ${moment(Date.now()).format("LL")}`, [40, 300, 250, 0, 0], []);
    };
    const downloadFile = async (filepath, fio) => {
        let extension = 'pdf';
        const filename = filepath.split('/').pop().replace(/\.pdf$/, ""); 
        const response = await api.get(`${configFile.API_URL}/upload/astanahubfile/${filename}`, {
            responseType: 'blob',
        });
        try {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fio}_certificate.${extension}`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Ошибка загрузки файла.');
        }
    }
    const dataList = data.map((element, index) =>
        <tr key={element.id} style={{ textAlign: 'center' }}>
            <td style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{index + 1}&nbsp;&nbsp;&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{element.fio}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{element.cafedranameru}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}><button onClick={() => downloadFile(element.filepath, element.fio)}><FaDownload></FaDownload></button></td>
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

    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_tutor') {
                    return <div style={{ textAlign: 'left', width: '1200px', marginTop: '10%' }}>
                        <KPINavbar />
                        <br /><br /><br /><br />
                        <Link to={"/"}><button className='navbarbutton'>Вернуться назад</button></Link><br />
                        <h2>Список загруженных сертификатов AI-Sana</h2>
                        <h3>{dataList.length} файлов</h3>
                        <br />
                        <button className='backbutton' onClick={() => handleExport('opaqueTable')}><FaDownload></FaDownload> Экспортировать</button>&ensp;
                        <br /><br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Кафедра<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}>Скачать</th>
                                {/* <th style={{ textAlign: 'center' }}><br />Ссылка-подтверждение<br />&nbsp;</th> */}
                                <th>&nbsp;</th>
                            </tr>
                            {dataList}
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

export default observer(CourseraDocsList)