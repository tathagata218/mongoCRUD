import React, { Component } from 'react';
import DisplayData from './components/displayComp/displayData';
import "./App.css";
import API from "./utils/api";
import swal from 'sweetalert';

class App extends Component {
  
  state = {
    inputName: "",
    textareaInfo : "",
    allData : []
  };

  inputChangeFunc =  (event) => {
    event.preventDefault();
    this.setState({
      inputName : event.target.value
    });

  };
  
  textareaChageFunc =  (event) => {
    event.preventDefault();
    this.setState({
      textareaInfo : event.target.value
    });
  }

  clickTest = () => {
   const infoData = {
      name : this.state.inputName,
      data : this.state.textareaInfo
    }

    API.saveData(infoData).then(()=>{
      
      API.getInfo().then((data)=>{
        this.setState({
            allData : data.data
          })
          this.render();
       
        
      });
      
      
      // .catch(err => {console.log(err)});

    });

    
  
  } 

  clickDel = (id) => { 

    API.removeInfo(id)
    .then(()=>{
      API.getInfo().then((data)=>{
        this.setState({
            allData : data.data
          })
          this.render();
      
        
      })
      .catch(err => {console.log(err)});

    });

    

  }
  
  clickUpdate = (id) =>{

    swal("Please Select what you want to Update", {
      buttons: {
        Name: {text: "Update Name",
            value : "name"},
        Info: {
          text: "Update Info",
          value: "info",
        }
        
      },
    })
    .then((value) => {
      switch (value) {
     
        case "name":
        swal({
          text: 'Please Type you Name',
          content: "input",
          button: {
            text: "Save",
            closeModal: false,
          }
        }).then((data)=>{
          const updateInfo = {
            name : data
          }
          API.updateInfo(id,updateInfo)
          .then(()=>{

            API.getInfo().then((data)=>{
              this.setState({
                  allData : data.data
                })
                this.render();
            
              
            })
            .catch(err => {console.log(err)});
          })
          .catch((err)=>{if(err){swal("something is wrong")}else{swal.close()}});
          
          
        }).then(()=>{swal.close()});
          break;
     
        case "info":
        swal({
          text: 'Please Type Info',
          content: "input",
          button: {
            text: "save",
            closeModal: false,
          },
        }).then((data)=>{
          const updateInfo = {
            data : data
          }
          API.updateInfo(id,updateInfo)
          .then(()=>{

            API.getInfo().then((data)=>{
              this.setState({
                  allData : data.data
                })
                this.render();
            
              
            })
            .catch(err => {console.log(err)});
          })
          .catch((err)=>{if(err){swal("something is wrong")}else{swal.close()}});
    
        }).then(()=>{swal.close()});

          break;
     
        default:
          swal("Some thing is wrong SORRY!!!");
      }
    });



  }

  render() {

    

    return (
      <div>
      <div className="jumbotron">
        <h1>Tell us about your self!!!!</h1>
      </div>
      <div className="container">
      
      <div className="row">
      <div className="col-md-6 col-md-offset-3">
      
    
      <h4><strong>Name : </strong></h4>
        <input onChange={this.inputChangeFunc} type="text" className="form-control" placeholder="Name" />
     
      <br/>
      <hr/>
      <br/>

      <h4><strong>Info About You : </strong></h4>
      <textarea onChange={this.textareaChageFunc} className="form-control" rows="10" cols="50" maxLength="300" placeholder="Your Hobbies, Your Work" aria-label="With textarea"></textarea>
      <br/>
      <br/>
      <button onClick={this.clickTest} className="btn btn-md btn-default">Save Entries</button>
      </div>
      </div>

      <br/>
      <hr/>
      <br/>
      
      {this.state.allData.map((data)=>{
        return(
        <DisplayData delfunc ={this.clickDel} updatefunc = {this.clickUpdate} data={data} />
        )
      })}

      </div>
      </div>
    );
  }
}

export default App;
