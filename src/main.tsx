import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';

import App from './App';
import './index.css';
import { client } from './core/apollo';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ConfigProvider>
  </React.StrictMode>
);
