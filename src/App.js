 import React from 'react';
 import api from './stubAPI';
 import buttons from './Button';

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
      state = {
          status : '',
          name: this.props.student.name,
          id: this.props.student.id,
        };

      handleEdit = () =>  this.setState({ status : 'edit'} );

          handleSave = (e) =>  null ;              

          handleCancel = function() {
              this.setState({ status : '', 
                    name: this.props.contact.name,
                    id: this.props.contact.id}) ;
          }.bind(this);

          handleNameChange = (e) =>  this.setState({name: e.target.value});

          handleIdChange = (e) => this.setState({id: e.target.value});

      render() {
             let activeButtons = buttons.normal ;
             let leftButtonHandler = this.handleEdit ;
             let rightButtonHandler = null ;
             let fields = [
                     <td key={'name'} >{this.state.name}</td>,
                      <td key={'id'}>{this.state.id}</td>,
                   ] ; 
              if (this.state.status === 'edit' ) {
                   activeButtons = buttons.edit ;
                   leftButtonHandler = this.handleSave;
                   rightButtonHandler = this.handleCancel ;
                   fields = [
                      <td key={'name'}><input type="text" className="form-control"
                         value={this.state.name}
                         onChange={this.handleNameChange} /> </td>,
                      <td key={'id'}><input type="text" className="form-control"
                         value={this.state.id}
                         onChange={this.handleIdChange} /> </td>,
                   ] ;
               }
              return (
                    <tr >
                      {fields}
                      <td>
                          <input type="button" className={'btn ' + activeButtons.leftButtonColor} 
                                 value={activeButtons.leftButtonVal}
                                 onClick={leftButtonHandler} />
                      </td>
                      <td>
                         <input type="button" className={'btn ' + activeButtons.rightButtonColor} 
                               value={activeButtons.rightButtonVal} 
                               onClick={rightButtonHandler} />
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
