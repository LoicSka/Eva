import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import moment from 'moment'
import 'moment/locale/zh-cn'

import ThumbnailAvatar from '../components/ThumbnailAvatar'
import Stars from '../components/Stars'
import Loader from '../components/Loader'
import Separator from '../components/Separator'
import EmptyView from '../components/EmptyView'

import { loadReviewsForAccount } from '../actions'

class ReviewList extends Component {
    constructor(props) {
        super(props)
        this.handleLoadReviews = this.handleLoadReviews.bind(this)
    }

    setupLocale = () => {
        const { currentLanguage } = this.props
        currentLanguage === 'cn' ? moment.locale('zh-cn') : moment.locale('en')
    }

    handleLoadReviews = () => {
        const { tutorAccountId, loadReviewsForAccount, nextPage } = this.props
        loadReviewsForAccount(tutorAccountId, nextPage)
    }

    componentDidMount = () => {
        const { loadReviewsForAccount, tutorAccountId } = this.props
        loadReviewsForAccount(tutorAccountId)
        this.setupLocale()
    }

    render() {
        const { reviewCount = 0, reviews, reviewIds = [], isFetching = true, translate, isCountVisible = true } = this.props
        const loader = isFetching ? <Loader/> : null
        const moreButton = isFetching || reviewCount === 0 ? null : (
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <button onClick={this.handleLoadReviews} className="btn btn-link btn-sm">{translate('userActions.loadMore')}</button>
            </div>
        )
        const emptyView = !isFetching && reviewCount === 0 ? (
            <EmptyView message={translate('dashboard.noReviews')}/>
        ) : null
        const reviewList = reviewIds.map((reviewId) => {
            const review = reviews[reviewId]
            const date = moment(review.updatedAt).fromNow()
            return (
                <div key={review.id} className="d-flex flex-column mb-3">
                    <div className="head d-flex flex-row my-2 align-items-center">
                        <ThumbnailAvatar width={45} height={45}/>
                        <div style={{}} className="d-flex flex-column ml-2 justify-content-center">
                            <Stars rating={review.rating} />
                            <p style={{fontSize: '1rem'}} className='m-0 px-1 medium'>{review.user}</p>
                        </div>
                    </div>
                    <div className="content d-flex flex-column">
                        <p className='my-1'>{review.content}</p>
                        <p className='sub-label align-self-end'>{date}</p>
                        <Separator classes='my-1' />
                    </div>
                </div>
            )
        })
        return (
            <div className='p-2'>
                { isCountVisible && reviewCount > 0 ? <h3 style={{fontSize: '1.3rem'}} className='mb-3' >{`${translate('dashboard.reviews')} (${ reviewCount })`}</h3> : null}
                {reviewList}
                {loader}
                {moreButton}
                {emptyView}
            </div>
        )
    }
}

ReviewList.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    tutorAccountId: PropTypes.string,
    reviews: PropTypes.object,
    reviewIds: PropTypes.array,
    isFetching: PropTypes.bool,
    nextPage: PropTypes.number,
    isCountVisible: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    const { tutorAccountId } = ownProps
    const { entities: { reviews }, pagination: { paginatedReviews } } = state
    const { ids, isFetching, nextPage } = typeof(paginatedReviews[tutorAccountId]) === 'undefined' ? {} : paginatedReviews[tutorAccountId]
    return {
        reviewIds: ids,
        reviews,
        isFetching,
        nextPage,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default connect(mapStateToProps, {loadReviewsForAccount})(ReviewList)

