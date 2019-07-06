import React,{Component} from 'react';
import Avatar from 'react-avatar-edit';
import * as classes from './ImageCropper.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class ImageCropper extends Component {

  constructor(props) {
    super(props)
    const src = `http://localhost:8000/uploaded/profile_images/${this.props.image}`;
    const mimeTypes= 'jpg,png,jpeg,svg,gif,tiff,tif';
    this.state = {
      preview: null,
      type: null,
      convertedFile: null,
      mimeTypes,
      src,
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    // this.urltoFile = this.urltoFile.bind(this)
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
  }
  // code from stack overflow link: https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects/16972036#answer-38936042
  urltoFile=(url, filename, mimeType)=>{
    mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
    return (fetch(url)
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
    this.urltoFile(preview, 'a.png')
      .then((file)=>{
        return this.props.onChange(file)
      });
  }

  onBeforeFileLoad(elem) {
    // size in kiloByte
    if(elem.target.files[0].size > 500000){
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
          width={500}
          height={500}
          cropColor={'black'}
          closeIconColor={'black'}
          shadingColor={'black'}
          shadingOpacity={0.5}
          mimeTypes={this.state.mimeTypes}
          onCrop={this.onCrop}
          onClose={this.onClose}
          onBeforeFileLoad={this.onBeforeFileLoad}
          src={this.state.src}
        />
        <p className={classes.Types}>ALLOWED TYPES: {this.state.mimeTypes}</p>
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