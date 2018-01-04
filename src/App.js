 import React from 'react';
 import api from './stubAPI';
 import buttons from './Button';
 import { Link } from 'react-router'; 



    class Student extends React.Component {
      state = {
          status : 'normal',
          name: this.props.student.name,
          id: this.props.student.id
        };

      handleEdit = () =>  this.setState({ status : 'edit'} );

        handleSave = (e) => {
        e.preventDefault();
        let name = this.state.name.trim();
        let id = this.state.id.trim();
        if (!name || !id) {
          return;
        }
        this.setState({status : 'normal'} );
        this.props.updateHandler(this.props.student.id, name);
      }; 

          handleDel = function(e) {
            e.preventDefault();
            let id = this.state.id.trim();
            if (!id){
              return;
            }
            this.setState({status: 'normal'});
            this.props.delHandler(this.props.student.id);
          }.bind(this);

          handleDelete = () => this.setState({status: 'delete'});              

          handleCancel = function() {
              this.setState({ status : 'normal', 
                    name: this.props.student.name,
                    id: this.props.student.id}) ;
          }.bind(this);

          handleNameChange = (e) =>  this.setState({name: e.target.value});

          handleIdChange = (e) => this.setState({id: e.target.value});

      render() {
             let activeButtons = buttons.normal ;
             let leftButtonHandler = this.handleEdit ;
             let rightButtonHandler = this.handleDelete ;
             let fields = [
                      <Link to={'/result/' + this.state.id}><td key={'name'} >{this.state.name}</td></Link>,
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

               if (this.state.status === 'delete'){
                  activeButtons = buttons.delete;
                  leftButtonHandler = this.handleCancel;
                  rightButtonHandler = this.handleDel;
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




  class StudentList extends React.Component {
      render() {
         var studentRows =   this.props.students.map((c) => {
                     return <Student key={c.id} student={c} updateHandler={this.props.updateHandler} delHandler={this.props.delHandler}/>
                });
          return (
              <tbody >
                  {studentRows}
              </tbody>
            ) ;
        }
    }
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
                  </tr>
                </thead>
                  <StudentList students={this.props.students} updateHandler={this.props.updateHandler} delHandler={this.props.delHandler}/>
            </table>
            );
      }
    }

    class StudentsApp extends React.Component {
      updateStudent = (key, n) => {
            api.update(key,n); 
            this.setState({});  
          };
      delStudent = (key) => {
        api.delete(key);
        this.setState({});
      };
      render() {
        var students = api.getAll();
          return (
                <div>
                   <h1>Student List.</h1>
                   <Table students={students} updateHandler={this.updateStudent} handleDel={this.delStudent}/>
                </div>
          );
        

      }
    }


  export default StudentsApp;
