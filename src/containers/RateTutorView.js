import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { times, constant } from 'lodash'
import classnames from 'classnames'
import { createRating } from '../actions'

import CommentForm from '../components/CommentForm'

class RateTutorView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCommentBoxVisible: false,
            selectedRating: null
        }
    }

    handleHide = () => {this.setState({isCommentBoxVisible: false})}

    handleSubmit = (content = null) => {
        const { createRating, userId, tutorAccountId } = this.props
        this.setState({isCommentBoxVisible: false})
        createRating({value: this.state.selectedRating, tutorAccountId, userId, reviewAttributes: content ? { content, tutorAccountId } : null })
    }

    render() {
        const { isCommentBoxVisible } = this.state
        const { translate, isDisabled = false , rating } = this.props
        const stars = times(5, constant('⭐')).map((star, i) => {
            const handleRate = () => {
                this.setState({ isCommentBoxVisible: true, selectedRating: i+1 })
            }
            return (
                <div onClick={ isDisabled ? null : handleRate } key={`star-${i}`} className={classnames(`star-ctn col-${[0,4].indexOf(i) === -1 ? '2' : '3'}`, {'active': Number(rating) >= i+1})}><h4>{star}</h4></div>
            )
        })
        return (
            <div className='rating-view-ctn'>
                <div className={classnames('comment-box', {'active': isCommentBoxVisible})}>
                    <CommentForm isVisible={isCommentBoxVisible} translate={translate} handleHide={this.handleHide} handleSubmit={this.handleSubmit}/>
                </div>
                <div className={classnames('row no-gutters rater-ctn justify-content-center align-items-center', {'enabled': !isDisabled})} >
                    {stars}
                </div>
            </div>
        )
    }
}

RateTutorView.propTypes = {
    translate: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    rating: PropTypes.number,
    tutorAccountId: PropTypes.string,
    userId: PropTypes.string
}

const mapStateToProps = (state) => {
    const { account: { user: { id }}} = state
    return {
        userId: id,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default connect(mapStateToProps, {createRating})(RateTutorView)