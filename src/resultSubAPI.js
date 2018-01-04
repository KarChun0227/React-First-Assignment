import _ from 'lodash';

class resultStubAPI {

    constructor() {
        this.result = {} ; 
    }

    initialize(result) { 
          this.result = result
          return null; 
      }


    getAll() {
        return this.result;
  }

    getName()
    {
      return this.result.name;
    }

    getComponent()
    {
      return this.result.component;
    }

        getProgramming()
    {
      return this.result.programming;
    }

        getMath()
    {
      return this.result.math;
    }

}

export default (new resultStubAPI() );