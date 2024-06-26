import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate} from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';

const KPIPage:FC = () => {  
  const {store} = useContext(Context);  
  // const [user, setUser] = useState([]);  
  //const {modal, open} = useContext(ModalContext); 
  

 useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('data'));
    // if (user) {
    //   setUser(user);
    // }
    if (localStorage.getItem('token')){
      store.checkAuth()
    }    
     
  },[])

// useEffect(()=>{
//   setModal(modals)
// },[])
  

  if (store.isLoading){
    return <div>Loading ...</div>
  }

 
  if (!store.isAuth) {
    return (
        <div>
            <LoginForm/>            
        </div>
    );
  } 
  function redirect(id:string)  {
    localStorage.setItem('categoryid',id);
    window.location.href=window.location.protocol + '//' + window.location.host +'/kpiupload';
    return;
  }
  return (
    <div>
      {(() => {
        const role = localStorage.getItem('role');
        if(role=='plt_tutor') {
          return <div>
              <KPINavbar/>  
              <br/><br/>
              <div className=''>
                <h2>Загрузка документов</h2>
                <p><button className="backbutton" onClick = {() => redirect('1')}>Профориентация</button></p>
                <p><button className="backbutton" onClick = {() => redirect('2')}>Наука</button></p>
                <p><button className="backbutton" onClick = {() => redirect('3')}>Разработка образовательных ресурсов и сопровождение</button></p>
                <p><button className="backbutton" onClick = {() => redirect('4')}>Профессиональное соответствие и экспертность</button></p>
                <p><button className="backbutton" onClick = {() => redirect('5')}>Отраслевое и общественное призвание</button></p>
                <br/>
                <Link to={"/"}><button className="navbarbutton"><TiArrowBack style={{verticalAlign:'middle'}}/> Вернуться назад</button></Link> 
              </div>
        </div>
        }
        else{
          return <Navigate to="/"/>
        }
      } )()}

    </div>
  );
}

export default observer(KPIPage)