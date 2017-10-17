 import React from 'react';
 import api from './stubAPI'

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

    class ContactsApp extends React.Component {
      render() {
          return (
                <div>
                   <h1>Contact List.</h1>
                   <ContactsTable contacts={this.props.contacts}  />
                </div>
          );
      }
    }
