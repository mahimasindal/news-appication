import React, { Component } from 'react'
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import LoadingBar from 'react-top-loading-bar'

import {BrowserRouter as Router,
    Routes,
    Route} from "react-router-dom";

export default class App extends Component {
    apiKey='2ff2c620e9a842e9bce8283cbd0a6bc3'
    state={
        progress:10
    }
    setProgress=(progress)=>{
        this.setState({progress: progress})
    }
    render() {
        console.log("api=",this.apiKey)
        return ( 
        <>
        <Router>
           <Navbar/> 
           <LoadingBar
           height={4}
            color='purple'
            progress={this.state.progress}
            />
           <Routes>
                <Route exact path="/" element={<News key="general" setProgress={this.setProgress} apiKey={this.apiKey}  pagesize={6} country="in" category="general"/>}/>
                <Route exact path="/business" element={<News key="business" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={6} country="in" category="business"/>}/>
                <Route exact path="/entertainment" element={<News key="entertainment" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={6} country="in" category="entertainment"/>}/>
                <Route exact path="/health" element={<News key="health" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={6} country="in" category="health"/>}/>
                <Route exact path="/science" element={<News key="science" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={6} country="in" category="science"/>}/>
                <Route exact path="/sports" element={<News key="sports" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={6} country="in" category="sports"/>}/>
                <Route exact path="/technology" element={<News key="technology" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={6} country="in" category="technology"/>}/>
              
           </Routes>
         </Router>
        </>
        )
    }
}