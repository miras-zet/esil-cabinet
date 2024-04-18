import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';

const TechAddNewDocuments: FC = () => {
    const { store } = useContext(Context);
    const [info, setInfo] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    //const [messagecolor, setMessageColor] = useState<string>("red");
    // const [user, setUser] = useState([]);  
    //const {modal, open} = useContext(ModalContext); 

    const handleChange = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      setInfo(value);
    };

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        // if (user) {
        //   setUser(user);
        // }
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
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
    const create = () => {
        if (info+'' == '0' && info+'' == '') setMessage("Введите количество");
        else {
            localStorage.setItem('techAmountInfo',info+'');
            window.location.href = window.location.protocol + '//' + window.location.host + '/techSpecifyDocument';
            return;
        }
    };
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'technician') {
                    return <div>
                        <KPINavbar />
                        <br /><br />
                        <div className=''>
                        <Link to={"/"}><button style={{ backgroundColor: 'silver', color: 'black' }}><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link><br/><br /><br /><br /> 
                            <h3>Создание нового представления</h3>
                            <br />
                            Выберите количество выдаваемой аппаратуры: &nbsp;<input className='btnNeutral' value={info} onChange={handleChange} pattern="[0-9*]" style={{ width: '80px', fontSize: '14px', backgroundColor: 'silver', color: 'Black' }} id='extradatainput' type='number' maxLength={2}></input><br /><br />
                            {message ? <div><br></br>{message}</div>:''}
                            <button className='navbarbutton' disabled={!info} onClick={create}>Далее</button>
                                   
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

export default observer(TechAddNewDocuments)