import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Dropzone from 'react-dropzone'
import pencil from '../styles/images/pencil.svg'
import { uploadUserAvatar } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

class AvatarInputView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: null,
      imageFile: null,
      uploadProgress: 0,
      isUploading: false,
      error: null
    }
  }

  uploadImageFile = imageFile => {
    const { user, uploadUserAvatar } = this.props
    console.log(imageFile)
    const endpoint = `users/${user._id}`
    const data = { avatar: imageFile }
    uploadUserAvatar(data, endpoint, this.onUploadProgress)
  }

  onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    console.log(`${percentCompleted}%`)
  }

  onDropAccepted = selectedFiles => {
    const imageFile = selectedFiles[0]
    this.setState({ imageUrl: imageFile.preview, imageFile})
    this.uploadImageFile(imageFile)
  }

  onDropRejected = imageFile => {
    console.log(imageFile)
  }

  render() {
    const { error, imageUrl, isUploading } = this.state
    return (
      <div className="avatar-container">
        <Dropzone
          accept="image/jpeg, image/png, image/jpg"
          onDropAccepted={this.onDropAccepted.bind(this)}
          multiple={false}
          maxSize={3000000}
          disabled={isUploading}
          className="avatar-dropzone"
        >
          <svg className="outer-container">
            <g className="outer success">
              <circle cx="0" cy="0" r="40"></circle>
            </g>
          </svg>
          <div className="image-container">
            <img src={imageUrl ? imageUrl : ''} />
            <p>Edit</p>
          </div>
        </Dropzone>
      </div>
    )
  }
}

// AvatarInputView.propTypes = {
//   on
// }

const mapStateToProps = (state, ownProps) => {
  const { user } = state.auth
  const { errors } = state
  return {
    user,
    errors,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps, {
  uploadUserAvatar
})(AvatarInputView)