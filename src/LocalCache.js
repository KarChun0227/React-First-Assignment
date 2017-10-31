class localCache {

        constructor() {
           this.student = null ;
        }

        setStudent(student) {
           this.student = student ;
        }

        getStudent() {
           return this.student;
        }

    }

    export default (new localCache() );