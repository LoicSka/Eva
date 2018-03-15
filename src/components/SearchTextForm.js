import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class SearchTextForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      isDisabled: false
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
  }

  onChange(e) {
    this.setState({[[e.target.name]]: e.target.value });
  }

  render() {
    const { translate } = this.props
    const { search, isDisabled } = this.state
    return(
      <form onSubmit={this.onSubmit} class="form-inline mr-sm-2">
        <input
          value={search}
          onChange={this.onChange}
          className={classnames('form-control', {'disabled': isDisabled})}
          name='search'
          type='search'
          placeholder={translate('navbar.searchPlaceholder')}
        />
      </form>
    )
  }
}

SearchTextForm.propTypes = {
  translate: PropTypes.func.isRequired,
}