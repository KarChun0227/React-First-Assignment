import React from 'react';
import localCache from './LocalCache';
import buttons from './Button';
import api from './resultSubAPI';
import request from 'superagent' ; 


class StudentResult extends React.Component {
    componentDidMount() {
     request.get('http://127.0.0.1:3000/api/students/' + this.props.params.id)
        .end((error, res) => {
          if (res) {
            var results = JSON.parse(res.text);
            api.initialize(results);
            this.setState({ }) ; 
          } else {
            console.log(error );
          }
        }) ; 
    }
  render(){
      let display2 = <h1>StudentResult</h1>;
      let display = <img src={"/studentDetail/image/people.png"} alt="Smiley face" height="300" width="300" />; 
      let student = localCache.getStudent();
      var name =  api.getName();
      return (
        <div>
          {display2}
          {display}
          <h2>{name}</h2>
          <Table results={null}/>
        </div>
        );
  }
};

class Table extends React.Component {
  render() {
      var name = "NAME: " + api.getName();
      var Component = "Component: " + api.getComponent();
      var Programming = "Programming: " + api.getProgramming();
      var math = "Math: " + api.getMath();  
      return (
        <table className="table table-bordered">
            <thead>
              <tr>
              <th>{Component}</th>
              <th>{math}</th>
              <th>{Programming}</th>
              </tr>
            </thead>
        </table>
        );
  }
}


export default StudentResult;