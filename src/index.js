import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import Routes from './routes'
import moment from 'moment'
import 'moment/locale/es'

// Se importa el CSS principal para que se parsee el archivo en webpack
import './css/main.scss'
import 'react-datepicker/dist/react-datepicker.css'

// Código del ServiceWorker
import * as serviceWorker from './serviceWorker';
moment.locale('es')

render(
  <StrictMode>
    <Routes />
  </StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
