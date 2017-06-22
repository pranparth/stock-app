import React, { Component } from 'react';
import { Navbar, Jumbotron, Button, Grid, Row, Col, PageHeader, ListGroup, ListGroupItem, FormControl, FormGroup, ControlLabel, HelpBlock, ProgressBar } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import 'whatwg-fetch';
import logo from './logo.svg';
import './App.css';
import './custom-jumbotron.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
        );
  }
}
class Signin extends Component {
    render() {
     return(
     <div className="container">

      <form className="form-signin">
        <h2 className="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus /> 
        <label for="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me 
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
        </div>
    );
  }
}
class CustomGrid extends Component {
    constructor() {
        super();
        this.state = {stockName : 'Facebook', url_chosen : '', result : 2, items : [], curr_progress : 0};
        this.setState = this.setState.bind(this);
        this.handleChangeForButton = this.handleChangeForButton.bind(this);
        this.handleChangeForStockList = this.handleChangeForStockList.bind(this);
        this.handleChangeForLinkForm = this.handleChangeForLinkForm.bind(this);
        var curr_items = this.state.items;
        var self = this;
        fetch('http://localhost:8000/api/stocks/').then((resp) => resp.json())
        .then( 
            function(data) { 
                for (let ii = 0; ii < data.length; ii++) {
                    curr_items.push(data[ii].title);
                }
                self.setState({items: curr_items});
            });     
        this.setState({stockName: self.state.items[0]})

    }
    handleChangeForLinkForm(new_val) {
        this.setState({url_chosen: new_val, curr_progress : 0});
    }
    handleChangeForStockList(new_val) {
    
        this.setState({stockName: new_val, curr_progress : 0});
    }
    handleChangeForButton() {
        console.log("about to send, stockName is ", this.state.stockName);
        console.log("about to send, url is ", this.state.url_chosen);
        
        var self = this;
        self.setState({curr_progress: 10});
        fetch("http://localhost:8000/api/startrequest/", { 
             method: 'POST',
             headers: {
              'content-type': 'application/json'
              },
             body: JSON.stringify({stock_name: this.state.stockName, stock_url: this.state.url_chosen})
        })
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data);
            self.state.result = data.movement;
            self.setState({curr_progress: 100});
            console.log(data.movement);
            self.forceUpdate();
        });

    }
    render() {
        console.log("Url is ", this.state.url_chosen);  
        console.log("stock chosen is ", this.state.stockName);
        return (
          <Grid>
            <Row className="show-grid">
              <Col xs={10} md={6}><StockList numRows={4} handler = {this.handleChangeForStockList} items = {this.state.items}/> </Col>
              <Col xs={10} md={6}><StaticResultForm displayResult={this.state.result}/><ProgressTracker progress = {this.state.curr_progress} />  </Col>
            </Row>
            <Row className = "show-grid"> 
            </Row>
            <Row className="show-grid">
              <Col xs={6} md={4}><LinkForm text= {this.state.stock_url} handler={this.handleChangeForLinkForm}/> </Col>
              <Col xs={6} md={4}></Col>
              <Col xsHidden md={4}>  </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} xsOffset={6}> </Col>
            </Row>

            <Row className="show-grid">
              <Col md={6} mdPush={6}></Col>
              <Col md={6} mdPull={6}><code><StartButton handler = {this.handleChangeForButton} displayResult = {1}/> </code></Col>
            </Row>
            <Row className="show-grid"> 
                <Col md={6} mdPush={6}> </Col>
            </Row>
          </Grid>

        );
    }
}
class ProgressTracker extends Component { 
    render() {
        return ( 
        <ProgressBar now = {this.props.progress} /> 
            );
    }
}
class StockHeader extends Component {
    render() {
        return (
            <div> 
            <Jumbotron bsClass='jumbotron custom-jumbotron'> 
                <h1> Stock App </h1>
                <p> Maximum return for minimum risk </p> 
            </Jumbotron> 
            </div>
        );
    }
}
class StockItem extends Component { 
    constructor(props) { 
        super(props);
    }
    render() {
        return (
            <ListGroupItem active={this.props.isActive} onClick={this.props.onClick}> 
                <label> 
                    {this.props.itemDisplay}
                </label>
            </ListGroupItem>
        )
    }
}
class StockList extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
           // items : []
        }
    
        this.selectItem = this.selectItem.bind(this);
        //this.componentDidMount = this.componentDidMount.bind(this);
    }
    selectItem(itemIndex) {
        this.setState({activeIndex: itemIndex});
        this.props.handler(this.props.items[itemIndex]);
    }
    //componentDidMount() {
    //    var curr_items = this.state.items;
    //    var self = this;
    //    fetch('http://localhost:8000/stocks/').then((resp) => resp.json())
    //    .then( 
    //        function(data) { 
    //            for (let ii = 0; ii < data.length; ii++) {
    //                curr_items.push(data[ii].title);
    //            }
    //            self.setState({items: curr_items});
    //        });
   // }
    render() {
        var group = [];
        console.log(this.state.activeIndex);
        for (let ii = 0; ii < this.props.numRows; ii++) { 
            group.push(<StockItem itemIndex={ii} itemDisplay={this.props.items[ii]} onClick={() => this.selectItem(ii)} isActive={ii === this.state.activeIndex}>  </StockItem> );
        }
        return ( 
            <ListGroup> 
                <h1>
                    Choose from the available securities
                </h1>
                {group} 
             </ListGroup> 
        );
    }
}

class LinkForm extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
        }
    }
    render() {
        console.log("current, the text is ", this.state.value);
        return(
              <form>
                <FormGroup
                  controlId="formBasicText"
                >
                  <ControlLabel>Please link to a SeekingAlpha post about this. </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.props.text}
                    placeholder="Enter text"
                    onChange={(e) => this.props.handler(e.target.value)}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>Article linked to will be analyzed using natural language processing.</HelpBlock>
                </FormGroup>
              </form>

            );
    }
}

class StartButton extends Component {
    constructor() {
        super();
    }
    render() {
        return ( 
            <Button bsStyle="primary" bsSize="large" onClick={this.props.handler}> Begin </Button> 
        );
    }
}

class StaticResultForm extends Component { 
    constructor() {
        super();
    }
    render() {
        var text = '';
        var title_text = '';
        console.log("Currently, display result is ", this.props.displayResult);
        if (this.props.displayResult === 2) {
            title_text = 'Instructions';
            text = "Please choose a security and enter a link to a relevant article for a prediction of whether or nor the stock will go up or down ten days from publication. Current analysis indicates a 70-80 percent accuracy of the model. We are not an investment advisory firm. Investing carries substantial risk. ";
        }
        else {
            title_text = 'Predictions';
            text = "Our current analysis suggests a " + Number(this.props.displayResult[0] * 100).toFixed(2) + "% chance that the stock will go down in the next 10 days based on historic prices and articles (including this one) and a " + Number(this.props.displayResult[1]*100).toFixed(2) + "% chance that it will go up in the same time period. We are not an investment advisory firm. Investing carries substantial risk. ";
        }
        return ( 
        <FormGroup>
          <ControlLabel> <h2> {title_text}</h2> </ControlLabel>
          <FormControl.Static>
            <p>
            {text}
            </p>
          </FormControl.Static>
        </FormGroup>
            );
    }
}
export {App, Signin, CustomGrid, StockHeader, StockList};
