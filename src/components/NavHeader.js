import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const NavHeader = ({title, isTop = null}) => {
  return (

    <div className={classnames('filter-nav-header', {['top']: isTop})}>
      <p><strong>{title}</strong></p>
    </div>
  )
}

NavHeader.prototypes = {
  isTop: PropTypes.bool,
  title: PropTypes.string
}

export default NavHeader;

