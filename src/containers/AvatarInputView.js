import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Dropzone from 'react-dropzone'
import { uploadUserAvatar, displayGlobalMessage } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

class AvatarInputView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFile: null,
      uploadProgress: 0,
      isUploading: false,
    }
    this.onUploadProgress = this.onUploadProgress.bind(this)
  }
  onDrop = (acceptedFiles, RejectedFiles) => {
  }

  uploadImageFile = imageFile => {
    this.setState({isUploading: true})
    const { user, uploadUserAvatar } = this.props
    const data = { avatar: imageFile }
    uploadUserAvatar(data, user.id, this.onUploadProgress)
  }

  onUploadProgress = (progressEvent) => {
    const uploadProgress = Math.round((progressEvent.loaded * 255) / progressEvent.total)
    this.setState({uploadProgress})
    if (uploadProgress === 255) {
      this.setState({isUploading: false})
    }
  }

  onDropAccepted = selectedFiles => {
    const imageFile = selectedFiles[0]
    this.setState({ imageUrl: imageFile.preview, imageFile})
    this.uploadImageFile(imageFile)
  }

  onDropRejected = imageFile => {
    const { displayGlobalMessage } = this.props
    displayGlobalMessage('errors.file.rejected', 'error', 'errors.oops')
  }

  render() {
    const { 
      user: { avatarUrl },
      translate
     } = this.props
    const { isUploading, uploadProgress } = this.state
    return (
      <div className={classnames('avatar-container', )}>
        <Dropzone
          accept="image/jpeg, image/png, image/jpg"
          onDropAccepted={this.onDropAccepted.bind(this)}
          multiple={false}
          maxSize={6000000}
          disabled={isUploading}
          activeClassName="active"
          disabledClassName="disabled"
          className="avatar-dropzone"
        >
          <svg className="outer-container">
            <g className="outer success" style={{ 'strokeDashoffset': 255 - uploadProgress}}>
              <circle cx="0" cy="0" r="40"></circle>
            </g>
          </svg>
          <div className="image-container">
            <img alt="" src={avatarUrl ? avatarUrl : ''} />
            <p>{isUploading ? '' : translate('userActions.edit')}</p>
          </div>
        </Dropzone>
      </div>
    )
  }
}

AvatarInputView.prototypes = {
  user: PropTypes.object,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  const { user } = state.account
  return {
    user,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps, {
  uploadUserAvatar,
  displayGlobalMessage
})(AvatarInputView)