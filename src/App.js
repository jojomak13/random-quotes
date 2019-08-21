import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quotes: [],
      current: 0,
      last: 0
    }

    this.handleQuote = this.handleQuote.bind(this);
  } 
  
  componentDidMount(){
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((res) => {
        this.setState({ 
          quotes: res.data.quotes,
          last: --res.data.quotes.length,
        });
      });
  }
    
  handleQuote(){
    if(this.state.current > this.state.last)
      this.setState({ current: 0 });
    else
      this.setState({ current: this.state.current+1 });
  }
  
  getQuote(){
    return Object(this.state.quotes[this.state.current]);
  }

  render(){
    return (
      <div id="quote-box">
        <blockquote  id="text">
          <i className="fa fa-quote-left"></i>
          <span>{ this.getQuote().quote }</span>
          <i className="fa fa-quote-right"></i>
        </blockquote >
        <span id="author">"{this.getQuote().author}"</span>
        
        <div id="btns">
          <a target="_blank" href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + this.getQuote().quote} id="tweet-quote"><i className="fa fa-twitter"></i></a>
          <button onClick={this.handleQuote} id="new-quote">New Quote</button>
        </div>
      </div>
    );
  }
  
}

export default App;
