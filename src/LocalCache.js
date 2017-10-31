class LocalCache {

        constructor() {
           this.student = null ;
        }

        setStudent(student) {
           this.student = student ;
        }

        getPhone() {
           return this.student;
        }

    }

    export default (new LocalCache() );