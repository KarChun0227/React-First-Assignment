 import React from 'react';
 import api from './stubAPI';
 import buttons from './config/buttonsConfig';

    class Table extends React.Component {
      render() {
          return (
            <table className="table table-bordered">
                <thead>
                  <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  </tr>
                </thead>
                  <StudentList students={this.props.students}/>
            </table>
            );
      }
    }

    class Student extends React.Component {
      render() {
          return (
            <tr >
              <td>
                 { this.props.student.name }
              </td>
              <td>
                 {this.props.student.id }
              </td>
              <td>
                 <input type="button" className="btn btn-primary" value="Edit"/>
              </td>  
              <td>
                 <input type="button" className="btn btn-danger" value="Delete"/>
              </td>                      
          </tr>

            ) ;
        }
    }

    class StudentsApp extends React.Component {
      render() {
        var students = api.getAll() ;
          return (
                <div>
                   <h1>Student List.</h1>
                   <Table students={students}  />
                </div>
          );
      }
    }


  class StudentList extends React.Component {
      render() {
         var studentRows =   this.props.students.map(
                function(c) {
                     return <Student key={c.id} student={c} />
                });
          return (
              <tbody >
                  {studentRows}
                  <studentForm />
              </tbody>
            ) ;
        }
    }

  class StudentForm extends React.Component {
      render() {
        return (
          <tr>
            <td>
            <input type="text" className="form-control" />
            </td>
            <td>
            <input type="text" className="form-control"/>
            </td>
            <td>
            <input type="text" className="form-control" />
            </td>
            <td>
            <input type="button" className="btn btn-primary" value="Add"/>
            </td>
          </tr>
          )
      }
    }

  export default StudentsApp;
