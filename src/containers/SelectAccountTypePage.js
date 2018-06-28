import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect, Link } from 'react-router-dom'
import RadioSelectfield from '../components/RadioSelectfield'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import Overdrive from 'react-overdrive'

const PARENT = 'A Parent'
const STUDENT = 'A Student'
const TUTOR = 'A Tutor'

class SelectAccountTypePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedType: this.props.translate('accountTypeSelect.parent')
        }
        this.handleSelect = this.handleSelect.bind(this)
    }
    
    handleSelect = (selectedType) => {
        this.setState({selectedType})
    }

    render() {
        const { translate, currentLanguage, verified, isAuthenticated } = this.props
        const choices = [translate('accountTypeSelect.parent'), translate('accountTypeSelect.student'), translate('accountTypeSelect.tutor')]
        const nextPath = () => {
            switch (this.state.selectedType) {
                case translate('accountTypeSelect.parent'):
                    return '/survey/parent'
                case translate('accountTypeSelect.student'):
                    return '/survey/student'
                default: return '/survey/tutor'
            }
        }

        const { from } = this.props.location.state || { from: { pathname: "setup/confirm" } }
        if (!isAuthenticated) {
            return <Redirect to='/signup' />
        } else if (!verified) {
            return <Redirect to='/setup/confirm' />
        }
        
        return (
            <div className='row align-items-center justify-content-center py-4'>
                <div className="col-12 col-md-5 my-0 my-sm-4">
                    <Overdrive id='card-ctn'>
                        <div className='card my-0 my-sm-4'>
                            <div className='card-body p-4'>
                                <RadioSelectfield question={translate('accountTypeSelect.title')} choices={choices} type='SINGLE' selected={this.state.selectedType} handleSelect={this.handleSelect}/> 
                                <Link to={nextPath()} className='btn btn-primary mt-3'>{translate('accountTypeSelect.action')}</Link>
                            </div>
                        </div>
                    </Overdrive>
                </div>
            </div>
        )
    }
}

SelectAccountTypePage.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string
}

const mapStateToProps = (state) => {
    const { account: { isAuthenticated, user: { verified } } } = state
    return {
        isAuthenticated,
        verified,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default withRouter(connect(mapStateToProps)(SelectAccountTypePage))