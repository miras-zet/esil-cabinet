import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import IStudentInfo from '../models/IStudentInfo';
import InfoService from '../services/InfoService';

const StudentInfo: FC = () => {
    const { store } = useContext(Context);
    // const [user, setUser] = useState([]);  
    //const {modal, open} = useContext(ModalContext); 
    const [studentInfo, setStudentInfo] = useState<Array<IStudentInfo>>([]);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        // if (user) {
        //   setUser(user);
        // }
        InfoService.getStudentInfo().then((response) => {
            setStudentInfo(response.data);
        }).catch((err) => {
            console.log(err);
            setStudentInfo([]);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])


    if (store.isLoading) {
        return <div>Loading ...</div>
    }


    if (!store.isAuth) {
        return <div><br />
            <div className=''>
                <h2>Необходимо авторизоваться</h2>
                <br />
                <Link to={"/"}><button className="navbarbutton">Авторизация</button></Link>
            </div>
        </div>
    }

    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_student') {
                    return <div>
                        <KPINavbar />
                        <br /><br /><br /><br/><br /><br />
                        <div id='opaqueTable'>
                        <br/>
                            <h3>Информация о студенте</h3>
                            <div style={{ padding: '8% 8% 8% 8%', fontWeight: 'normal' }}>
                                <p>ФИО: <u>{studentInfo[0]?.lastname} {studentInfo[0]?.firstname} {studentInfo[0]?.patronymic}</u></p>
                                <p>Специальность: <u>{studentInfo[0]?.specialization}</u></p>
                                <p>Форма обучения: <u>{studentInfo[0]?.study_form}</u></p>
                                <p>Группа: <u>{studentInfo[0]?.groupname}</u></p> 
                                <p>Язык обучения: <u>{studentInfo[0]?.study_language}</u></p>
                                <p>Степень: <u>{studentInfo[0]?.degree_type}</u></p>
                                <p>ID (Platonus): <u>{studentInfo[0]?.plt_id}</u></p>
                            </div>
                            <Link to={"/"}><button className="navbarbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link>
                            <br/><br/>
                        </div>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(StudentInfo)