import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import classnames from 'classnames'
import Stars from '../components/Stars'
import Loader from '../components/Loader'

import { StyleSheet, css } from 'aphrodite'

import step_1 from '../styles/images/laptop.svg'
import step_2 from '../styles/images/essay.svg'
import step_3 from '../styles/images/match.svg'
import step_4 from '../styles/images/calendar.svg'
import tutoring from '../styles/images/tutoring.png'
import tutoringsm from '../styles/images/tutoring-sm.png'

import tutor_1 from '../styles/images/tutor-1.png'
import tutor_2 from '../styles/images/tutor-2.png'
import tutor_3 from '../styles/images/tutor-3.png'
import tutor_4 from '../styles/images/tutor-4.png'
import Container from './Container';

class GetStarted extends Component {
    constructor(props) {
        super(props)
        this.state = {hasLoadingTimeExpired: false}
        this.hideLoadingView = this.hideLoadingView.bind(this)
    }
    static propTypes = {
        translate: PropTypes.func.isRequired,
        currentLanguage: PropTypes.string.isRequired
    }

    handleImageLoaded = (e) => {
        const image = {}
        image[`${e.target.alt}Loaded`] = true
        this.setState(image)
    }

    hideLoadingView = () => {
        this.setState({hasLoadingTimeExpired: true})
    }

    componentDidMount() {
        setTimeout(this.hideLoadingView, 6000)
    }

