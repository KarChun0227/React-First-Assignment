    import _ from 'lodash';

    class StubAPI {

        constructor() {
            this.students = [
                {
                    'name': 'Karchun Goh',
                    'id':'34568',
                    'address': '123 Test St',
                    'phone_number': '132-3212'
                },

                {
                    'name': 'Chee Ming Tan',
                    'id':'78904',
                    'address': '23 Main St',
                    'phone_number': '934-4329'
                }, 

                {
                    'name': 'April',
                    'id':'78906',
                    'address': '4 Lower St',
                    'phone_number': '432-5832'
                },

                {
                    'name': 'Shushi',
                    'id':'23452',
                    'address': '49 Upper Street',
                    'phone_number': '934-4290'
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

        add(n,i,a,p) {
            let len = this.students.length ;
            let newLen = this.students.push({
                name: n,id: i, address : a, phone_number: p }) ;
            return newLen > len ;
        }

        update(key,n,i,a,p) {
            var index = _.findIndex(this.students, 
                (student) => student.id === key
            );      
            if (index !== -1) {
                this.students.splice(index, 1, 
                    {name: n, id: i, address: a, phone_number: p});
                return true ;
            }
            return false ;
        }

    }

    export default (new StubAPI() );