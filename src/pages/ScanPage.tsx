import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import { Link, Navigate, useParams } from 'react-router-dom';
import '../App.css';

const ScanPage: FC = () => {
    const { store } = useContext(Context);
    // const [user, setUser] = useState([]);  
    //const {modal, open} = useContext(ModalContext); 
    const { id } = useParams<{ id: string }>();

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
        return <div><br />
            <div className=''>
                <h2>Необходимо авторизоваться</h2>
                <br />
                <Link to={"/"}><button className="navbarbutton">Авторизация</button></Link>
            </div>
        </div>
    }
    //   function redirect(id:string)  {
    //     localStorage.setItem('categoryid',id);
    //     window.location.href=window.location.protocol + '//' + window.location.host +'/kpiupload';
    //     return;
    //   }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                // if(role=='plt_student') {
                //   return <div>
                //       <KPINavbar/>  
                //       <br/><br/>
                //       <div className=''>
                //         <h2>Передан аргумент</h2>
                //         <p>{id}</p>
                //         <br/>
                //         <Link to={"/"}><button className="navbarbutton"><TiArrowBack style={{verticalAlign:'middle'}}/> Вернуться назад</button></Link> 
                //       </div>
                // </div>
                // }
                if (id == '1') {
                    return <Navigate to="/testpage" />
                }
                else if (id == '2' && role=='plt_student') {
                    return <Navigate to="/studentinfo" />
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(ScanPage)