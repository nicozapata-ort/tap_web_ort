import React, { useEffect, useState, useContext } from 'react'
import './App.css';
import { texts } from './assets/texts/strings.js'
import FormState from './context/Form/FormState.js';
import UserFormFormik from './components/UserFormFormik.js';
import { useSpring, a, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { getPromotion } from './strapi/data.js'
import logo from './assets/images/TAP_marca-02-color-RGB-gradiente-invertido.png'
import Ranking from './components/Ranking.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import PromotionState from './context/Promotion/PromotionState.js';
import PromotionContext from './context/Promotion/PromotionContext';
import FormContext from './context/Form/FormContext';
import { MessageCoupon } from './components/MessageCoupon';
import { getApiURL } from "./strapi/config.js";

function App() {
  const { promotion, setPromotion } = useContext(PromotionContext);
  const { openModal } = useContext(FormContext);
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
    let date = new Date(dateString)
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    return date.toLocaleDateString('en-GB')
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
      <header className='header-container'>
        <div className='logo-container'>
          <img className='logo-image' src={logo} alt='logo_tap' width={150} />
        </div>
      </header>

      <section className='desc-section-container'>

        {promotion != null
          ?
          promotion.expired === false
            ?
            promotion.couponsAvailabes
              ?
              (<div className="desc-container-1 unselectable">
                <div className="desc-container-2">
                  <div className='desc-container-3'>
                    <div className='title-container'>
                      <h2 className="promotion-desc-title">{`${promotion.description} $${promotion.prizeMaxPrice}`}</h2>
                    </div>
                    <div className='desc-container'>
                      <h3 className="promotion-desc-subtitle">{`Tenés chance desde el ${formatDate(promotion.dateMin)} hasta el ${formatDate(promotion.dateMax)}`}</h3>
                    </div>
                  </div>
                </div>
              </div>)
              :
              (<div className="desc-container-1 unselectable">
                <div className="desc-container-2">
                  <div className='desc-container-3'>
                    <div className='title-container'>
                      <h2 className="promotion-desc-title">{`${promotion.noAvailableCouponsMessage}`}</h2>
                    </div>
                  </div>
                </div>
              </div>)
            :
            (<div className="desc-container-1 unselectable">
              <div className="desc-container-2">
                <div className='desc-container-3'>
                  <div className='title-container'>
                    <h2 className="promotion-desc-title">{`${promotion.promotionExpiredMessage}`}</h2>
                  </div>
                </div>
              </div>
            </div>)
          : null
        }

        <div className='ranking-container'>
          <div className='ranking'>
            <Ranking />
          </div>
        </div>

        <div className='promotional-image'>
          <img className='promotion-image' src={`${getApiURL()}/uploads/visa_tap_online_6cc6209cc1.png`} alt='image_promo' />
        </div>
      </section>
      <section className='form-section-container unselectable'>
        {promotion && promotion.expired === false && promotion.couponsAvailabes
          ?
          <a.div {...bind()} style={{ y, touchAction: 'none' }}>
            <div className='form-swipeable-container'>
              <div className='form-div'>
                <div className="form-button-container" onClick={isClosed ? open : close}>
                  <div className="button-to-slide"></div>
                </div>
                <div className='form-container'>
                  <div className='form-title-container'>
                    <h2 className="form-title">{texts.FORM_TITLE}</h2>
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
          : null
        }
        {openModal
          ? <MessageCoupon />
          : null
        }
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
