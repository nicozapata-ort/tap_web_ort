import React, { useEffect, useState } from 'react'
import './App.css';
import FormState from './context/Form/FormState.js';
import UserFormFormik from './components/Form/UserFormFormik';
import { useSpring, a, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { getAllDescription } from './strapi/data.js'
import logo from './TAP_marca-02-color-RGB-gradiente-invertido.png'
import Ranking from './components/Ranking.js'
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [description, setDescription] = useState('');
  const [descriptionDate, setDescriptionDate] = useState('');
  const [isClosed, setIsClosed] = useState(true);
  const [{ y }, api] = useSpring(() => ({ y: 0 }))

  const open = ({ canceled }) => {
    api.start({ y: -460, immediate: false, config: canceled ? config.wobbly : config.stiff })
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

  useEffect(async () => {
    const data = await getAllDescription()
    setDescription(data[0].description)
    setDescriptionDate(data[0].description_date)
  }, []);

  return (
    <div className="App-body">

      <header className='App-header'>
        <img className='App-logo' src={logo} alt='logo_tap' width={200} />
      </header>

      <section className='App-section-container'>
        <div className='App-section-blob-container'>
          <svg className='App-section-blob' viewBox="0 0 900 600" width="300" height="200" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(491.040369876575 314.33015250579285)"><path d="M135 -144.4C166.2 -103.7 176.9 -51.9 175.3 -1.5C173.8 48.8 160.1 97.6 128.8 129.2C97.6 160.9 48.8 175.5 -6.8 182.3C-62.5 189.1 -124.9 188.3 -174.9 156.6C-224.9 124.9 -262.5 62.5 -257 5.4C-251.6 -51.6 -203.2 -103.2 -153.2 -143.9C-103.2 -184.6 -51.6 -214.3 0.1 -214.4C51.9 -214.5 103.7 -185 135 -144.4" fill="#002350"></path></g></svg>

          <svg className='App-section-blob2' viewBox="0 0 900 600" width="350" height="200" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(491.040369876575 314.33015250579285)"><path d="M135 -144.4C166.2 -103.7 176.9 -51.9 175.3 -1.5C173.8 48.8 160.1 97.6 128.8 129.2C97.6 160.9 48.8 175.5 -6.8 182.3C-62.5 189.1 -124.9 188.3 -174.9 156.6C-224.9 124.9 -262.5 62.5 -257 5.4C-251.6 -51.6 -203.2 -103.2 -153.2 -143.9C-103.2 -184.6 -51.6 -214.3 0.1 -214.4C51.9 -214.5 103.7 -185 135 -144.4" fill="#002350"></path></g></svg>

          <svg className='App-section-blob3' viewBox="0 0 900 600" width="100" height="200" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(420.4308820079848 261.65048676790565)"><path d="M169.9 -122C207.5 -88.4 216.3 -18.5 198.2 39C180.1 96.4 134.9 141.5 75.7 177.9C16.5 214.4 -56.8 242.4 -97.3 217.1C-137.8 191.8 -145.4 113.4 -147.6 49.3C-149.7 -14.7 -146.4 -64.4 -120.9 -95.2C-95.4 -126.1 -47.7 -138 9.3 -145.4C66.2 -152.8 132.4 -155.6 169.9 -122" fill="#002350"></path></g></svg>

          <svg className='App-section-blob4' viewBox="0 0 900 600" width="130" height="200" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(420.4308820079848 261.65048676790565)"><path d="M169.9 -122C207.5 -88.4 216.3 -18.5 198.2 39C180.1 96.4 134.9 141.5 75.7 177.9C16.5 214.4 -56.8 242.4 -97.3 217.1C-137.8 191.8 -145.4 113.4 -147.6 49.3C-149.7 -14.7 -146.4 -64.4 -120.9 -95.2C-95.4 -126.1 -47.7 -138 9.3 -145.4C66.2 -152.8 132.4 -155.6 169.9 -122" fill="#002350"></path></g></svg>

          <svg className='App-section-blob5' viewBox="0 0 900 600" width="300" height="500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(491.040369876575 314.33015250579285)"><path d="M135 -144.4C166.2 -103.7 176.9 -51.9 175.3 -1.5C173.8 48.8 160.1 97.6 128.8 129.2C97.6 160.9 48.8 175.5 -6.8 182.3C-62.5 189.1 -124.9 188.3 -174.9 156.6C-224.9 124.9 -262.5 62.5 -257 5.4C-251.6 -51.6 -203.2 -103.2 -153.2 -143.9C-103.2 -184.6 -51.6 -214.3 0.1 -214.4C51.9 -214.5 103.7 -185 135 -144.4" fill="#002350"></path></g></svg>

          <svg className='App-section-blob6' viewBox="0 0 900 600" width="400" height="500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(491.040369876575 314.33015250579285)"><path d="M135 -144.4C166.2 -103.7 176.9 -51.9 175.3 -1.5C173.8 48.8 160.1 97.6 128.8 129.2C97.6 160.9 48.8 175.5 -6.8 182.3C-62.5 189.1 -124.9 188.3 -174.9 156.6C-224.9 124.9 -262.5 62.5 -257 5.4C-251.6 -51.6 -203.2 -103.2 -153.2 -143.9C-103.2 -184.6 -51.6 -214.3 0.1 -214.4C51.9 -214.5 103.7 -185 135 -144.4" fill="#002350"></path></g></svg>
        </div>

        <div className='App-div-container'>
          <div className="App-section-description-container unselectable">
            <div className="App-section-description">
              <h2 className="App-text-header-title">{description}</h2>
              <h3 className="App-text-header-description">{descriptionDate}</h3>
            </div>
          </div>

          <Ranking />
        </div>
      </section>

      <section className='swipeable-form-container unselectable'>
        <a.div {...bind()} style={{ y, touchAction: 'none' }}>
          <div className='swipeable-form'>
            <div className='div-form'>
              <div className="App-container-button" onClick={isClosed ? open : close}>
                <div className="App-button-slide"></div>
              </div>
              <h2 className="App-text-form-title">¡Hola! ¿Cómo estás?</h2>
              <h3 className="App-text-form-description">¡Completa el formulario para participar de nuestra campaña!</h3>
              <Router>
                <Route path="/" exact>
                  <UserFormFormik />
                </Route>
              </Router>
            </div>
          </div>
        </a.div>
      </section>

    </div>
  );
}

export default function AppWrapper() {
  return (
    <FormState>
      <App />
    </FormState>
  )
};
