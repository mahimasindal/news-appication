import React, { Component } from "react";
import NewsItem from "../NewsItem/NewsItem";
import Spinner from "../Spinner/Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 8,
    category: "general",
  };

  static propTypes = {
    setProgress: propTypes.func,
    apiKey:propTypes.string,
    country: propTypes.string,
    pagesize: propTypes.number,
    category: propTypes.string,
  };

  capitalizeFirstLetter=(str)=>{
      return str[0].toUpperCase()+str.slice(1);

  }

  constructor(props) {
    
    super(props);
    console.log("api in new=",this.props.apiKey)
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    const apiURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(apiURL);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async (e) => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async() =>{
      console.log("here")
      this.setState({page: this.state.page + 1});
      const apiURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(apiURL);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        loading: false,
        });
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-xs my-3"
                  key={element.url}
                >
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1 ? true : false}
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
