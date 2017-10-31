import React from 'react';
import localCache from './LocalCache';
import request from 'superagent' ; 

class ImagesSection extends React.Component { 
      render(){
          var mainImage = (
            <div className="student-images">
              <img src={"/StduentDetail/" + this.props.student.images} 
                    alt={this.props.student.name}
                    className="student" />
            </div>
            ) ;
            return (
                <div>
                   {mainImage}
                   <h1>{this.props.student.name}</h1>
                  </div>
                  );
          }
    };

    class StudentResult extends React.Component {
        state = { };

       componentDidMount() {
          request.get(
             '/StduentDetail/result/' + this.props.params.id + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                localCache.setStudent(json);
                this.setState({});
           }) ;
      } 

      render(){
          let display = <p>No phone details</p> ; 
          let student = localCache.getStudent();
          if (student) {
              display = <ImagesSection student={student} /> ;
          }
          return (
            <div>
              {display}
            </div>
            );
      }
    };

    export default StudentResult;