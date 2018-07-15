import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as moment from 'moment';

import ScoringManager from './ScoringManager';

import './App.css';

import {
  getStageResults,
  getOverallResults,
  scoring
} from './actions/DataActions';

class App extends Component {
  componentWillMount = () => {
    const { doGetStageResults, doGetOverallResults } = this.props;

    const start = moment('2018-07-06');
    const now = moment();

    const days = now.diff(start, 'days');

    for (let i = 0; i < days - 1; i += 1) {
      doGetStageResults(i);
      doGetOverallResults(i);
    }
  };

  doScoring = () => {
    const { doScoring } = this.props;
    doScoring();
  };

  render() {
    const { dataReducer, teams } = this.props;

    return dataReducer ? (
      <div className="App">
        <ScoringManager
          allTeams={teams.allTeams}
          overallResults={dataReducer.overallResults}
          stageResults={dataReducer.stageResults}
        />
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  doGetStageResults: stage => dispatch(getStageResults(stage)),
  doGetOverallResults: stage => dispatch(getOverallResults(stage)),
  doScoring: () => dispatch(scoring()),
});

App.propTypes = {
  dataReducer: PropTypes.shape(),
  doGetStageResults: PropTypes.func,
  doGetOverallResults: PropTypes.func,
  doScoring: PropTypes.func,
  teams: PropTypes.shape({
    allTeams: PropTypes.arrayOf(
      PropTypes.shape({
        owner: PropTypes.string,
        riders: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
