import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="card">
        
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{"z-index":1,"left":90+"%"}}>
            {source}
          </span>
        
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://images.cnbctv18.com/wp-content/uploads/2019/10/SENSEX_NSE_nifty_BSE_Stock-market-1019x573.jpg?impolicy=website&width=500&height=300"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "unknown"} on {new Date(date).toGMTString()}
            </small>{" "}
          </p>
          <a
            href={newsUrl}
            target="_blank"
            className="btn btn-dark btn-sm btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    );
  }
}
