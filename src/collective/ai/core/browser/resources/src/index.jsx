import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import './styles/index.css'
// import './styles/themes/default.css'

import AIAssistant from "./components/AIAssistant";

const rootElement = document.getElementById('ai-chat');
ReactDOM.createRoot(rootElement).render(<AIAssistant />);


