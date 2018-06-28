import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DropdownContainer from '../components/DropdownContainer'
import MenuRow from '../components/MenuRow'
import { USER_MENU, hideVisibleMenu } from '../actions'

class UserDropDown extends Component {
    componentWillReceiveProps = (newProps) => {
        const { isVisible, hideVisibleMenu } = newProps
        if (isVisible === this.props.isVisible === true) {
            // hideVisibleMenu()
        }
    }
    render () {
        const { actions = [], isVisible = false, students = [], hideVisibleMenu } = this.props
        const rows = actions.map((action) => {
            return (
                <MenuRow key={action.label} label={action.label} onClick={action.onClick} notificationCount={action.notificationCount} imageSrc={action.imageSrc} imageStyle={action.imageStyle} style={action.style} />
            )
        })

        const studentRows = students.map((student) => {
            return (
                <MenuRow key={student.id} label={student.fullName} onClick={student.expand} notificationCount={student.notificationCount} imageSrc={student.avatarUrl} imageStyle={{width: '27px', height: '27px', borderRadius: '20px'}} />
            )
        })

        const studentGroup = students.length === 0 ? null : (
            <MenuRow>
                <div style={{width: '100%'}} className="d-flex flex-column">
                    {studentRows}
                </div>
            </MenuRow>
        )
        return (
            <DropdownContainer handleHide={hideVisibleMenu} id={'tutor-menu'} top={53} isVisible={isVisible}>
                {studentGroup}
                {rows}
            </DropdownContainer>
        )
    }
}

UserDropDown.propTypes = {
    isVisible: PropTypes.bool,
    actions: PropTypes.array,
}

const mapStateToProps = (state) => {
    var { menu: { isVisible, menuType, actions, students } } = state
    isVisible = isVisible && menuType === USER_MENU
    return {
        isVisible,
        actions,
        students
    }
}

export default connect(mapStateToProps, { hideVisibleMenu })(UserDropDown)