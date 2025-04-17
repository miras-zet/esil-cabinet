import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import InfoService from '../services/InfoService';


const AstanaHubInfo: FC = () => {
    const { store } = useContext(Context);
    const [info0, setInfo0] = useState<String>("");
    const [info, setInfo] = useState<String>("");
    const [info2, setInfo2] = useState<String>("");

    useEffect(() => {
        InfoService.getAstanaHubInfo().then((response) => {
            setInfo0(response.data.message);
            setInfo(response.data.message1);
            setInfo2(response.data.message2);
        });
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
                if (role == 'plt_tutor') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br /><br />
                        <Link to={"/"}><button className="navbarbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link> <br />
                        <p>{info0}</p>
                        <p>{info}</p>
                        <p>{info2}</p>
                        {/* <h4><a target='_blank' href='https://drive.google.com/file/d/1RaUX58QWjdBhZq47AEi4xfzh7IzHHBJc/view?usp=drive_link'>Ссылка на видеоинструкцию №1</a></h4>
                        <h4><a target='_blank' href='https://drive.google.com/file/d/1fcSYvgs2eRfjorTZbpZxiA8RQlQhozIR/view?usp=drive_link'>Ссылка на видеоинструкцию №2</a></h4> */}
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(AstanaHubInfo)