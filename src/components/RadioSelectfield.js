import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import RadioButton from './RadioButton'
import { chunk } from 'lodash'

class RadioSelectfield extends Component {
    render() {
        const { question, error = null, number = null, type, choices = [], handleSelect, selected } = this.props
        const chunkCount = choices.length > 4 ? Math.ceil(choices.length/4) : 1
        const chunkedChoices = chunk(choices, chunkCount)
        const columns = chunkedChoices.map((chunk, i) => {
            const radioButtons = chunk.map((button) => {
                const value = typeof(button) === 'string' ? button : button.value
                const label = typeof(button) === 'string' ? button : button.label
                const selectButton = () => {
                    handleSelect(value)
                }
                return (
                    <RadioButton key={label} title={label} type={type} isSelected={selected.indexOf(value) !== -1} handleSelect={selectButton} />
                )
            })
            return (
                <div key={i} className={`col-md-${Math.ceil(12/chunkCount) < 3 ? 3 : Math.ceil(12/chunkCount) }`}>
                    {radioButtons}
                </div>
            )
        })

        const questionNumber = number ? `${number}.` : ''
        return (
            <div className='radio-select-field'>
                <div className='row pl-2'>
                    <h4 className={classnames('radio-select-question', {'error': error})}>
                        <strong>{`${questionNumber} ${question}`}</strong>
                    </h4>
                </div>
                <div className='row'>
                    {columns}
                </div>
            </div>
        )
    }
}

RadioSelectfield.propTypes = {
    question: PropTypes.string,
    selected: PropTypes.array,
    number: PropTypes.number,
    type: PropTypes.string,
    choices: PropTypes.array,
    handleSelect: PropTypes.func
}

export default RadioSelectfield