import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import BookService from '../services/BookService';

const TransferBook: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>("");
    const [messagecolor, setMessageColor] = useState<string>("red");
    const [buttonPressed, setButtonPressed] = useState<string>('false');
    useEffect(() => {
        setButtonPressed('false');
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
    const bookname_original = localStorage.getItem('transferringBookName');
    let bookname='';
    for(let i=0; i<25; i++){
        if(bookname_original[i]!=undefined)bookname=bookname+bookname_original[i];
    }
    if (bookname.length>24)bookname=bookname+'...';

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
    const transfer = () => {
        const iin = (document.getElementById("inputIIN") as HTMLInputElement).value;
        const bookid = localStorage.getItem('transferringbookid');
        BookService.transferBook(iin, bookid)
            .then((response) => {
                setMessage(response.data.message);
                if (response.data.message.indexOf('успешно') !== -1) {
                    setMessageColor("#2ecc71");
                } else {
                    setMessageColor("red");
                }
                setButtonPressed('true');
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("Ошибка");
                }
            });
    }
    const goBack = () =>{
        let prevpage = localStorage.getItem('prevLibrarianPage');
        switch(prevpage){
            case 'search': window.location.href=window.location.protocol + '//' + window.location.host +'/searchbook';
            break;
            case 'pages': window.location.href=window.location.protocol + '//' + window.location.host +'/physicalbooksPages';
            break;
            default: window.location.href=window.location.protocol + '//' + window.location.host +'/';
        }
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'librarian') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br />
                        <button onClick={()=>goBack()}className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button> <br /><br />
                        <br />
                        <h3>Впишите ИИН студента, которому выдаётся книга "{bookname}".</h3>
                        <input id="inputIIN" className='btnNeutral' style={{ width: '300px' }} type="text" maxLength={12} placeholder='Введите ИИН'></input><br /><br />
                        {buttonPressed=='false'?<button className="navbarbutton" onClick={() => transfer()}>Выдать книгу</button>:<button disabled id="backbutton">Выполнено</button>}<br /><br />
                        <div style={{ color: messagecolor, fontWeight: 'bold' }}>{message}</div>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(TransferBook)