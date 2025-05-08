import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import configFile from "../http/config.json";

const InternalDocs: FC = () => {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

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
                if (role == 'plt_student') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br /><br />
                        <Link to={"/"}><button className="navbarbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link> <br />
                            <p>Кодекс чести студента <a target='_blank' href={configFile.API_URL + '/view?filename=Codex.pdf'}>Открыть</a></p>
                            <p>Антикоррупционная политика <a target='_blank' href={configFile.API_URL + '/view?filename=Antikor.pdf'}>Открыть</a></p>
                            <p>Путеводитель (на русском) <a target='_blank' href={configFile.API_URL + '/view?filename=PutevoditelRu.pdf'}>Открыть</a></p>
                            <p>Нұсқаулық (қазақша) <a target='_blank' href={configFile.API_URL + '/view?filename=PutevoditelKaz.pdf'}>Открыть</a></p>
                            <p>Льготы <a target='_blank' href={configFile.API_URL + '/view?filename=Lgoty.pdf'}>Открыть</a></p>
                            <p>Инклюзивное образование <a target='_blank' href={configFile.API_URL + '/view?filename=Inclusive.pdf'}>Открыть</a></p>
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

export default observer(InternalDocs)