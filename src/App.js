import React, { useEffect, useState, useContext } from 'react'
import './App.css';
import FormState from './context/Form/FormState.js';
import UserFormFormik from './components/Form/UserFormFormik';
import { useSpring, a, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { getPromotion } from './strapi/data.js'
import logo from './TAP_marca-02-color-RGB-gradiente-invertido.png'
import Ranking from './components/Ranking.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import imagePromotion from './visa-tap-online.png'
import PromotionState from './context/Promotion/PromotionState.js';
import PromotionContext from './context/Promotion/PromotionContext';

function App() {
  const { promotion, setPromotion } = useContext(PromotionContext);
  // const [descriptionDate, setDescriptionDate] = useState('');
  const [isClosed, setIsClosed] = useState(true);
  const [{ y }, api] = useSpring(() => ({ y: 0 }))
  const maxHeight = -(window.innerHeight/2 + 60) ;
  console.log('maxHeight', maxHeight)

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
    { from: () => [0, y.get()], filterTaps: true, bounds: { top: -460 }, rubberband: true }
  )

  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = date.getDate() + 1
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  useEffect(async () => {
    const data = await getPromotion()
    setPromotion(data)
    console.log('Estoy en App, se deberia hacer una vez')
  }, []);

  return (
    <div className="App-body">
      <header className='App-header'>
        <div className='container-logo2'>
          <img className='App-logo3' src={logo} alt='logo_tap' width={150} />
        </div>
        {/* <p>icono nav</p> */}
      </header>

      <section className='App-section-container'>

        <div className="App-section-description-container unselectable">
          <div className="App-section-description">
            <div className='container-text-description'>
              <div className='container-title'>
                <h2 className="App-text-header-title">{`${promotion.description} $${promotion.prizeMinPrice} a $${promotion.prizeMaxPrice}`}</h2>
              </div>
              <div className='container-description'>
                <h3 className="App-text-header-description">{`Podes participar desde el ${formatDate(promotion.dateMin)} al ${formatDate(promotion.dateMax)}`}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className='ranking-container'>
          <div className='ranking'>
            <Ranking />
          </div>
        </div>

        <div className='promotional-image'>
          <img className='imagePromotion' src={imagePromotion} alt='image_promo' />
        </div>
      </section>

      <section className='swipeable-form-container unselectable'>
        <a.div {...bind()} style={{ y, touchAction: 'none' }}>
          <div className='swipeable-form'>
            <div className='div-form'>
              <div className="App-container-button" onClick={isClosed ? open : close}>
                <div className="App-button-slide"></div>
              </div>
              <div className='container-form'>
                <div className='container-title-form'>
                  <h2 className="App-text-form-title">¡Completa el formulario para participar de nuestra campaña!</h2>
                  {/* <h3 className="App-text-form-description">¡Completa el formulario para participar de nuestra campaña!</h3> */}
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
