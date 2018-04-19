import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class SearchTextForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      isDisabled: false,
      isExpanded: false
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
  }

  toggleExpand = () => this.setState({isExpanded: !this.state.isExpanded})

  onChange(e) {
    this.setState({[[e.target.name]]: e.target.value });
  }

  render() {
    const { translate } = this.props
    const { search, isDisabled, isExpanded } = this.state
    return(
      <div className="search-field-ctn">
        <form onSubmit={this.onSubmit} className="inner-addon right-addon">
          <input
            value={search}
            onBlur={this.toggleExpand}
            onFocus={this.toggleExpand}
            onChange={this.onChange}
            className={classnames('form-control search-input', { 'disabled': isDisabled }, { 'expanded': isExpanded }, { 'static': !isExpanded })}
            name='search'
            type='search'
            placeholder={translate('navbar.searchPlaceholder')}
          />
          <button className='btn inner-addon glyphicon left-addon'>🔎</button>
        </form>
      </div>
    )
  }
}

SearchTextForm.propTypes = {
  translate: PropTypes.func.isRequired,
}