import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import classnames from 'classnames'
import scrollToComponent from 'react-scroll-to-component'
import { resetMessage } from '../actions';

import closeIcon from '../styles/images/close.svg'

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

  componentDidUpdate = (prevProps, prevState) => {
    const { content } = this.props.message
    if (content && content !== prevProps.message.content ) {
        scrollToComponent(this.globalMessage, { offset: 0, align: 'top', duration: 500, ease:'inExpo'})
    }
  }

  render() {
    const { content, type, title = null } = this.props.message
    const titleView = title ? <strong>{ this.getTranslation(title) }! </strong> : null
    return (
      <div ref={(el) => { this.globalMessage = el }} className={classnames('global-message-container', { 'hidden': !content }, { 'shown': content }, type) }>
        <div className="content-ctn">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-10">
                { titleView }
                <p>{ this.getTranslation(content) }</p>
              </div>
              <div className="col-2">
                <a onClick={this.handleHide} className="close-message">
                  <img style={{width: '18px'}} src={closeIcon} alt="close-icon"/>
                </a>
              </div>
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