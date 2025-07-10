////////// hooks
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/////// fns
import { getDataContacts, getListFaq, getListInfoCompany } from 'store/reducers/otherActionApartmentSlice';

////// components
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

////// style
import './style.scss';

////// icons
import phone2 from '../../assets/images/landing/mockup.png';
import logo from '../../assets/images/logoWhite.png';
import logo_push from '../../assets/images/logo_push.png';
import learn_landlord from '../../assets/video_learn/IMG_1173.mov';
import learn_user from '../../assets/video_learn/IMG_1173.mov';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

//// страница входа
const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listFaq, listInfoCompany, dataApp } = useSelector((state) => state.otherActionApartmentSlice);

  useEffect(() => {
    dispatch(getListInfoCompany());
    dispatch(getListFaq());
    dispatch(getDataContacts());
  }, []);

  const scrollToId = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const applicationForAdmin = () => {
    /// переход на страницу заяки
    navigate('/application');
  };

  return (
    <>
      <div className="welcomePage">
        <div className="welcomePage__inner">
          <div className="menu">
            <div className="container">
              <div className="menu__inner">
                <a href="/" className="logoMain">
                  <img src={logo} alt="" />
                  <p>TAM.KG</p>
                </a>
                <ul>
                  <li onClick={() => scrollToId('main')}>Главное</li>
                  <li onClick={() => scrollToId('about')}>О нас</li>
                  <li onClick={() => scrollToId('why')}>Причины работать с нами</li>
                  <li onClick={() => scrollToId('video')}>Видео инструкция</li>
                  <li onClick={() => scrollToId('faq')}>Вопрос и ответы</li>
                </ul>
                <button className="callMe">Войти</button>
              </div>
            </div>
          </div>

          <div className="header" id="main">
            <div className="header__inner">
              <div className="container">
                <div className="mainInfo">
                  <div>
                    <h1>TAM.KG — умная аренда жилья в Кыргызстане.</h1>
                    <div className="moreText">
                      <h3>Арендуйте квартиру за минуты через мобильное приложение.</h3>
                      <h3 style={{ marginTop: 10 }}>
                        Если вы арендодатель, вы можете легко связаться с нами и начать сотрудничество. Мы поможем подключиться к платформе,
                        установить умный замок и автоматизировать процесс бронирования.
                      </h3>
                    </div>
                    <div className="actions">
                      <button className="callMe" onClick={applicationForAdmin}>
                        Оставить заявку
                      </button>
                      <button className="callMe">
                        <a href={dataApp?.phone1}>Связаться с нами напрямую</a>
                      </button>
                    </div>
                  </div>
                  <img src={phone2} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="aboutUs" id="about">
            <div className="container">
              <div className="aboutUs__inner">
                <h2>О нас</h2>
                <p>
                  TAM.KG — это платформа для умной аренды жилья в Кыргызстане. Мы делаем процесс аренды простым, быстрым и безопасным как
                  для гостей, так и для арендодателей.
                </p>
                <p>
                  Через мобильное приложение TAM.KG вы можете:
                  <br />– найти и забронировать квартиру за пару минут;
                  <br />– оплатить аренду онлайн;
                  <br />– получить цифровой ключ для входа без встреч с владельцем.
                </p>
                <p>
                  Для арендодателей мы предлагаем:
                  <br />– подключение умных замков;
                  <br />– автоматизацию процесса бронирования и оплаты;
                  <br />– удобный личный кабинет для управления квартирами и заказами.
                </p>
                <p>Наша цель — сделать аренду жилья в Кыргызстане современной, прозрачной и удобной для всех.</p>
              </div>
            </div>
          </div>

          <div className="whyChooseUs" id="why">
            <div className="container">
              <h2>Почему именно мы ?</h2>
              <div className="cards">
                {listInfoCompany?.map((el, idx) => {
                  const words = el?.title?.split(' ');
                  const firstWord = words?.[0];
                  const rest = words?.slice(1)?.join(' ');

                  return (
                    <div className="card" key={idx}>
                      <h3>
                        {firstWord} <span>{rest}</span>
                      </h3>
                      <p>{el.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="connectVideoBlock" id="video">
            <div className="container">
              <div className="connectVideoBlock__inner">
                <h2>Как мы работаем</h2>
                <div className="videoGrid">
                  <div className="videoItem">
                    <h3>Инструкция для клиентов</h3>
                    <video controls poster={logo_push}>
                      <source src={learn_landlord} type="video/mp4" />
                      Ваш браузер не поддерживает видео.
                    </video>
                  </div>
                  <div className="videoItem">
                    <h3>Инструкция для арендодателей</h3>
                    <video controls poster={logo_push}>
                      <source src={learn_user} type="video/mp4" />
                      Ваш браузер не поддерживает видео.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="faqBlock" id="faq">
            <div className="container">
              <div className="faqBlock__inner">
                <h2>Вопросы и ответы</h2>
                {listFaq?.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight={600}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer__columns">
            <div>
              <h4>Компания</h4>
              <p onClick={() => scrollToId('main')}>Главное</p>
              <p onClick={() => scrollToId('about')}>О нас</p>
              <p onClick={() => scrollToId('why')}>Причины работать с нами</p>
              <p onClick={() => scrollToId('video')}>Видео инструкция</p>
            </div>

            <div>
              <h4>Соц. сети</h4>
              <a href={dataApp?.insta}>
                <p>Наш Инстраграм</p>
                <InstagramIcon />
              </a>

              <a href={dataApp?.telega}>
                <p>Наш Telegram</p>
                <TelegramIcon />
              </a>

              <a href={dataApp?.wh}>
                <p>Наш WhatsApp</p>
                <WhatsAppIcon />
              </a>
            </div>

            <div>
              <h4>Контакты</h4>
              <p>г. Бишкек, ул. Тулебердиева, 57</p>
              <a href={dataApp?.phone1}>
                <p>Связаться с нами</p>
              </a>
              <p>{dataApp?.email}</p>
              <p>Работаем 24/7</p>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="container">
            <div className="footer__bottom__inner">
              <div className="footer__logo">
                <a href="/" className="logoMain">
                  <img src={logo} alt="" />
                  <p>TAM.KG</p>
                </a>
              </div>
              <span>© 2025 TAM.KG</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default WelcomePage;
