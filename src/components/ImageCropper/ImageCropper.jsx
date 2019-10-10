import React,{Component} from 'react';
import Avatar from 'react-avatar-edit';
import * as classes from './ImageCropper.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import formatFileSize from '../../utilize/formatFileSize';

class ImageCropper extends Component {
  
  constructor(props) {
    super(props)
    const src= this.props.image === 'default.jpg' ?
      `http://api.evaluation-system.ieeehsb.org/uploaded/profile_images/${this.props.image}`
      :`http://api.evaluation-system.ieeehsb.org/storage${this.props.image}`;
    const mimeTypes= 'jpg,png,jpeg,svg,gif,tiff,tif';
    const maxFileSize= 10490000;
    this.state = {
      preview: null,
      type: null,
      convertedFile: null,
      mimeTypes,
      src,
      maxFileSize
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
  }
  // code from stack overflow link: https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects/16972036#answer-38936042
  urltoFile=(url, filename, mimeType)=>{
    mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
    return (
      fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){
          return new File([buf], filename, {type:mimeType});
        })
        
    );
  }

  onClose() {
    this.setState({preview: null})
  }

  onCrop(preview) {
    this.setState({preview})
    this.urltoFile(preview, new Date())
      .then((file)=>{
        return this.props.onChange(file)
      });
  }

  onBeforeFileLoad(elem) {
    // size in bytes
    console.log(elem.target.files[0].size)
    if(elem.target.files[0].size > this.state.maxFileSize){
      alert("File is too big!");
      elem.target.value = "";
    }else{
      this.setState({type: elem.target.files[0].type})
    };
  }

  render () {
    return (
      <div className={classes.ImageCropper}>
        <Avatar
          width={450}
          imageHeight={450}
          height={300}
          cropColor={'white'}
          closeIconColor={'white'}
          shadingColor={'black'}
          shadingOpacity={0.5}
          mimeTypes={this.state.mimeTypes}
          onCrop={this.onCrop}
          onClose={this.onClose}
          onBeforeFileLoad={this.onBeforeFileLoad}
          src={this.state.src}
        />
        <div className={classes.InformationContainer}>
          <p className={classes.Types}>ALLOWED TYPES: {this.state.mimeTypes}</p>
          <p>Max File Size: {formatFileSize(this.state.maxFileSize)}</p>
        </div>
        
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onChange: (newImae)=>dispatch(actions.changeImage(newImae))
  }
}
export default connect(null, mapDispatchToProps)(ImageCropper)