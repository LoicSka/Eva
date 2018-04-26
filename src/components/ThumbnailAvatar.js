import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import badge from '../styles/images/badge.svg'
import { height } from 'window-size';

const ThumbnailAvatar = ({imageSrc, showProBadge = false, notificationsCount, showNotificationCount = false, width = 70, height= 70 }) => {
  const proBadge = showProBadge ? <img className='pro-badge' src={badge} /> : null
  const notificationsBadge = showNotificationCount && notificationsCount > 0 ? <span className='notification-badge'>{notificationsCount >= 10 ? '9+' : notificationsCount }</span> : null
  return (
    <div className='thumbnail-avatar'>
      <div className='avatar' style={{ width: `${width}px`, height: `${height}px`}}>
        <img src={imageSrc} />
      </div>
      {proBadge}
      {notificationsBadge}
    </div>
  )
}

ThumbnailAvatar.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  showProBadge: PropTypes.bool,
  notificationsCount: PropTypes.number,
  showNotificationCount: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default ThumbnailAvatar;