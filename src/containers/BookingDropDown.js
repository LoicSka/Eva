import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DropdownContainer from '../components/DropdownContainer'
import MenuRow from '../components/MenuRow'
import { BOOKING_MENU, hideVisibleMenu } from '../actions'

class BookingDropDown extends Component {
    componentDidMount = () => {
        const { hideVisibleMenu } = this.props
        // hideVisibleMenu()
    }
    componentWillReceiveProps = (newProps) => {
        const { isVisible, hideVisibleMenu } = newProps
        if (isVisible === this.props.isVisible === true) {
            // hideVisibleMenu()
        }
    }

    render () {
        const { actions = [], isVisible = false, hideVisibleMenu, isResponsive = true } = this.props
        const rows = actions.map((action) => {
            return (
                <MenuRow key={action.label} label={action.label} onClick={action.onClick} notificationCount={action.notificationCount} imageSrc={action.imageSrc} imageStyle={action.imageStyle} style={action.style} />
            )
        })

        return (
            <DropdownContainer isResponsive={isResponsive} handleHide={hideVisibleMenu} id={'booking-menu'} top={10} isVisible={isVisible}>
                {rows}
            </DropdownContainer>
        )
    }
}

BookingDropDown.propTypes = {
    isVisible: PropTypes.bool,
    actions: PropTypes.array,
    bookingId: PropTypes.string,
    isResponsive: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    var { menu: { isVisible, menuType, actions, bookingId } } = state
    isVisible = isVisible && menuType === BOOKING_MENU && bookingId === ownProps.bookingId
    return {
        isVisible,
        actions
    }
}

export default connect(mapStateToProps, { hideVisibleMenu })(BookingDropDown)


