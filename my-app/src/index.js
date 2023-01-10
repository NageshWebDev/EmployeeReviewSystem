import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.module.css"
import AllEmpProvider from './components/Provider/viewEmpProvider';
import AllReviewsProvider from './components/Provider/reviews';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AllEmpProvider>
            <AllReviewsProvider>
                <App />
            </AllReviewsProvider>
    </AllEmpProvider>
);
