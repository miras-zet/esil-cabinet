import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';

const AstanaHubSupport: FC = () => {
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
                        <Link to={"/ktu"}><button className="navbarbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link> <br />
                        <br/><h2>Самые популярные вопросы по курсу ChatGPT от Lerna и ответы на них:</h2>
                        <br/><b>1. Не отображается ВУЗ при регистрации/не появляются курсы</b>
                        <br/>Пользователи проходят регистрацию не по той ссылке, которую мы вам отправили, то есть просто регистрируются на Lerna как обычные пользователи
                        <br/>- Верная ссылка: <a href="https://corp.lerna.kz/astanahub_registration/">https://corp.lerna.kz/astanahub_registration/</a>
                        <br/>- Инструкция по регистрации: <a href="https://drive.google.com/file/d/1IRtuTU4gxyhv8KtAejKkM9_-OF4tPQ4n/view ">https://drive.google.com/file/d/1IRtuTU4gxyhv8KtAejKkM9_-OF4tPQ4n/view</a>
                        <br/>                
                        <br/><b>2. Что делать, если сначала зарегистрировался не по той ссылке, а потом перешел по нужной</b>
                        <br/>1) Необходимо перейти по верной ссылке <a href="https://corp.lerna.kz/astanahub_registration/">https://corp.lerna.kz/astanahub_registration/</a>
                        <br/>2) Пользователю всплывет окошко "Присоединиться к компании Astana Hub (project)"
                        <br/>3) Необходимо нажать "Продолжить" и дождаться письма на почту с инструкцией по завершению регистрации
                        <br/>4) После завершения регистрации курсы станут доступны
                        <br/>- Инструкция: <a href="https://drive.google.com/file/d/1dzUffVC0es65cCDhNy8S1UCaGilQFEg7/view">https://drive.google.com/file/d/1dzUffVC0es65cCDhNy8S1UCaGilQFEg7/view</a> 
                        <br/>                
                        <br/><b>3. Ввел некорректные данные ФИО при регистрации и теперь это отображается в сертификате</b>
                        <br/>После изменения в личном кабинете Lerna на корректное ФИО сертификат всё равно не обновится, так как при такой возможности пользователь смог бы генерировать любое количество сертификатов на любые имена.
                        <br/>В этом случае необходимо написать на почту поддержки Lerna и ждать ответ в течение 1 недели (раньше ответа не будет, так как поддержка перегружена обращениями студентов)
                        <br/>                
                        <br/><b>4. Как забрать сертификат/не отображается сертификат</b>
                        <br/>❗️ВАЖНО: Не писать в поддержку Lerna с просьбой срочно выдать сертификат, раньше 1 недели ответ не поступит.
                        <br/>✅ НУЖНО: подождать хотя бы 1 час/день, зайти в личный кабинет Lerna и скачать сертификат.
                        <br/>Если сертификат всё же не стал доступен в течение 3 дней, то необходимо написать на почту поддержки Lerna
                        <br/>- Инструкция: <a href="https://drive.google.com/file/d/1IRtuTU4gxyhv8KtAejKkM9_-OF4tPQ4n/view">https://drive.google.com/file/d/1IRtuTU4gxyhv8KtAejKkM9_-OF4tPQ4n/view</a>
                        <br/>- Инструкция в текстовом виде приходит каждому новому студенту на почту спустя 30 мин после регистрации
                        <br/>                
                        <br/><b>5. Статистика по регистрациям</b>
                        <br/>Обновление статистики происходит 1 и 15 числа каждого месяца
                        <br/>                
                        <br/><b>6. Сертификат скачивается без подписи</b>
                        <br/>В курс Основы искусственного интеллекта: чат GPT входят два курса:
                        <br/>1. Нейросети: практический курс. Введение
                        <br/>2. ⁠ChatGPT: ваш персональный нейропомощник
                        <br/>Необходимо пройти два курса на 100%, чтобы получить сертификат на курс Основы искусственного интеллекта: чат GPT
                        <br/>❗️Отдельно на части курса сертификат не выдается.
                        <br/>Если сертификат без подписи, значит студент скачивает сертификат только на часть обучения, а не полный курс 
                        <br/>- Инструкция: <a href="https://drive.google.com/file/d/1IRtuTU4gxyhv8KtAejKkM9_-OF4tPQ4n/view">https://drive.google.com/file/d/1IRtuTU4gxyhv8KtAejKkM9_-OF4tPQ4n/view</a>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(AstanaHubSupport)