import React from 'react';
import localCache from './LocalCache';
import request from 'superagent' ; 

class ImagesSection extends React.Component { 
      render(){
          var mainImage = (
            <div className="student-images">
              <img src={"/studentDetail/" + this.props.student.images} 
                    alt={this.props.student.name}
                    className="student" />
            </div>
            ) ;
            return (
                <div>
                   {mainImage}
                   { this.props.student.Name }
                  </div>
                  );
          }
    };

    class StudentResult extends React.Component {
        state = { };

       componentDidMount() {
          request.get(
             '/studentDetail/result/' + this.props.params.id + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                localCache.setStudent(json);
                this.setState({});
           }) ;
      } 

      render(){
          let display2 = <h1>StudentResult</h1>;
          let display = null; 
          let student = localCache.getStudent();
          console.log(student)
          if (student) {
              display = <ImagesSection student={student} /> ;

          }
          // this.setState({});
          return (
            <div>
              {display2}
              <p>{this.props.params.name}</p>
              {display}
            </div>
            );
      }
    };

    export default StudentResult;