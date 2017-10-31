import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import PhoneDetail from './StudentResult';


 class App extends React.Component {
          render() {
            return (
              <div>
                <h1>Phone Catalogue </h1>
                {this.props.children}
              </div>
            )
          }
    };

ReactDOM.render( 
              <Router history={browserHistory} >
                <Route path="/" component={App}>
                   <IndexRoute component={StudentList}/>
                   <Route path="result/:id" component={StudentResult} />
                </Route>
              </Router>
            ,
      document.getElementById('root')
    );