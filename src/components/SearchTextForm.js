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
        <button className='btn btn-link'>
          <svg width="28px" height="19px" viewBox="0 0 28 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="iPhone-7-Plus" transform="translate(-335.000000, -443.000000)" fill="#5C8CEB">
                <g id="ic_menu_36px" transform="translate(335.000000, 443.000000)">
                  <g id="Group">
                    <path 
                    d="M0,17.5 C0,18.3284271 0.664521635,19 1.50540161,19 L26.4945984,19 C27.3260087,19 28,18.3342028 28,17.5 L28,17.5 C28,16.6715729 27.3354784,16 26.4945984,16 L1.50540161,16 C0.673991259,16 0,16.6657972 0,17.5 L0,17.5 Z M0,9.5 C0,10.3284271 0.664521635,11 1.50540161,11 L26.4945984,11 C27.3260087,11 28,10.3342028 28,9.5 L28,9.5 C28,8.67157288 27.3354784,8 26.4945984,8 L1.50540161,8 C0.673991259,8 0,8.66579723 0,9.5 L0,9.5 Z M1.50540161,0 C0.673991259,0 0,0.665797234 0,1.5 L0,1.5 C0,2.32842712 0.664521635,3 1.50540161,3 L26.4945984,3 C27.3260087,3 28,2.33420277 28,1.5 L28,1.5 C28,0.671572875 27.3354784,0 26.4945984,0 L1.50540161,0 Z" id="Shape">
                    </path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    )
  }
}

SearchTextForm.propTypes = {
  translate: PropTypes.func.isRequired,
}