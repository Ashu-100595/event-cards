import React, { Component } from "react";
import axios from "axios";
import Card from "./card";
import "./landing-page.scss";

export default class LandingPage extends Component {

  state = {
    count:0,
    events:[],
    pastEvents:true,
    limit:16,
    searchText:''
  }

  componentDidMount(){
      this.getCardsData();
  }

  getCardsData = () => {
    const{limit, pastEvents, searchText} = this.state
    
    let params = {
        limit:limit,
        past_events:pastEvents,
        search_query:searchText
    }

    axios.get("https://iitm1blt3l.execute-api.ap-southeast-1.amazonaws.com/dev/hosted-events", {params:params})
    .then((res)=>{
        // console.log(res.data);
        this.setState({...res.data})
    })
    .catch(e=>console.log(e))
  }

  selectChange = (ev) => {
    const{name,value} = ev.target
    this.setState({pastEvents:value})
  }

  searchInput = (ev) => {
    const{name,value} = ev.target
    this.setState({searchText:value})
  }

  onLoadMore = () => {
      const{limit} = this.state
      this.setState({limit:limit+12})
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.pastEvents !== this.state.pastEvents || prevState.limit !== this.state.limit || prevState.searchText !== this.state.searchText){
        this.getCardsData()
    }
  }

  render() {
      const {count,events,pastEvents,searchText} = this.state
      console.log(count, events);
    return (
      <div className="landing-wrapper">
        <div className="header">
          <img src="./nav@2x.png" className="konf-logo" />
        </div>

        <div className="upper-section-wrapper">
          <div className="upper-section-background">
            <div className="content-wrapper">
              <p className="heading">Events</p>
              <p className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                aliquam, purus sit amet luctus venenatis, lectus magna fringilla
                urna, porttitor rhoncus dolor purus non enim praesent elementum
                facilisis leo, vel fringilla est ullamcorper eget nulla facilisi
                etiam dignissim diam quis enim lobortis scelerisque fermentum
                dui faucibus in ornare quam viverra
              </p>
            </div>
            <img src="./octo.png" className="img-wrapper" />
          </div>
          <div className="filter-wrapper">
              <div className="search-wrapper">
                <p className="label">Search</p>
                <div className="input-wrapper">
                    <input type='text' className="input-box" onChange={(ev)=>this.searchInput(ev)} value={searchText}/>
                    <img src='./search-icon.png' className="search-icon" />
                </div>
              </div>
              <div className="dropdown-wrapper">
                <p className="label">Past Events</p>
                <div className="select-dropdown">
                    <select name="past-events" value={pastEvents} onChange={(ev)=>this.selectChange(ev)}>
                        <option value={true} >True</option>
                        <option value={false} >False</option>
                    </select>
                </div>
              </div>
          </div>
        </div>

        <div className="mid-section-wrapper">
           <p className="event-count">
             {count>250 ? "250+ Events" : count + " Events"}
           </p>
           <Card data={events}/>
        </div>

        <div className="load-wrapper">
           <hr/>
           <button onClick={this.onLoadMore}>Load More</button>
           <hr/>
        </div>
      </div>
    );
  }
}
