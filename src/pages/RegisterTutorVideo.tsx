import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import ISubjectList from '../models/ISubjectList';
import InfoService from '../services/InfoService';
import ITutorSearchBarResult from '../models/ITutorSearchbarResult';

const RegisterTutorVideo: FC = () => {
    const { store } = useContext(Context);
    let [videotype, setType] = useState<string>('notchosen');
    let [lang, setLang] = useState<string>('notchosen');
    const [tutorInfo, setTutorInfo] = useState<Array<ITutorSearchBarResult>>([]);
    const [listTutors, setListTutors] = useState<JSX.Element[]>([]);

    const [tutorsubjects, setTutorSubjects] = useState<Array<ISubjectList>>([]);
    const [listSubjects, setListSubjects] = useState<JSX.Element[]>([]);

    const [selectedTutorId, setSelectedTutorId] = useState<number | null>(null);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])
    const getTutorList = async () => {
        const search_query = (document.getElementById("inputName") as HTMLInputElement).value;
        if (search_query.length < 4) {
            alert('Введите минимум 4 символов');
            return;
        }
        try {
            const response = await InfoService.findTutorSearchbar(search_query);
            setTutorInfo(response.data);
            if (response.data.length > 0) {
                setSelectedTutorId(response.data[0].tutorid);
            }
        } catch (error) {
            console.error("Ошибка при получении списка преподавателей:", error);
        }
    };

    useEffect(() => {
        if (selectedTutorId) {
            InfoService.getTutorSubjects(selectedTutorId).then((response) => {
                setTutorSubjects(response.data);
            });
        }
    }, [selectedTutorId]);
    useEffect(() => {
        setListTutors(tutorInfo?.map((element) =>
            <option key={element.tutorid} value={element.tutorid}>{element.fio}</option>
        ));
        if (tutorInfo.length > 0) {
            InfoService.getTutorSubjects(tutorInfo[0].tutorid).then((response) => {
                setTutorSubjects(response.data);
            });
        }
        else{
            setTutorSubjects([]);
        }
    }, [tutorInfo]);
    useEffect(() => {
        setListSubjects(
            tutorsubjects.map((element) => (
                <option key={element.subjectid} value={element.subjectname}>{element.subjectname}</option>
            ))
        );
    }, [tutorsubjects]);

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
    const selectedTutor = (id) => {
        InfoService.getTutorSubjects(id).then((response) => {
            setTutorSubjects(response.data);
        });
    }
    const addVideo = () => {
        if ((!lang || lang == 'notchosen')
        || (!videotype || videotype == 'notchosen')
        || ((document.getElementById("subject") as HTMLSelectElement).value == '')
        ){
            alert('Не все поля или категории заполнены');
            return;
        }
        InfoService.addVideo(selectedTutorId,(document.getElementById("subject") as HTMLSelectElement).value,(document.getElementById("inputNumber") as HTMLInputElement).value,videotype,lang).then(() => {
            alert('Успешно загружено');
            location.reload();
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('Ошибка');
            }
        });;
        
    }

    const goBack = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/';
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_tutor') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br />
                        <button onClick={() => goBack()} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button><br /><br />
                        <br />
                        <h3>Добавить новое видео</h3>
                        <table >
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Поиск преподавателя</td>
                                <td><input id="inputName" className='btnNeutral' style={{ width: '247px' }} type="text" placeholder='Фамилия, имя'></input>
                                    &ensp;<button className='navbarbutton' onClick={getTutorList}>Найти</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Выбрать преподавателя</td>
                                <td><select disabled={listTutors.length==0} className='btnNeutral' style={{ width: '380px' }} name="tutors" id="tutor" onChange={event => selectedTutor(parseInt(event.target.value))}>
                                    {listTutors}
                                </select></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Дисциплина</td>
                                <td><select disabled={listSubjects.length==0} className='btnNeutral' style={{ width: '380px' }} name="subjects" id="subject">
                                    {listSubjects}
                                </select></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Тип видео</td>
                                <td><select className='btnNeutral' style={{ width: '380px' }} name="videotypes" id="videotype" onChange={event => setType(event.target.value)}>
                                    <option value="notchosen">-</option>
                                    <option value="lecture">Лекция</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Порядковый номер</td>
                                <td><input id="inputNumber" className='btnNeutral' style={{ width: '340px' }} type="text" placeholder='Порядковый номер (например, №1)'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Язык</td>
                                <td><select className='btnNeutral' style={{ width: '380px' }} name="languages" id="lang" onChange={event => setLang(event.target.value)}>
                                    <option value="notchosen">-</option>
                                    <option value="kaz">Казахский</option>
                                    <option value="rus">Русский</option>
                                    <option value="eng">Английский</option>
                                </select></td>
                            </tr>
                        </table>
                        <button className="navbarbutton" onClick={() => addVideo()}>Добавить</button><br />
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(RegisterTutorVideo)