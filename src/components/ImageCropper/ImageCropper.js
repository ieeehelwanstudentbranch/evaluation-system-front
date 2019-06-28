import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar-edit';
import * as classes from './ImageCropper.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class ImageCropper extends React.Component {

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

  // urltoFile=(url, filename, mimeType)=>{
  //   return (fetch(url)
  //       .then(function(res){return res.arrayBuffer();})
  //       .then(function(buf){return new File([buf], filename, {type:mimeType});})
  //   );
  // }
  // code from stack overflow link: https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript#answer-36183085
  // convertBase64ToBlob = (url) =>{
  //   fetch(url)
  //     .then(res => res.blob())
  //     .then(blob => {
  //       this.convertBlobToFormData(blob)
  //     })
  //   ;
  // }

  // convertBlobToFormData = (blob) => {
  //   let data = new FormData();
  //   data.append('profile_image', blob)
  //   this.setState({
  //     convertedFile: data
  //   })
  // }
  base64toBlob=(base64Data, contentType)=> {
    contentType = contentType || '';
    let sliceSize = 1024;
    
    let byteCharacters = atob(base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        let begin = sliceIndex * sliceSize;
        let end = Math.min(begin + sliceSize, bytesLength);

        let bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    let blob;
    // return 
    blob = new Blob(byteArrays, { type: contentType });
    return this.blobToFile(blob, 'test.png')
    
  }
  blobToFile=(theBlob, fileName)=>{
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    let data = new FormData();
    data.append('profile_image', theBlob)
    return this.setState({
      convertedFile: data
    })
  }

  onClose() {
    this.setState({preview: null})
  }

  onCrop(preview) {
    this.setState({preview})
    // this.convertBase64ToBlob(preview)
    this.base64toBlob(preview, 'image/png')
    if(this.state.convertedFile){
      this.props.onChange(this.state.convertedFile)
    };
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