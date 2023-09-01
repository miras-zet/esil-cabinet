import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import { ModalContext } from '../http/ModalContext';
import LoginForm from '../components/LoginForm';
import CreateCert from '../components/CreateCert';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';





const HomePage:FC = () => {  
  const {store} = useContext(Context);  
  // const [user, setUser] = useState([]);  
  const {modal, open} = useContext(ModalContext); 

  

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
  if(store.certificat?.id !== 0 && store.certificat?.id !== undefined){
    return <Navigate to='/certificate' />;
    }   

  return (
    <div>
        <div>
              <button onClick={() => store.logout()}>Выйти</button>  
              <h1>{store.isAuth ? `Добро пожаловать, ${store.user.lastname} ${store.user.name}`  : 'АВТОРИЗУЙТЕСЬ'}</h1>       
              <button onClick={open}>Получить новую справку</button>
              <Link to="/list"><button onClick={()=> store.getCert()}>История подачи справок</button></Link>
                 
              {modal && <CreateCert />}  

        </div>
          
        
     
        
         
    </div>
  );
}

export default observer(HomePage)