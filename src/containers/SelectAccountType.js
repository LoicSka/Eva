import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { withRouter } from 'react-router-dom'
import ButtonGroupToggle from "../components/ButtonGroupToggle";

class SelectAccountType extends Component {
  handleClick = (e) => {
    this.props.history.push({pathname: `/setup-${e.target.name}`, state: {}})
  }
  render() {
    const { translate, currentLanguage, isAuthenticated } = this.props
    return (
      <div className="container" style={{ 'padding': 0 }}>
        <div className={`row panel-ctn py-3 justify-content-center align-items-center ${currentLanguage}`}>
          <div className="panel col-11 col-md-5">
            <div className="row py-3 justify-content-center">
                <h2 className="panel-title">{translate('getStarted.startTitle')}</h2>
                <p className="py-1" style={{'width': '100%', 'textAlign': 'center'}} ><strong>{translate('getStarted.joiningAs')}</strong></p>
                <ButtonGroupToggle handleClick={this.handleClick} buttons={[{ title: 'Learner'}, { title: 'Parent'}, { title: 'Tutor'}]} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SelectAccountType.propTypes = {
  isAuthenticated: PropTypes.bool,
  currentLanguage: PropTypes.string,
  translate: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  const { isAuthenticated } = state.account
  return {
    isAuthenticated,
    currentLanguage: getActiveLanguage(state.locale).code,
    translate: getTranslate(state.locale),
  }
}

export default withRouter(connect(mapStateToProps)(SelectAccountType))

