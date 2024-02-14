import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link} from 'react-router-dom';
import '../App.css';

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
              <Link to={"/"}><button style={{backgroundColor:'silver'}}>Вернуться назад</button></Link> 
              <br/><br/>
              <h2>Загрузка документов</h2>   
              <p><button onClick={() => redirect('1')}>Профориентация</button></p>
              <p><button onClick={() => redirect('2')}>Наука</button></p>
              <p><button onClick={() => redirect('3')}>Разработка образовательных ресурсов и сопровождение</button></p>
              <p><button onClick={() => redirect('4')}>Профессиональное соответствие и экспертность</button></p>
              <p><button onClick={() => redirect('5')}>Отраслевое и общественное призвание</button></p>
        </div>
        }
        else{
          return <div><button onClick={() => store.logout()}>Назад</button>  
          <h4>Нет доступа к странице</h4></div>
        }
      } )()}

    </div>
  );
}

export default observer(KPIPage)