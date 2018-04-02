import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import lowerCase from 'lodash/lowerCase'

class ButtonGroupToggle extends Component {
  constructor(props) {
    super(props)
    this.onSelect = this.handleSelect.bind(this)
    this.state = {
      selectedValue: ''
    }
  }

  handleSelect = e => {
    this.setState({selectedValue: e.target.name})
  }

  render() {
    const { buttons, handleClick } = this.props
    const { selectedValue } = this.state
    const buttonGroup = buttons.map((button) => {
      const clicked = (e) => {
        this.handleSelect(e)
        handleClick(e)
        console.log(e.target)
      }
      return (
        <label key={button.title} className={classnames('btn btn-outline-primary px-3', { 'active': selectedValue === button.title })}>
          <input onClick={clicked} type="radio" name={lowerCase(button.title)} autoComplete="off" /> {button.title}
        </label>
      )
    })
    return (
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        {buttonGroup}
      </div>
    )
  }
}

ButtonGroupToggle.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object)
}

export default ButtonGroupToggle

