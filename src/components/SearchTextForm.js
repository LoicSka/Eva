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
      <form onSubmit={this.onSubmit} className="form-inline inner-addon right-addon collapse">
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
          <svg className="glyphicon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	        width="30.239px" height="30.239px" viewBox="0 0 30.239 30.239">
          <g fill={isExpanded ? "#ACCBE2" : "#BFD7E8"}>
              <path d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735
              c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0
              c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z
              M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0
              C21.517,9.026,21.517,14.63,18.073,18.074z"/>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
          </svg>
      </form>
    )
  }
}

SearchTextForm.propTypes = {
  translate: PropTypes.func.isRequired,
}