import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ThumbnailAvatar from './ThumbnailAvatar'
import image from '../styles/images/IMG_0296.jpg'

class NavbarItemLoggedIn extends Component {
  render() {
    const { imageSrc = image, notificationsCount } = this.props
    return (
      <div className='nav-item-ctn'>
        <ul className='nav'>
          <li className='nav-item' style={{
            height: '100%'
          }}>
            <div className='' 
            style={{
              display: 'flex', 
              flexDirection: 'row', 
              // justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <ThumbnailAvatar
                imageSrc={imageSrc} 
                notificationsCount={notificationsCount}
                showNotificationCount={true}
                width={40}
                height={40}
              />
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

NavbarItemLoggedIn.propTypes = {
  imageSrc: PropTypes.string,
  notificationsCount: PropTypes.number
}

export default NavbarItemLoggedIn