import React, { useEffect, useState, useContext } from 'react'
import './App.css';
import FormState from './context/Form/FormState.js';
import UserFormFormik from './components/UserFormFormik.js';
import { useSpring, a, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { getPromotion } from './strapi/data.js'
import logo from './assets/images/TAP_marca-02-color-RGB-gradiente-invertido.png'
import Ranking from './components/Ranking.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import imagePromotion from './assets/images/visa-tap-online.png'
import PromotionState from './context/Promotion/PromotionState.js';
import PromotionContext from './context/Promotion/PromotionContext';

function App() {
  const { promotion, setPromotion } = useContext(PromotionContext);
  const [isClosed, setIsClosed] = useState(true);
  const [{ y }, api] = useSpring(() => ({ y: 0 }))
  const maxHeight = -(window.innerHeight / 2 + 60);

  const open = ({ canceled }) => {
    api.start({ y: maxHeight, immediate: false, config: canceled ? config.wobbly : config.stiff })
    setIsClosed(false)
  }

  const close = (velocity = 0) => {
    api.start({ y: 0, immediate: false, config: { ...config.stiff, velocity } })
    setIsClosed(true)
  }

  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], offset: [, oy], cancel, canceled }) => {
      if (oy < -550 || oy > 100) {
        cancel()
      }

      if (last) {
        oy > -200 || (vy > 0.5 && dy > 0) ? close(vy) : open({ canceled })
      } else {
        api.start({ y: oy, immediate: true })
      }
    },
    { from: () => [0, y.get()], filterTaps: true, bounds: { top: maxHeight }, rubberband: true }
  )

  const formatDate = dateString => {
    const date = new Date(dateString)
    return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  useEffect(() => {

    async function fetchMyAPI() {
      const data = await getPromotion()
      setPromotion(data)
    }

    fetchMyAPI()

  }, []);

  return (
    <div className="body">
      <header className='container-header'>
        <div className='container-logo'>
          <img className='image-logo' src={logo} alt='logo_tap' width={150} />
        </div>
      </header>

      <section className='container-description-section'>
        {promotion !== null
          ? 
          <div className="container-description-1 unselectable">
            <div className="container-description-2">
              <div className='container-description-3'>
                <div className='container-title'>
                  <h2 className="title-description-promotion">{`${promotion.description} $${promotion.prizeMaxPrice}`}</h2>
                </div>
                <div className='container-description'>
                  <h3 className="subtitle-description-promotion">{`Tenés chance desde el ${formatDate(promotion.dateMin)} hasta el ${formatDate(promotion.dateMax)}`}</h3>
                </div>
              </div>
            </div>
          </div>

          : null
        }

        <div className='container-ranking'>
          <div className='ranking'>
            <Ranking />
          </div>
        </div>

        <div className='promotional-image'>
          <img className='image-promotion' src={imagePromotion} alt='image_promo' />
        </div>
      </section>

      <section className='container-form-section unselectable'>
        <a.div {...bind()} style={{ y, touchAction: 'none' }}>
          <div className='container-swipeable-form'>
            <div className='div-form'>
              <div className="container-button-form" onClick={isClosed ? open : close}>
                <div className="button-to-slide"></div>
              </div>
              <div className='container-form'>
                <div className='container-title-form'>
                  <h2 className="title-form">¡Ingresá tus datos para participar!</h2>
                </div>
                <div className='formulary'>
                  <Router>
                    <Route path="/" exact>
                      <UserFormFormik />
                    </Route>
                  </Router>
                </div>
              </div>
            </div>
          </div>
        </a.div>
      </section>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <PromotionState>
      <FormState>
        <App />
      </FormState>
    </PromotionState>
  )
};
