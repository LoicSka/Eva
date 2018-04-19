import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import PropTypes from 'prop-types'
import SelectfieldGroup from '../components/SelectfieldGroup';

class LanguageSelectfield extends Component {
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
      <div className='sort-form-ctn'>
        <div style={{ marginTop: '17px' }}>
          <SelectfieldGroup
            classNames='sort-form'
            value={value}
            field='value'
            defaultValue={{ name: '🇨🇳 中文', value: 'zh' }}
            onChange={this.onChange}
            options={[{ name: '🇺🇸 En', value: 'en' }]}
            type='text'
          />
        </div>
      </div>
    )
  }
}

LanguageSelectfield.propTypes = {
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps)(LanguageSelectfield)