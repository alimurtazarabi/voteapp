import React, { Component } from 'react';
import { singleQuestion, postVote } from '../services/apiCallService';


class QuestionDetails extends Component {
  state = {
    question: '',
    choices: [],
    selectedChoice: {
    	name: '',
    	url: null
    }
  };
  
  async componentDidMount() {
      const {questionId} = this.props.match.params;
      const { data } = await singleQuestion(questionId);
      this.setState({question: data.question, choices: data.choices});
    };
  
  

  handleChange = (event, choice, url) => {
  	this.setState({ selectedChoice: { name: choice, url: url}});
  	console.log(this.state.selectedChoice);
  };

  handleSubmit = (event) => {
  	event.preventDefault();
	postVote(this.state.selectedChoice, () => {
		this.props.history.push(`${this.props.match.url}/votedSuccessfully`);
	});
  }

  render() {
	const { question, choices } = this.state;
    const choicesList = choices ? Object.keys(choices).map((key) => {
      return (
          <div className="form-check" key={key}>
            <label className="form-check-label">
              <input
                type="radio" 
                className="form-check-input"
                name="selectedChoice"
                id={key}
                value={choices[key].choice}
                onChange={(event) => this.handleChange(choices[key])}
              />
              {choices[key].choice}
            </label>
          </div>
      );
    }) : null ;

    return (
         <div className="card mb-3 margin-tb">
            <form onSubmit={this.handleSubmit}>
                <h3 className="card-header">Question: { question } </h3>
                <div className="card-body">
                  <fieldset className="form-group">
                    <legend>Select an Option</legend>
                    { choicesList }
                  </fieldset>
                </div>
                <div className="card-footer text-right">
                <button type="submit" className="btn btn-primary">Vote</button>
                </div>
            </form>
          </div>
    );
  }
}

export default QuestionDetails;










