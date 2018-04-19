import React, { Component } from 'react'
import InputRange from 'react-input-range';
import PropTypes from 'prop-types'
import values from 'lodash/values'
import NavHeader from './NavHeader'

class RangeSelectSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: { min: 2, max: 10 },
    }
  }

  onChange = (value) => {
    const { handleFilter } = this.props
    this.setState({ value })
    handleFilter({priceRange: values(value)})
  }
  
  render () {
    const { title } = this.props
    const header = title ? <NavHeader title={title} /> : null
    return (
      <div>
        {header}
        <div className='filter-group' style={{ position: 'relative', padding: '35px 15px'}}>
          <InputRange
            maxValue={20}
            minValue={0}
            value={this.state.value}
            onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

RangeSelectSlider.prototypes = {
  label: PropTypes.string,
  handleFilter: PropTypes.func,
}

export default RangeSelectSlider