import React from 'react';
import './App.css';
import { Globalstyle } from './style';
import Nav from './common/Nav/index';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

function App() {

        return (
            <div style={{height:"100%"}}>
                <Globalstyle/>
                <Provider store={store}>
                    <BrowserRouter>
                        <Nav />
                    </BrowserRouter>
                </Provider>
            </div>
        );
}


export default App;
