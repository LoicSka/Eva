import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import classnames from 'classnames'
import { resetMessage } from '../actions';

class GlobalMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: true
    }
    this.handleHide = this.handleHide.bind(this)
  }

  static propTypes = {
    translate: PropTypes.func.isRequired,
    message: PropTypes.object
  }

  handleHide() {
    const { resetMessage } = this.props
    resetMessage()
  }

  getTranslation = value => value ? this.props.translate(value) : null

  render() {
    const { content, type, title } = this.props.message
    return (
      <div className={classnames('global-message-container', { 'hidden': !content }, { 'shown': content }, type) }>
        <div className="container" style={{ 'padding': 0 }}>
          <div className="row justify-content-center">
            <div className="col-10">
              <strong>{ this.getTranslation(title) }! </strong>
              <p>{ this.getTranslation(content) }</p>
            </div>
            <div className="col-1">
              <a onClick={this.handleHide} className="close-message">X.</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const { message } = state
  return {
    message,
    translate: getTranslate(state.locale),
  }
}

export default connect(mapStateToProps, {
  resetMessage
})(GlobalMessage)