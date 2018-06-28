import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import PropTypes from 'prop-types'
import SelectfieldGroup from '../components/SelectfieldGroup';
import { setActiveLocale } from '../actions'
import { filter, find } from 'lodash'

class LanguageSelectfield extends Component {
  onChange = (e) => {
    const { setActiveLocale } = this.props
    setActiveLocale(e.target.value)
  }

  render() {
      const { currentLanguage } = this.props
    const localesArray = [{ name: '🇬🇧 En', value: 'en' }, { name: '🇨🇳 中文', value: 'cn' }]
      const options = filter(localesArray, (locale) => locale.value !== currentLanguage)
      const value = find(localesArray, { value: currentLanguage })
    return (
        <div className='locale-select-ctn'>
          <SelectfieldGroup
            classNames='locale-select'
            value={value}
            field='value'
            defaultValue={value}
            onChange={this.onChange}
            options={options}
            type='text'
          />
        </div>
    )
  }
}

LanguageSelectfield.propTypes = {
  setActiveLocale: PropTypes.func,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps, { setActiveLocale})(LanguageSelectfield)