import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import StudentResult from './StudentResult';
import Student from './App';


 class App extends React.Component {
          render() {
            return (
              <div>
                {this.props.children}
              </div>
            )
          }
    };

ReactDOM.render( 
              <Router history={browserHistory} >
                <Route path="/" component={App}>
                   <IndexRoute component={Student}/>
                   <Route path="result/:id" component={StudentResult} />
                </Route>
              </Router>
            ,
      document.getElementById('root')
    );