    render() {
        const { tutoringLoaded = false, tutoringsmLoaded = false, step1Loaded = false, step2Loaded = false, step3Loaded = false, step4Loaded = false, tutor1Loaded = false, tutor2Loaded = false, tutor3Loaded = false, tutor4Loaded = false, hasLoadingTimeExpired = false } = this.state
        const allImagesLoaded = tutoringLoaded && tutoringsmLoaded && step1Loaded && step2Loaded && step3Loaded && step4Loaded && tutor1Loaded && tutor2Loaded && tutor3Loaded && tutor4Loaded
        const isLoading = !allImagesLoaded && !hasLoadingTimeExpired
        const { translate, currentLanguage, signUpUser, isAuthenticated, errors, authenticating } = this.props
        const loaderView = (<div style={{ position: 'fixed', zIndex: '10', top: '0', bottom: '0', left: '0', right: '0', background: 'white'}} className={classnames('justify-content-center align-items-center', {'d-none': !isLoading }, {'d-flex': isLoading })}><Loader /></div>)
        return (
            <Container authRestrict={false} verifiedRestrict={false}>
                {loaderView}
                <section style={{position: 'relative', overflow: 'hidden'}}  className='get-started-top'>
                <img onLoad={this.handleImageLoaded.bind(this)} style={{ position: 'absolute', right: '0', bottom: '0', width: '90%', height: 'auto'}} className='d-block d-sm-none' src={tutoringsm} alt="tutoringsm"/>
                    <div className="container">
                        <div className={`row panel-ctn align-items-center no-gutters ${currentLanguage}`}>
                            <div className="heading-title col-11 py-3 col-md-6 my-2 text-ctn">
                                <h2>{translate('getStarted.introTitle')}</h2>
                                <p>{translate('getStarted.introSubtitle')}</p>
                                <Link to='/signup' className='btn btn-success'>{translate('getStarted.buttonTitle')}</Link>
                            </div>
                            <div className="col-6 d-none d-sm-flex justify-content-end align-items-center">
                                <img onLoad={this.handleImageLoaded.bind(this)} style={{width: '70%', height: 'auto'}} src={tutoring} alt="tutoring"/>
                            </div>
                        </div>  
                    </div>
                </section>
                <section className="walkthrough-sec">
                    <div className={`container ${currentLanguage}`}>
                        <div className="row pt-4 align-items-center justify-content-center">
                            <div style={{textAlign: 'center'}} className="col-11 col-md-6 my-4">
                                <h3 className='intro-text'>We find the right tutor for you</h3>
                                <p className='sub-intro-text'>We match you with skilled tutors that match your needs, in your area. </p>
                                <Link to='/signup' style={{color: 'white'}} className="btn btn-primary">Discover tutors near you</Link>
                            </div>       
                        </div>
                        <div className="row walktrhough-sec__ctn">
                            <div className="col-12 col-md-5 py-4 walkthrough-item">
                                <div className="d-flex">
                                    <div className="illustration">
                                        <div className="icon-ctn d-flex justify-content-center">
                                            <img onLoad={this.handleImageLoaded.bind(this)} style={{ width: '50%'}} src={step_1} alt="step1"/>
                                        </div>
                                    </div>
                                    <div className="text ml-4">
                                        <div className="d-inline-flex align-items-center">
                                            <span className={css(styles.spanNumber)}>
                                                <p className='number m-0'>1</p>
                                            </span>
                                            <h4 style={{paddingTop: '8px'}}>{translate('steps.step1.title')}</h4>
                                        </div>
                                        <p className='content'>{translate('steps.step1.content')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 py-4 offset-md-1 walkthrough-item">
                                <div className="d-flex">
                                    <div className="illustration">
                                        <div className="icon-ctn d-flex justify-content-center">
                                            <img onLoad={this.handleImageLoaded.bind(this)} style={{ width: '50%'}} src={step_2} alt="step2"/>
                                        </div>
                                    </div>
                                    <div className="text ml-4">
                                        <div className="d-inline-flex align-items-center">
                                            <span className={css(styles.spanNumber)}>
                                                <p className='number m-0'>2</p>
                                            </span>
                                            <h4 style={{paddingTop: '8px'}}>{translate('steps.step2.title')}</h4>
                                        </div>
                                        <p className='content'>{translate('steps.step2.content')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 py-4 walkthrough-item">
                                <div className="d-flex">
                                    <div className="illustration">
                                        <div className="icon-ctn d-flex justify-content-center">
                                            <img onLoad={this.handleImageLoaded.bind(this)} style={{ width: '50%'}} src={step_3} alt="step3"/>
                                        </div>
                                    </div>
                                    <div className="text ml-4">
                                        <div className="d-inline-flex align-items-center">
                                            <span className={css(styles.spanNumber)}>
                                                <p className='number m-0'>3</p>
                                            </span>
                                            <h4 style={{paddingTop: '8px'}}>{translate('steps.step3.title')}</h4>
                                        </div>
                                        <p className='content'>{translate('steps.step3.content')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 py-4 offset-md-1 walkthrough-item">
                                <div className="d-flex">
                                    <div className="illustration">
                                        <div className="icon-ctn d-flex justify-content-center">
                                            <img onLoad={this.handleImageLoaded.bind(this)} style={{ width: '50%'}} src={step_4} alt="step4"/>
                                        </div>
                                    </div>
                                    <div className="text ml-4">
                                        <div className="d-inline-flex align-items-center">
                                            <span className={css(styles.spanNumber)}>
                                                <p className='number m-0'>4</p>
                                            </span>
                                            <h4 style={{paddingTop: '8px'}}>{translate('steps.step4.title')}</h4>
                                        </div>
                                        <p className='content'>{translate('steps.step4.content')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='tutors'>
                    <div className={`container mb-4 ${currentLanguage}`}>
                        <div className="row">
                            <div className="col-12 col-sm-6 p-4">
                                <div className='d-flex flex-column justify-content-center align-items-center pt-4 px-0 px-sm-4'>
                                    <img onLoad={this.handleImageLoaded.bind(this)} className='mb-2' style={{width: '18%', minWidth: '110px',  maxWidth: '140px', height: 'auto'}} src={tutor_1} alt='tutor1'/>
                                    <h3 className='mb-1' style={{fontSize: '1.2rem'}}>Victor Oladipo</h3>
                                    <p style={{fontSize: '1.1rem'}} className='mb-1'>长宁区, Shanghai</p>
                                    <Stars rating={4} />
                                    <p style={{fontSize: '1rem', textAlign: 'center'}} className='mx-0 mx-sm-1 py-2'>{translate('getStarted.tutorIntro.1')}</p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 px-4 py-0 py-sm-4">
                                <div className='d-flex flex-column justify-content-center align-items-center pt-4 px-0 px-sm-4'>
                                    <img onLoad={this.handleImageLoaded.bind(this)} className='mb-2' style={{width: '18%', minWidth: '110px',  maxWidth: '140px', height: 'auto'}} src={tutor_2} alt='tutor2'/>
                                    <h3 className='mb-1' style={{fontSize: '1.2rem'}}>Becky White</h3>
                                    <p style={{fontSize: '1.1rem'}} className='mb-1'>长宁区, Shanghai</p>
                                    <Stars rating={4} />
                                    <p style={{fontSize: '1rem', textAlign: 'center'}} className='mx-0 mx-sm-1 py-2'>{translate('getStarted.tutorIntro.2')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 p-4">
                                <div className='d-flex flex-column justify-content-center align-items-center px-0 px-sm-4'>
                                    <img onLoad={this.handleImageLoaded.bind(this)} className='mb-2' style={{width: '18%', minWidth: '110px',  maxWidth: '140px', height: 'auto'}} src={tutor_3} alt='tutor3'/>
                                    <h3 className='mb-1' style={{fontSize: '1.2rem'}}>Afeni Cissé</h3>
                                    <p style={{fontSize: '1.1rem'}} className='mb-1'>长宁区, Shanghai</p>
                                    <Stars rating={5} />
                                    <p style={{fontSize: '1rem', textAlign: 'center'}} className='mx-0 mx-sm-1 py-2'>{translate('getStarted.tutorIntro.3')}</p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 p-4">
                                <div className='d-flex flex-column justify-content-center align-items-center px-0 px-sm-4'>
                                    <img onLoad={this.handleImageLoaded.bind(this)} className='mb-2' style={{width: '18%', minWidth: '110px',  maxWidth: '140px', height: 'auto'}} src={tutor_4} alt='tutor4'/>
                                    <h3 className='mb-1' style={{fontSize: '1.2rem'}}>Christopher Willem</h3>
                                    <p style={{fontSize: '1.1rem'}} className='mb-1'>长宁区, Shanghai</p>
                                    <Stars rating={3} />
                                    <p style={{fontSize: '1rem', textAlign: 'center'}} className='mx-0 mx-sm-1 py-2'>{translate('getStarted.tutorIntro.4')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    spanNumber: {
        borderRadius: '50%',
        Width: '25px',
        Height: '25px',
        marginRight: '10px',
        position: 'relative'
    }
})

GetStarted.propTypes = {
  isAuthenticated: PropTypes.bool,
  authenticating: PropTypes.bool,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  const { account: {isAuthenticated, authenticating}, errors } = state
  return {
    isAuthenticated,
    authenticating,
    errors,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps)(GetStarted))