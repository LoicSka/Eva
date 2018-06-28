import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import moment from 'moment'
import classnames from 'classnames'
import 'moment/locale/zh-cn'
import { filter } from 'lodash'

import ThumbnailAvatar from '../components/ThumbnailAvatar'
import Separator from '../components/Separator'

import down from '../styles/images/down-arrow.svg'

class TutorBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unCollapsed: false
        }
    }

    setupLocale = () => {
        const { currentLanguage } = this.props
        currentLanguage === 'cn' ? moment.locale('zh-cn') : moment.locale('en')
    }

    unCollapse = () => {
        const { unCollapsed } = this.state
        this.setState({unCollapsed: !unCollapsed})
    }

    handleConfirmBooking = () => {
        const { booking: {id}, confirmBooking, translate } = this.props
        const message = translate('notes.confirmAction')
        if (window.confirm(message)) {
            confirmBooking(id)
            this.unCollapse()
        }
    }

    handleCancelBooking = () => {
        const { booking: { id, state }, cancelBooking, declineBooking, translate } = this.props
        const message = translate('notes.confirmAction')
        if (window.confirm(message)) {
            state === 'pending' ? declineBooking(id) : cancelBooking(id)
            this.unCollapse()
        }
        
    }

    ageGroupForValue = (value) => {
        const { translate } = this.props
        return [1,2,3,4,5,6,7,8].includes(value) ? translate(`survey.ageGroup.answer.${value}`) : null
    }

    componentDidMount = () => {
        this.setupLocale()
    }

    render() {  
        const { booking: { student: { fullName, gender, ageGroup = null, userFullName, userAvatarUrl = null }, id, time, updatedAt, state, estimatedCost, address, duration, phoneNumber }, currentLanguage, translate } = this.props
        const isCollapsed = this.state.unCollapsed
        const timestamp = moment(updatedAt).format('L')
        const date = moment(time).format('MMM Do YY, h:mm A')
        const isPast = new Date(time) <= new Date()
        const isCanceled = state === 'canceled'
        var confirmButton = ['pending', 'declined'].includes(state) ? <button onClick={this.handleConfirmBooking} className='btn btn-default bordered btn-sm'>{translate('userActions.confirm')}</button> : null
        confirmButton = isCanceled ? null : confirmButton
        const cancelButton = ['declined', 'canceled'].includes(state) ? null : <button onClick={this.handleCancelBooking} className='btn btn-default bordered btn-sm ml-2'>{ state === 'pending' ? translate('userActions.decline') : translate('userActions.cancel') }</button> 

        return (
            <div key={id} className={`booking card mx-0 mx-sm-2 ${currentLanguage}`}>
                <div onClick={this.unCollapse} className='booking-top d-flex flex-row align-items-stretch my-3'>
                    <ThumbnailAvatar width={56} height={56} imageSrc={userAvatarUrl}/>
                    <div className='d-flex flex-column ml-3'>
                        <p className='medium m-0 p-0'>{ userFullName || fullName }</p>
                        <p className='sub-label'>{ date }</p>
                        <span className=' align-self-start badge badge-pill badge-light bordered'>{state.toUpperCase()}</span>
                    </div>
                    <div className='d-flex flex-column ml-auto justify-content-between'>
                        <img style={{width: '15px', height: '15px'}} src={down} className={classnames('arrow-down align-self-end mb-4', {'flipped': isCollapsed})} alt='arrow-down'/>
                        <p className='sub-label m-0'>{timestamp}</p>
                    </div>
                </div>
                <div className={classnames('collapsible', {'uncollapsed': isCollapsed}, {'no-controls': isPast || isCanceled} )}>
                    <div className='pb-2 about-tutor'>
                        <div className='about-tutor-content px-3 pt-3'>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <p className='label'>{translate('userFields.phoneNumber')}</p>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <p className='value'>{phoneNumber}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <p className='label'>{translate('userFields.studentName')}</p>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <p className='value'>{fullName}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <p className='label'>{translate('userFields.gender')}</p>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <p className='value'>{ gender ? translate(`userFields.${gender.toLowerCase()}`) : null}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <p className='label'>{translate('userFields.ageGroup')}</p>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <p className='value'>{this.ageGroupForValue(ageGroup)}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <p className='label'>{translate('userFields.duration')}</p>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <p className='value'>{`${duration} ${translate('dashboard.hours')}`}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <p className='label'>{translate('userFields.cost')}</p>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <p className='value'>{estimatedCost}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <p className='label'>{translate('userFields.address')}</p>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <p className='value'>{address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display: isPast || isCanceled ? 'none' : 'flex'}} className='booking-controls flex-row align-items-center'>
                        {confirmButton}
                        {cancelButton}
                    </div>
                </div>
                <Separator classes={!isCollapsed ? 'my-0' : null} />
            </div>
        )
    }

}

TutorBooking.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    booking: PropTypes.object,
    confirmBooking: PropTypes.func,
    declineBooking: PropTypes.func,
    cancelBooking: PropTypes.func
}

export default TutorBooking