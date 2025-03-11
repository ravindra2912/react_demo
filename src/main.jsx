import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './front/services/redux/Store.jsx'

import App from './App.jsx'
import MainRoutes from './routes/MainRoutes.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <>
    <StrictMode>
      <Provider store={store}>
        <MainRoutes />
      </Provider>
    </StrictMode>
  </>
)
