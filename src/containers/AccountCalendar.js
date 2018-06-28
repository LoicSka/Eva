import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import TutorCalendar from '../components/TutorCalendar'
import { updateUserAccount } from '../actions'
import RadioSelectfield from '../components/RadioSelectfield'
import { pull, findLast, values, keys, omit } from 'lodash'
import { locale, weekdays } from 'moment'
import 'moment/locale/zh-cn'

class AccountCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            daysAvailable: [],
        }
    }

    handleSelectDays = (day) => {
        var { daysAvailable } = this.state
        daysAvailable.indexOf(day) === -1 ? daysAvailable.push(day) : pull(daysAvailable, day)
        this.setState({daysAvailable, errors: omit(this.state.errors, 'daysAvailable')})
    }

    setupLocale = () => {
        const { currentLanguage } = this.props
        currentLanguage === 'cn' ? locale('zh-cn') : locale('en')
    }

    componentWillReceiveProps = (newProps) => {
        const { currentLanguage, user: { daysAvailable }} = newProps
        if (currentLanguage !== this.props.currentLanguage) {
            this.setupLocale()
        }
        if (daysAvailable !== this.state.daysAvailable) {
            this.setState({daysAvailable});
        }
    }

    componentDidMount = () => {
        const { user: { daysAvailable } } = this.props
        this.setState({daysAvailable});
        this.setupLocale()
    }

    handleSubmit = () => {
        const { updateUserAccount, user} = this.props
        this.setState({ saving: true })
        updateUserAccount(this.state, user.id)
    }


    render() {
        const { user, currentLanguage, translate, updateUserAccount } = this.props
        const days = weekdays().map((day, index) => {
            return {
                label: day,
                value: index === 0 ? 7 : index 
            }
        })

        return (
            <div className={`d-flex flex-column justify-content-center align-items-center ${currentLanguage}`}>
                <div className="row">
                    <div className="col-12">
                        <div className="card bordered">
                            <div className="card-body">
                                <RadioSelectfield ref={(field) => { this.daysAvailable = field }} question={translate('survey.daysAvailable.question.tutor')} choices={days} type='MULTI' selected={this.state.daysAvailable} handleSelect={this.handleSelectDays} />
                                <button onClick={this.handleSubmit} className='btn btn-success mt-3'>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

AccountCalendar.propTypes = {
  user: PropTypes.object,
  translate: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
  hasUpdated: PropTypes.bool,
  updateUserAccount: PropTypes.func
}

export default AccountCalendar

