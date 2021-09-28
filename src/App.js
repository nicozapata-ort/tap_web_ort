import React, { useState } from 'react'
import logo from './logo.svg';
import logo2 from './Tap.png';
import './App.css';
// import Formulario from './components/Formulario.js';
import FormState from './context/Form/FormState.js';
import UserForm from './components/UserForm.js'
import UserFormFormik from './components/Form/UserFormFormik';
import { Paper, SwipeableDrawer } from '@material-ui/core'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { height } from '@mui/system';

const SCREEN_HEIGHT = window.innerHeight;



function App() {

  // const formPos = useSpring({ y: 0 })

  // const bindFormPos = useDrag((params) => {
  //   const y = params.xy[1];

  //   if (y >= 0 && y <= SCREEN_HEIGHT) {
  //     formPos.y.set(y)
  //   }
  // })

  function PullRelease({ children }) {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    const bindFormPos = useDrag(({ down, movement: [mx, my], dragging }) => {

      api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
      // if(dragging){
      //   console.log("AHRE")
      // }else{
      //   y.start(-403)
      // if(my > SCREEN_HEIGHT/2){
      //   console.log('SOBREPASE LA MITAD AL SOLTAR', SCREEN_HEIGHT, my)
      // }else{
      //   console.log('NO SOBREPASE LA MITAD AL SOLTAR', SCREEN_HEIGHT, my)
      //   y.start(0)
      // }
      // }

    })

    // Bind it to a component
    return <animated.div {...bindFormPos()} style={{ y }}>{children}</animated.div>
  }

  /*
    const buttonPos = useSpring({ y: 0 })
  
    const bindButtonPos = useDrag((params) => {
      buttonPos.y.set(params.offset[1])
    })
  */

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo2} className="App-logo" alt="logo" />
      </header> */}
      <body className="App-body">

        <section className='App-section-form2'>
          <div class="custom-shape-divider-top-1632780241">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
            </svg>
          </div>
        </section>

        <div className='App-section-blob-container'>
          <svg className='App-section-blob' viewBox="0 0 900 600" width="400" height="300" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(491.040369876575 314.33015250579285)"><path d="M135 -144.4C166.2 -103.7 176.9 -51.9 175.3 -1.5C173.8 48.8 160.1 97.6 128.8 129.2C97.6 160.9 48.8 175.5 -6.8 182.3C-62.5 189.1 -124.9 188.3 -174.9 156.6C-224.9 124.9 -262.5 62.5 -257 5.4C-251.6 -51.6 -203.2 -103.2 -153.2 -143.9C-103.2 -184.6 -51.6 -214.3 0.1 -214.4C51.9 -214.5 103.7 -185 135 -144.4" fill="#FFFFFF"></path></g></svg>

          <svg className='App-section-blob2' viewBox="0 0 900 600" width="450" height="300" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(491.040369876575 314.33015250579285)"><path d="M135 -144.4C166.2 -103.7 176.9 -51.9 175.3 -1.5C173.8 48.8 160.1 97.6 128.8 129.2C97.6 160.9 48.8 175.5 -6.8 182.3C-62.5 189.1 -124.9 188.3 -174.9 156.6C-224.9 124.9 -262.5 62.5 -257 5.4C-251.6 -51.6 -203.2 -103.2 -153.2 -143.9C-103.2 -184.6 -51.6 -214.3 0.1 -214.4C51.9 -214.5 103.7 -185 135 -144.4" fill="#FFFFFF"></path></g></svg>

          <svg className='App-section-blob3' viewBox="0 0 900 600" width="250" height="300" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(420.4308820079848 261.65048676790565)"><path d="M169.9 -122C207.5 -88.4 216.3 -18.5 198.2 39C180.1 96.4 134.9 141.5 75.7 177.9C16.5 214.4 -56.8 242.4 -97.3 217.1C-137.8 191.8 -145.4 113.4 -147.6 49.3C-149.7 -14.7 -146.4 -64.4 -120.9 -95.2C-95.4 -126.1 -47.7 -138 9.3 -145.4C66.2 -152.8 132.4 -155.6 169.9 -122" fill="#FFFFFF"></path></g></svg>

          <svg className='App-section-blob4' viewBox="0 0 900 600" width="280" height="300" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(420.4308820079848 261.65048676790565)"><path d="M169.9 -122C207.5 -88.4 216.3 -18.5 198.2 39C180.1 96.4 134.9 141.5 75.7 177.9C16.5 214.4 -56.8 242.4 -97.3 217.1C-137.8 191.8 -145.4 113.4 -147.6 49.3C-149.7 -14.7 -146.4 -64.4 -120.9 -95.2C-95.4 -126.1 -47.7 -138 9.3 -145.4C66.2 -152.8 132.4 -155.6 169.9 -122" fill="#FFFFFF"></path></g></svg>

          <svg className='App-section-blob5' viewBox="0 0 900 600" width="1000" height="500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(491.040369876575 314.33015250579285)"><path d="M135 -144.4C166.2 -103.7 176.9 -51.9 175.3 -1.5C173.8 48.8 160.1 97.6 128.8 129.2C97.6 160.9 48.8 175.5 -6.8 182.3C-62.5 189.1 -124.9 188.3 -174.9 156.6C-224.9 124.9 -262.5 62.5 -257 5.4C-251.6 -51.6 -203.2 -103.2 -153.2 -143.9C-103.2 -184.6 -51.6 -214.3 0.1 -214.4C51.9 -214.5 103.7 -185 135 -144.4" fill="#FFFFFF"></path></g></svg>

          <svg className='App-section-blob6' viewBox="0 0 900 600" width="900" height="500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g transform="translate(491.040369876575 314.33015250579285)"><path d="M135 -144.4C166.2 -103.7 176.9 -51.9 175.3 -1.5C173.8 48.8 160.1 97.6 128.8 129.2C97.6 160.9 48.8 175.5 -6.8 182.3C-62.5 189.1 -124.9 188.3 -174.9 156.6C-224.9 124.9 -262.5 62.5 -257 5.4C-251.6 -51.6 -203.2 -103.2 -153.2 -143.9C-103.2 -184.6 -51.6 -214.3 0.1 -214.4C51.9 -214.5 103.7 -185 135 -144.4" fill="#FFFFFF"></path></g></svg>
        </div>

        <section className="App-section-description-container">
          <div className="App-section-description">
            <h2 className="App-text-header-title">¡Tap está de cumpleaños y te regala $1000 para tu próxima recarga!</h2>
            <h3 className="App-text-header-description">Desde el 30/09 al 21/10 inclusive</h3>
          </div>

        </section>

        <section className='App-section-logo-container'>
          <div className='App-section-logo'>
            <div className='profile-logo'>
              <div className="App-logo">
                {/* <img src={logo2} className="logo-image" alt="logo" /> */}
              </div>
            </div>
          </div>
        </section>



        <div className='swipeable-form-container'>
          <PullRelease>
            <div className='swipeable-form'>
              <div className="App-container-button">
                <button className="App-button-slide" onClick={() => { }}></button>
              </div>
              <h2 className="App-text-form-title">¡Hola! ¿Cómo estás?</h2>
              <h3 className="App-text-form-description">¡Completa el formulario para participar de nuestra campaña!</h3>
              <br />
              <UserFormFormik />
            </div>
          </PullRelease>
        </div>
      </body>
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
