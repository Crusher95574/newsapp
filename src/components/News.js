import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  //props in class based components
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} -  NewsDivay`;
  }

  async componentDidMount() {
    //    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f04b59f0897f4d1e823289b3d621f2b0&page=1&pageSize=${this.props.pageSize}`;
    //    let data = await fetch(url);
    //    let parsedData = await data.json();
    // this.setState({
    // articles: parsedData.articles,
    // totalResults: parsedData.totalResults,
    // })
    this.updateNews();
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f04b59f0897f4d1e823289b3d621f2b0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
       
    });
  }

  handlePreviousClick = async () => {
    //    let  url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f04b59f0897f4d1e823289b3d621f2b0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //  this.setState({loading: true});
    //    let data= await fetch(url);
    //    let parsedData =await data.json();
    //    console.log(parsedData);
    // this.setState({
    //  page: this.state.page -1,
    //  articles : parsedData.articles,
    //  loading: false
    // })

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    //if(!(this.state.page +1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    //let  url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f04b59f0897f4d1e823289b3d621f2b0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data= await fetch(url);
    //     let parsedData =await data.json();
    //     console.log(parsedData);
    // this.setState({
    //page: this.state.page -1,
    // articles : parsedData.articles,
    // loading: false
    // })
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };


  fetchMoreData =async () => {
   this.setState({page: this.state.page +1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f04b59f0897f4d1e823289b3d621f2b0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      totalResults:parsedData.totalresults,
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
    }); 
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsDivay - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlings
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={
            this.state.articles.length !==
            this.state.totalResults
          }
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element,index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    author={element.author}
                    date={element.publishedAt}
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
       { /*<div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>*/}
          </div>
    );
  }
}

export default News;
