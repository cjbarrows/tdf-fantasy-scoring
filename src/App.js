import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Scoring from "./Scoring";

import "./App.css";

import {
  getStageResults,
  getOverallResults,
  scoring
} from "./actions/DataActions";

class App extends Component {
  componentWillMount = () => {
    const { doGetStageResults, doGetOverallResults } = this.props;
    this.stage = 1;
    doGetStageResults(1);
    doGetOverallResults(1);
    doGetStageResults(2);
    doGetOverallResults(2);
  };

  doScoring = () => {
    const { doScoring } = this.props;
    doScoring();
  };

  render() {
    return (
      <div className="App">
        <button type="button" onClick={this.doSomething}>
          Test redux action
        </button>
        <button type="button" onClick={this.doScoring}>
          Scoring
        </button>
        <Scoring
          stageResults={this.props.dataReducer.stageResults}
          overallResults={this.props.dataReducer.overallResults}
          allTeams={this.props.teams.allTeams}
        />
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  doGetStageResults: stage => dispatch(getStageResults(stage)),
  doGetOverallResults: stage => dispatch(getOverallResults(stage)),
  doScoring: () => dispatch(scoring())
});

App.propTypes = {
  doGetStageResults: PropTypes.func,
  doGetOverallResults: PropTypes.func,
  doScoring: PropTypes.func,
  teams: PropTypes.shape({
    allTeams: PropTypes.arrayOf(
      PropTypes.shape({
        owner: PropTypes.string,
        riders: PropTypes.arrayOf(PropTypes.string)
      })
    ),
    stageResults: PropTypes.shape()
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
