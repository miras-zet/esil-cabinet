import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import http from "../http-common";
import './FileUpload.css';
import UploadService from '../services/UploadService';
import ICourseraDocsResponse from '../models/ICourseraDocsResponse';

const AddCourseraDocs: FC = () => {
    const { store } = useContext(Context);
    const [currentFileOne, setCurrentFileOne] = useState<File>();
    // const [currentFileTwo, setCurrentFileTwo] = useState<File>();
    const [courseraDocs, setCourseraDocs] = useState<Array<ICourseraDocsResponse>>([]);
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        UploadService.getCourseraFiles().then((response) => {
            setCourseraDocs(response.data);
        });
    }, [])
    const selectFileOne = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFileOne(selectedFiles?.[0]);
    };
    const deleteDoc = () => {
        UploadService.deleteCourseraFiles().then(() => {
            alert('Файл был удален');
            location.reload();
        });
    };
    // const selectFileTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { files } = event.target;
    //     const selectedFiles = files as FileList;
    //     setCurrentFileTwo(selectedFiles?.[0]);
    // };

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
    const uploadCourseraFile = async (file: File, filetype: string, link: string): Promise<any> => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append('userid', localStorage.getItem('user_id'));
        formData.append('filetype', filetype);
        formData.append('link', link);
        return http.post(`/upload/courserafile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };
    const addCertificateOne = () => {
        const fileNameParts = currentFileOne.name.split('.');
        const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

        if (fileExtension !== 'pdf') {
            alert('Необходим PDF файл');
            return;
        }
        //const link = (document.getElementById("inputLink1") as HTMLInputElement).value;
        const link = '-';
        (document.getElementById("mainbutton1") as HTMLInputElement).value = 'Идёт загрузка..';
        uploadCourseraFile(currentFileOne, "1", link).then((response) => {
            if (response.data.message.indexOf('успешно') !== -1) {
                setCurrentFileOne(undefined);
                alert('Файл загружен');
                location.reload();
            } else {
            }
            (document.getElementById("mainbutton") as HTMLInputElement).value = 'Добавить';

        })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    console.log(err.response.data.message);
                } else {
                    console.log('error');
                }
            });
    }
    // const addCertificateTwo = () => {
    //     const fileNameParts = currentFileTwo.name.split('.');
    //     const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

    //     if (fileExtension !== 'pdf') {
    //         alert('Необходим PDF файл');
    //         return;
    //     }
    //     const link = (document.getElementById("inputLink2") as HTMLInputElement).value;
    //     (document.getElementById("mainbutton2") as HTMLInputElement).value = 'Идёт загрузка..';
    //     uploadCourseraFile(currentFileTwo, "2", link).then((response) => {
    //         if (response.data.message.indexOf('успешно') !== -1) {
    //             setCurrentFileTwo(undefined);
    //             alert('Файл загружен');
    //             location.reload();
    //         } else {

    //         }
    //         (document.getElementById("mainbutton") as HTMLInputElement).value = 'Добавить';
    //     })
    //         .catch((err) => {
    //             if (err.response && err.response.data && err.response.data.message) {
    //                 console.log(err.response.data.message);
    //             } else {
    //                 console.log('error');
    //             }
    //         });

    // }
    const goBack = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/';
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                const unixTimestamp = Math.floor(Date.now() / 1000);
                if (role == 'plt_student') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br />
                        <button onClick={() => goBack()} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button><br /><br />
                        <br />
                        <h3>Добавить сертификат</h3>
                        {/* Ограничение до 30.06.2025 */}
                        {unixTimestamp < 1751309999 ? <><h4>«Основы Искусственного Интеллекта: чат GPT»</h4>
                            {courseraDocs.find(doc => doc.filetype === 1) ? (
                                <><p style={{ color: 'green' }}>Файл загружен</p><br />
                                    <button onClick={() => deleteDoc()} className='backbutton'>Удалить файл</button><br />
                                </>
                            ) : (
                                <>Прикрепить .pdf файл:
                                    &emsp;<label className="btnNeutral" style={{ backgroundColor: 'silver', color: 'DimGray' }}>
                                        {currentFileOne ? `Выбран файл: ${currentFileOne.name.length < 35 ? currentFileOne.name : currentFileOne.name.substring(0, 35) + '...'}` : 'Выберите файл...'}
                                        <input type="file" hidden onChange={selectFileOne} />
                                    </label>
                                    <br /><br />

                                    <button className="navbarbutton" id='mainbutton1' onClick={() => addCertificateOne()} disabled={!currentFileOne}>Добавить</button>
                                    <br /><br /><i>Наименование файла не должно превышать 30 символов</i>
                                    <br /><i>После нажатия необходимо подождать окончания загрузки</i>
                                    <br /><br /><br />
                                </>
                            )}</> : <><h4>Загрузка курсов недоступна в связи с ограничением даты.</h4></>}
                        <br />

                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(AddCourseraDocs)