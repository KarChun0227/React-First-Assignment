    import _ from 'lodash';

    class StubAPI {

        constructor() {
            this.students = [
                {
                    'name': 'Karchun Goh',
                    'id':'34568'
                },

                {
                    'name': 'Chee Ming Tan',
                    'id':'78904'
                }, 

                {
                    'name': 'April',
                    'id':'78906'
                },

                {
                    'name': 'Shushi',
                    'id':'23452'
                },

                {
                    'name': 'Test',
                    'id':'12345'
                }
            ] ; 
        }

        delete(k) {
            let elements = _.remove(this.students, 
                (student) => student.id === k
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

        update(key,n) {
            var index = _.findIndex(this.students, 
                (student) => student.id === key
            );      
            if (index !== -1) {
                this.students.splice(index, 1, 
                    {name: n});
                return true ;
            }
            return false ;
        }

    }

    export default (new StubAPI() );