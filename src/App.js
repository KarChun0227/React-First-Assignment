import React from 'react';
import api from './stubAPI';
import buttons from './Button';
import { Link } from 'react-router'; 
import request from 'superagent';

const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'require';
  }
};

class Student extends React.Component {
  state = {
      status : 'normal',
      _id: this.props.student._id,
      name: this.props.student.name,
      studentid: this.props.student.studentid,
      math: this.props.student.math,
      programming: this.props.student.programming,
      component:this.props.student.component
    };

    handleEdit = () =>  this.setState({ status : 'edit'} );

    handleSave = (e) => {
    e.preventDefault();
    let name = this.state.name;
    let studentid = this.state.studentid;
    if (!name || !studentid) {
      return;
    }
    this.setState({status : 'normal'} );
    this.props.updateHandler(this.props.student._id,this.state.name,this.state.studentid);
    }; 

    handleDel = (e) => {
      e.preventDefault();
      let id = this.state._id;
      if (!id){
        return;
      }
      this.setState({status: 'normal'});
      this.props.delHandler(this.props.student._id);
      };

    handleDelete = () => this.setState({status: 'delete'});              

    handleCancel = function() {
          this.setState({ status : 'normal', 
                name: this.props.student.name,
                id: this.props.student.id}) ;
    }.bind(this);

    handleNameChange = (e) =>  this.setState({name: e.target.value});

    handleIdChange = (e) => this.setState({studentid: e.target.value});

  render() {
         let activeButtons = buttons.normal ;
         let leftButtonHandler = this.handleEdit ;
         let rightButtonHandler = this.handleDelete ;
         let fields = [
                  <Link to={"/result/" + this.state._id}><td key={'name'} >{this.state.name}</td></Link>,
                  <td key={'studentid'}>{this.state.studentid}</td>,
               ] ;
          if (this.state.status === 'edit' ) {
               activeButtons = buttons.edit ;
               leftButtonHandler = this.handleSave;
               rightButtonHandler = this.handleCancel ;
               fields = [
                  <td key={'name'}><input type="text" className="form-control" 
                     value={this.state.name}
                     onChange={this.handleNameChange} /> </td>,
                  <td key={'studentid'}><input type="text" className="form-control" 
                     value={this.state.studentid}
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
                 return <Student key={c.studentid} student={c} updateHandler={this.props.updateHandler} delHandler={this.props.delHandler}/>
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
  updateStudent = (key, n, i) => {
        request
           .put('http://0.0.0.0:3000/api/students/' + key )
           .send({ name: n, studentid: i})
           .set('Content-Type', 'application/json')
           .end((err, res) => {
             if (err || !res.ok) {
               alert('Error updating');
             } else {
                api.update(key,n,i); 
                this.setState({});      
             }
           });  
    };

  delStudent = (key) => {
    request
          .del('http://0.0.0.0:3000/api/contacts/' + key)
          .end( (err, res) => {
              if (err || !res.ok) {
                 alert('Error deleting contact');
               } else {
                  api.delete(key);
                  this.setState( {} ) ;
               } 
          });
  };

  componentDidMount() {
   request.get('http://127.0.0.1:3000/api/students')
      .end((error, res) => {
        if (res) {
          var student = JSON.parse(res.text);
          api.initialize(student);
          this.setState({}) ;                
        } else {
          console.log(error );
        }
      }) ; 
  }

  render() {
    var students = api.getAll();
      return (
            <div>
               <h1>Student List.</h1>
               <Table students={students} updateHandler={this.updateStudent} delHandler={this.delStudent}/>
            </div>
      );
  }
}


export default StudentsApp;
