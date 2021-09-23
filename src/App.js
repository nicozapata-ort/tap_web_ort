import logo from './logo.svg';
import logo2 from './Tap.png';
import './App.css';
// import Formulario from './components/Formulario.js';
import FormState from './context/Form/FormState.js';
import UserForm from './components/UserForm.js'
import UserFormFormik from './components/Form/UserFormFormik';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo2} className="App-logo" alt="logo" />
      </header>
      <body className="App-body">

        <section className="App-section-description">
          <h2 className="App-text-header-title">¡Tap está de cumpleaños y te regala $1000 para tu próxima recarga!</h2>
          <h3 className="App-text-header-description">Desde el 30/09 al 21/10 inclusive</h3>
        </section>

        <section className="App-section-form">
          <div className="App-container-button">
            <button className="App-button-slide" onClick={console.log("Esto es un mensaje bro")}></button>
          </div>
          <h2 className="App-text-form-title">¡Hola! ¿Cómo estás?</h2>
          <h3 className="App-text-form-description">¡Completa el formulario para participar de nuestra campaña!</h3>
          <br/>
          <UserFormFormik/>
          {/* <UserForm /> */}
        </section>

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
