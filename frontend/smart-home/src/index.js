import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';  // 导入 Provider
import { store, persistor } from './app/store';  // 使用命名导出导入 store 和 persistor
import { PersistGate } from 'redux-persist/integration/react';  // 导入 PersistGate
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* 使用 Provider 包裹整个应用 */}
      <PersistGate loading={null} persistor={persistor}>  {/* 使用 PersistGate 包裹 */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
