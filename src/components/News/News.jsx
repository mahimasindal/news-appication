import React , { useEffect, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
import Spinner from "../Spinner/Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



export default function News(props) {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
   

  const capitalizeFirstLetter=(str)=>{
        
        return str[0].toUpperCase()+str.slice(1);

  }


  const updateNews = async () => {
    const apiURL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
    setLoading(true)

    let data = await fetch(apiURL);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
    console.log(parsedData);

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100)
  }

  useEffect(()=>{
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
      updateNews();
      //eslint-disable-next-line
  }, [])


  /* handlePrevClick = async () => {
    this.setState({ page: page - 1 });
    updateNews();
  };

  handleNextClick = async (e) => {
    this.setState({ page: page + 1 });
    updateNews();
  }; */

  const fetchMoreData = async() =>{
      console.log("here")
      
      const apiURL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pagesize}`;
        setPage(page+1)
        setLoading(true );
        let data = await fetch(apiURL);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setLoading(false);
        
  }
 
    return (
      <div className="container my-3" >
        <h2 className='text-center' style={{"marginTop":90+"px"}}>TEST 1 NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
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
            disabled={page <= 1 ? true : false}
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

News.defaultProps = {
    country: "in",
    pagesize: 8,
    category: "general",
  };

News.propTypes = {
    setProgress: propTypes.func,
    apiKey:propTypes.string,
    country: propTypes.string,
    pagesize: propTypes.number,
    category: propTypes.string,
  };
