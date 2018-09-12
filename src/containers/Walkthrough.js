import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { connect } from 'react-redux'
import Measure from 'react-measure'

import checkmark from '../styles/images/check-mark.svg'

class Walkthrough extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dimensions: {
                width: 0
            }
        }
    }
    generateSteps = () => {
        const { walkthrough: { activeStep = 0 } } = this.props
        const stateForIndex = (index) => {
            if ( activeStep === index ) {
                return 'current'
            } else if (activeStep > index) {
                return 'done'
            }
        }
        return [
            { isActive: activeStep === 0, title: 'Create an account', subTitle: 'Register & verify your email.', index: 0, state: stateForIndex(0) },
            { isActive: activeStep === 1, title: 'Fill in the survey', subTitle: 'The survey helps us better understand your needs.', index: 1, state: stateForIndex(1) },
            { isActive: activeStep === 2, title: 'Get a match', subTitle: 'You get matched with a tutor in your area.', index: 2, state: stateForIndex(2) },
            { isActive: activeStep === 3, title: 'Book a class', subTitle: 'Schedule a class with your tutor', index: 3, state: stateForIndex(3) }
        ]
    }

    render() {
        const { dimensions: { width = 10 } } = this.state
        const { walkthrough: { activeStep = 0, isDone } } = this.props
        const genSteps = this.generateSteps()
        const walkthroughSteps = genSteps.map((step) => {
            return (
                <div className={`walkthrough-step ${ step.state ? 'walkthrough-step__' + step.state : null}`}>
                    { step.state === 'done' ? <img className='checkmark' src={checkmark} alt="ckeck-mark-img"/> : null }
                    <div className={`speech-bubble ${genSteps.length - 1 === step.index ? 'arrow-right' : 'arrow-centred' } ${step.index === 0 ? 'arrow-left' : null }`}>
                        <p className='walkthrough-step__title'>{ step.title }</p>
                        <p className='walkthrough-step__subtitle'>{ step.subTitle }</p>
                    </div>
                </div>
            )
        })
        const barWidth = (Math.round(width < 700 ? 110/genSteps.length : 125/genSteps.length)) * activeStep
        return isDone ? null : (
            <Measure
            bounds
            onResize={(contentRect) => {
                this.setState({ dimensions: contentRect.bounds || {} })
            }}>
            {({ measureRef }) =>
                <div ref={measureRef} className='walkthrough'>
                    <div className="walkthrough-steps container d-flex justify-content-between align-items-center">
                        { walkthroughSteps }
                        {/* <h1>{ width }</h1>        */}
                        <div className="walkthrough-bar"></div>
                        <div style={{width: `${barWidth}%`}} className="walkthrough-bar walkthrough-bar-inner"></div>
                    </div>
                </div>
            }
            </Measure>
        )
    }
}

Walkthrough.prototypes = {
  walkthrough: PropTypes.object,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string,
}

const mapStateToProps = (state) => {
    var { walkthrough  } = state
    return {
        walkthrough,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default connect(mapStateToProps, {})(Walkthrough)