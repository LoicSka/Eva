import React from 'react'
import PropTypes from 'prop-types'
import { times, constant } from 'lodash'
import classnames from 'classnames'
import { StyleSheet, css } from 'aphrodite'

const NumbersBox = ({bookingCount, studentCount, reviewCount, translate, currentLanguage, size='md'}) => {
    return (
        <div className={`numbers-box-ctn ${size} ${currentLanguage}`}>
            <div className='d-flex flex-row justify-content-around'>
                <div className={`numbers-box ${css(styles.numbersBox)}`}>
                    <h2 className={css(styles.numbersBoxHeader)}>{bookingCount}</h2>
                    <p className={css(styles.numbersBoxSubHeader)}>{translate('tutorAccounts.classes')}</p>
                </div>
                <div className={`numbers-box ${css(styles.numbersBox)}`}>
                    <h2 className={css(styles.numbersBoxHeader)}>{studentCount}</h2>
                    <p className={css(styles.numbersBoxSubHeader)}>{translate('tutorAccounts.students')}</p>
                </div>
                <div className={`numbers-box ${css(styles.numbersBox)}`}>
                    <h2 className={css(styles.numbersBoxHeader)}>{reviewCount}</h2>
                    <p className={css(styles.numbersBoxSubHeader)}>{translate('tutorAccounts.reviews')}</p>
                </div>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    numbersBox: {
        textAlign: 'center'
    },
    numbersBoxHeader: {
        fontSize: '1.45rem',
    },
    numbersBoxSubHeader: {
        fontSize: '.65rem',
        color: '#8d9bac',
        textTransform: 'uppercase',
    }
})

NumbersBox.propTypes = {
    translate: PropTypes.func,
    currentLanguage:  PropTypes.string,
    bookingCount: PropTypes.number,
    studentCount: PropTypes.number, 
    reviewCount: PropTypes.number,
    size: PropTypes.string
}

export default NumbersBox