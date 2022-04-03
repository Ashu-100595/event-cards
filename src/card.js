import React, { Component } from "react";

export default class Card extends Component{
    render(){
        const {data} = this.props
       return(
           <div className="cards-wrapper">
               {data?.map((item)=>{
                   return(
                    <div className="card" key={item.id}>
                    <div className="card-img-wrapper" >
                    <img src='./card-img.png' className="card-img" />
                    <img src='./card-circle.png' className="circle-img" />
                    </div>
                    <div className="title">
                        {item.name}
                    </div>
                    <div className="info-wrapper">
                       <div className="address-wrapper">
                       <img src='./add-icon.png'/>
                         <p>Raddison Blue</p>
                       </div>
                       
                       <div className="mode-wrapper">
                         <img src='./mode-icon.svg'/>
                         <p>{item.is_free ? "free" : "paid"}</p>
                         <p>|</p>
                         <p>{item.is_virtual ? "online" : 'offline'}</p>
                       </div>
                    </div>
                </div>
                   )
               })}
           </div>
       )
    }
}