import _ from 'lodash';

class StubAPI {

    constructor() {
        this.students = [];
    }

    initialize(students) { 
      this.students = students
      return null; 
    }

    delete(k) {
        let elements = _.remove(this.students, 
            (student) => student._id === k
        );
        return elements; 
    }

    getAll() {
        return this.students;
    }

    add(n,i) {
        let len = this.students.length ;
        let newLen = this.students.push({
            name: n,id: i}) ;
        return newLen > len ;
    }

    update(key,n,i) {
        var index = _.findIndex(this.students, 
            (student) => student.id === key
        );      
        if (index !== -1) {
            this.students.splice(index, 1, 
                {_id: key, name: n, studentid: i});
            return true ;
        }
        return false ;
    }

}

export default (new StubAPI() );