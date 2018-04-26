import React, { Component } from 'react'
import InputRange from 'react-input-range';
import PropTypes from 'prop-types'
import values from 'lodash/values'
import NavHeader from './NavHeader'

class RangeSelectSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {min: 51, max: 999}
    }
    super(props)
  }

  onChange = (value) => {
    const { handleFilter } = this.props
    this.setState({value})
  }
  onChangeComplete = (value) => {
    const { handleFilter } = this.props
    handleFilter({priceRange: values(value)})
  }

  componentDidMount() {
    const { selectedPriceRange = [51, 999]  } = this.props
    this.setState({ 'min': selectedPriceRange[0], max: selectedPriceRange[1] })
  }
  
  render () {
    const { title, selectedPriceRange = [51,999] } = this.props
    const header = title ? <NavHeader title={title} /> : null
    const value = { 'min': selectedPriceRange[0], max: selectedPriceRange[1]}
    return (
      <div>
        {header}
        <div className='filter-group' style={{ position: 'relative', padding: '35px 22px'}}>
          <InputRange
            maxValue={1000}
            minValue={50}
            formatLabel={(value) => `${value}¥`}
            value={this.state.value}
            onChangeComplete={this.onChangeComplete}
            onChange={this.onChange}/>
        </div>
      </div>
    )
  }
}

RangeSelectSlider.prototypes = {
  label: PropTypes.string,
  selectedPriceRange: PropTypes.array,
  handleFilter: PropTypes.func,
}

export default RangeSelectSlider