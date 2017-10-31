import React from 'react';
import localCache from './localCache';
import request from 'superagent' ; 


    class PhoneDetail extends React.Component {
        state = { };

       componentDidMount() {
          request.get(
             '/phoneSpecs/phones/' + this.props.params.id + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                localCache.setPhone(json);
                this.setState({});
           }) ;
      } 

      render(){
          let display = <p>No phone details</p> ; 
          let phone = localCache.getPhone();
          if (phone) {
              display =  <ImagesSection phone={phone} /> ;
          }
          return (
            <div>
              {display}
            </div>
            );
      }
    };

    export default PhoneDetail;