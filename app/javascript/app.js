import React, { Component } from 'react';
import { check }  from 'winner';
import './app.css';
import { Button } from 'react-bootstrap';
import { Jumbotron, Container } from 'react-bootstrap';
import Spinner  from 'react-bootstrap/Spinner';
import validator from './validator';
import Validation from "./Validation";

class App extends Component {

  state = {
    userInput: '',
    submitted: false,
    loading: false,
    evaluated: false,
    winner: false
  }

  inputChangedHandler = ( event ) => {
    this.setState( { userInput: event.target.value } );
  };

  canBeSubmitted() {
    return validator(this.state.userInput).valid;
  };

  onSubmitHandler = ( event ) => {
    if (!this.canBeSubmitted()) {
      preventDefault(); 
    } else {
      this.setState({submitted: true, loading: true})
      check(`${this.state.userInput}`)
      .then(response => {
          this.setState({winner: response.winner, evaluated: true});
      })
      .finally(() => this.setState({loading: false}))      
    }
  }
 
  render() {

    let isEnabled = this.canBeSubmitted(); 
    let spinner = null;
    let result = '';
    let buttonText = 'Submit';
    let componentHidden = false;

    if(this.state.winner)  {
      result = "Congratulations, you won a membership!!! ";
    } else if (this.state.evaluated && !this.state.winner) {
      result = "Unfortunately, you didn't win this time...";      
    } 

    if (this.state.evaluated) {
     componentHidden = true;
    }

    if (this.state.loading) { 
      spinner =
        <Spinner
          as="span"
          animation="grow"
          role="status"
          aria-hidden="true"
        />
        buttonText = "Loading"
    }

    return (
      <div className="main">
        <header>
          <h1> One-Fit Competition</h1>
        </header>
        <Jumbotron id="jumbotron">
          <Container fluid>
          <hr/>
            <h2> {result} </h2>
            <Validation
              input ={this.state.userInput}  
            />
             <input             
                hidden={componentHidden} 
                type="text"
                name="number"
                required="required" 
                placeholder="your code"
                value={this.state.userInput}
                onChange={this.inputChangedHandler}
                />
            <Button 
              size="lg"
              onClick={this.onSubmitHandler} 
              disabled={!isEnabled}
              hidden={componentHidden}
              > 
              {spinner}
              {buttonText}
           </Button>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
