import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { initTips } from './reducers/tipReducer';

import AddTip from './components/AddTip';
import TipList from './components/TipList';

const App = (props) => {

    useEffect(() => {
        if ( props.tips.processing ) {
            props.initTips();
        }
    });

    return (
        <div className="App">
            <Router>
                <h1 className="heading heading__h1">Lukuvinkkikirjasto</h1>
                <div className="content-container">
                    <Route exact path="/add-tip" render={ () =>
                        <AddTip />
                    }
                    />

                    <Route exact path="/" render={() =>
                        <TipList />
                    }
                    />
                </div>
            </Router>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        tips: state.tips
    };
};

const connectedApp = connect(
    mapStateToProps,
    {
        initTips,
    })(App);
export default connectedApp;