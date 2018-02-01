import React from 'react';



const DisplayData = (props) => {
    const buttonStyle = {
        marginRight : "12px",
        marginTop: "12px"
    };
   
    return (
        <div>
        <div>
        
            <div className="panel panel-info">
            <div className="panel-heading">
            <h1 className="panel-title">Name : {props.data.name}</h1>
            <button style={buttonStyle}  onClick={()=>(props.delfunc(props.data._id))} className="btn btn-sm btn-danger">Delete Info</button>
            <button style={buttonStyle} onClick={()=>{props.updatefunc(props.data._id)}} className="btn btn-sm btn-primary">Update Info</button>
            </div>
            <div className="panel-body">
            <h4>Info</h4>
            <hr/>
            {props.data.info}
            </div>
            </div>
        </div>
            
        </div>
    );


} 


export default DisplayData;