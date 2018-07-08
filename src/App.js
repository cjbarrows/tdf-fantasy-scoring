import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Scoring from './Scoring';

import './App.css';

import { simpleAction } from './actions/SimpleAction';

import { getStageResults, scoring } from './actions/DataActions';

class App extends Component {
  componentWillMount = () => {
    const { doGetStageResults } = this.props;
    doGetStageResults(260);
  };

  doSomething = () => {
    const { doSimpleAction } = this.props;
    doSimpleAction();
  };

  doScoring = () => {
    const { doScoring } = this.props;
    doScoring();
  };

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <button type="button" onClick={this.doSomething}>
          Test redux action
        </button>
        <button type="button" onClick={this.doScoring}>
          Scoring
        </button>
        <Scoring
          stage={1}
          stageResults={this.props.teams.stageResults}
          allTeams={this.props.teams.allTeams}
        />
        <pre>
          {JSON.stringify(this.props)}
        </pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  doSimpleAction: () => dispatch(simpleAction()),
  doGetStageResults: stage => dispatch(getStageResults(stage)),
  doScoring: () => dispatch(scoring()),
});

App.propTypes = {
  doSimpleAction: PropTypes.func.isRequired,
  doGetStageResults: PropTypes.func,
  doScoring: PropTypes.func,
  teams: PropTypes.shape({
    allTeams: PropTypes.arrayOf(
      PropTypes.shape({
        owner: PropTypes.string,
        riders: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
    stageResults: PropTypes.shape(),
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
