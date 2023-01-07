import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
   let {title,description, imageUrl,newsUrl}=this.props;
    return (
      <div className='my-3 mx-3'>
        <div className="card" style={{width: "18rem"}}>
  <img src={!imageUrl?"https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80":imageUrl} className="card-img-top" alt="..." /> 
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem