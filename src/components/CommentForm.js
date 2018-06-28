import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TextareaGroup from './TextareaGroup'

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: null
        }
    }

    onChange = (e) => this.setState({ [[e.target.name]]: e.target.value })

    handleSubmit = (e) => {
        const { handleSubmit } = this.props
        e.preventDefault()
        handleSubmit(this.state.comment)
    }

    componentWillReceiveProps = (newProps) => {
        const { isVisible } = newProps
        if (isVisible !== this.props.isVisible) {
            this.setState({comment: ''})
        }
    }

    render() {
        const { translate, handleHide, handleSubmit } = this.props;
        const { comment } = this.state;
        return (
            <form className='px-2 comment-form' onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-12 py-2">
                        <TextareaGroup 
                        value={comment}
                        onChange={this.onChange}
                        field='comment'
                        placeholder={translate('rating.comment')}
                        type='text'
                        />
                    </div>
                </div>
                <div className="d-flex lex-row justify-content-end">
                    <button onClick={handleHide} type='button' className='btn btn-default btn-sm mx-2'>{translate('userActions.cancel')}</button>
                    <button className='btn btn-success btn-sm' type='submit'>{translate('userActions.save')}</button>
                </div>
            </form>
        )
    }
}

CommentForm.propTypes = {
  translate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleHide: PropTypes.func,
  isVisible: PropTypes.bool,
}

export default CommentForm
