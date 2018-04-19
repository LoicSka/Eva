import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import PropTypes from 'prop-types'
import SelectfieldGroup from '../components/SelectfieldGroup';

class SortTutorAccountSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }

  onChange = (e) => this.setState({ [[e.target.name]]: e.target.value })

  render() {
    const { translate } = this.props
    const { value } = this.state
    return (
      <div className='sort-form-ctn' style={{ marginRight: '.65rem' }}>
        <div style={{ marginTop: '17px'}}>
          <SelectfieldGroup
            classNames='sort-form'
            value={value}
            field='value'
            defaultValue={{value: null, name: translate('filterNav.sortBy')}}
            onChange={this.onChange}
            options={[{ name: '🌟 Rating', value: 0 }, { name: '💴 Price', value: 1 }, { name: '🌍 Nearest', value: 2 }]}
            type='text'
          />
        </div>
      </div>
    )
  }
}

SortTutorAccountSelect.propTypes = {
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps)(SortTutorAccountSelect)