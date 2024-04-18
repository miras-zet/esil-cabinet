import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import DocsService from '../services/DocsService';

const ApplicantList: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>("");
    const [messagecolor, setMessageColor] = useState<string>("red");
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
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
    const addApplicant = () =>{
        const iin = (document.getElementById("inputIIN") as HTMLInputElement).value
        DocsService.addApplicant(iin)
            .then((response) => {
              setMessage(response.data.message);
              if (response.data.message.indexOf('успешно')!==-1) {
                setMessageColor("#2ecc71");
              } else {
                setMessageColor("red");
              }
            })
            .catch((err) => {
              if (err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message);
              } else {
                setMessage("Ошибка");
              }
            });
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'admissionadmin') {
                    

                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br />                  
                        <Link to={"/applicants"}><button className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button></Link> <br /><br />
                        <br/>
                        <h3>Впишите ИИН студента, который уже добавлен в Platonus, затем нажмите "Добавить"</h3>
                        <input id="inputIIN" className='btnNeutral' style={{width:'300px'}} type="text" maxLength={12} placeholder='Введите ИИН абитуриента...'></input><br/><br/>
                        <button className="navbarbutton" onClick={()=>addApplicant()}>Добавить</button><br/><br/>
                        <div style={{color:messagecolor, fontWeight:'bold'}}>{message}</div>
                    </div>
                }
                else {
                    return <Navigate to="/"/>
                }
            })()}

        </div>
    );
}

export default observer(ApplicantList)