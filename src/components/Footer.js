import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router-dom'

import evalogowhite from '../styles/images/evasmomlogowhite.svg'
import facebook from '../styles/images/facebook.svg'
import wechat from '../styles/images/wechat.svg'
import weibo from '../styles/images/weibo.svg'

class Footer extends Component {

    render() {
        const { translate, currentLanguage } = this.props
        return (
            <div id='footer' className={`footer ${currentLanguage} ${css(styles.footer)}`}>
                <div className='container'>
                    <div className='d-flex flex-column py-4' to='/'>
                        <Link to='/'>
                            <img style={{width: '110px'}} src={evalogowhite} alt='eva-logo-white'/>
                        </Link>
                        <p className={css(styles.logoText)}>{translate('footer.slogan')}</p>
                    </div>
                    <div className='row my-4'>
                        <div className='col-12 col-md-4 py-2'>
                            <div className="head">
                                <h4>{translate('footer.features')}</h4>
                            </div>
                            <div className="links d-flex flex-column py-2">
                                <Link className='mt-2' to='/'>{translate('footer.findATutor')}</Link>
                                <Link className='mt-2' to='/'>{translate('footer.becomeATutor')}</Link>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 py-2'>
                            <div className="head">
                                <h4>{translate('footer.company')}</h4>
                            </div>
                            <div className="links d-flex flex-column py-2">
                                <Link className='mt-2' to='/'>{translate('footer.pricing')}</Link>
                                <Link className='mt-2' to='/'>{translate('footer.aboutUs')}</Link>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 py-2'>
                            <div className="head">
                                    <h4>{translate('footer.help')}</h4>
                                </div>
                                <div className="links d-flex flex-column py-2">
                                    <Link className='mt-2' to='/'>{translate('footer.emailUs')}</Link>
                                    <Link className='mt-2' to='/'>{translate('footer.privacy')}</Link>
                                    <Link className='mt-2' to='/'>{translate('footer.terms')}</Link>
                                </div>
                            </div>
                    </div>
                    <div className='d-flex flex-column mt-3 '>
                        <p className={`${css(styles.copyText)}`}>{translate('footer.copyright')}</p>
                    </div>
                    <div className='d-flex flex-row mt-2 mb-3'>
                        <Link  className='footer-icon mr-3' to='/'>
                            <img style={{height:'20px'}} src={facebook} alt="fbk"/>
                        </Link>
                        <Link className='footer-icon mr-3' to='/'>
                            <img style={{height:'25px'}} src={wechat} alt="wechat"/>
                        </Link>
                        <Link className='footer-icon mr-3' to='/'>
                            <img style={{height:'25px'}} src={weibo} alt="weibo"/>
                        </Link>  
                
                    </div>
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    logoText: {
        color: 'white',
        fontSize: '.9rem',
        paddingTop: '5px'
    },
    copyText: {
        color: 'white',
        fontSize: '.9rem'
    },
    footer: {
        paddingTop: '50px',
        paddingBottom: '50px'
    },
})

Footer.propTypes = {
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps)(Footer)