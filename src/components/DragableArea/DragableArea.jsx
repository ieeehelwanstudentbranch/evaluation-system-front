import React, {Component} from 'react';
import formatBytes from '../../utilize/formatFileSize'
import Dropzone from 'react-dropzone';
import classes from './DragableArea.module.scss';
import {MdCloudUpload, MdClose} from 'react-icons/md';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class dragableArea extends Component{
    state={
        maxFileSize: 1073741824,
        maxFilesSize: 10737418240,
        totalUploadedFilesSize: 0,
        acceptedFiles: [
            ".docx", ".doc", ".txt", ".csv", ".xls", ".xlsx",
            ".ppt", ".pptx", ".pdf", ".jpeg", ".jpg", ".png",
            ".svg", ".gif", ".ps", ".xd", ".ai", ".zip"
        ],
        acceptedMIMETypes: 'text/csv, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/gif, image/jpeg,image/png,application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, image/svg+xml, text/plain, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip, application/postscript, image/vnd.adobe.photoshop',
        errors: [],
        files: [],
        drag: false,
        holding: false,
    }

    handleFiles = (files, rejectedFiles) => {
        function getFileExtension(filename) {
            return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        }
        if (rejectedFiles && (rejectedFiles.length > 0)){
            // eslint-disable-next-line
            rejectedFiles.map(rejectedFile=>{
                const CurrentRejectedFileName = rejectedFile.name,
                CurrentRejectedFileSize = rejectedFile.size,
                CurrentRejectedFileExt = getFileExtension(CurrentRejectedFileName).toLowerCase();
                if (CurrentRejectedFileSize > this.state.maxFileSize){
                    this.setState(state=>{
                        let errors = state.errors.concat(`Maximum file size should be less than ${formatBytes(this.state.maxFileSize)}`);
                        return{
                            ...state,
                            errors: errors,
                            holding: false,
                            drag: false
                        }
                    })
                }
                if (!this.state.acceptedFiles.includes(`.${CurrentRejectedFileExt}`)){
                    this.setState(state=>{
                        let errors = state.errors.concat(`We can't accept ${CurrentRejectedFileExt} files`);
                        return{
                            ...state,
                            errors: errors,
                            holding: false,
                            drag: false
                        }
                    })
                }
            })
        }
        if (files && files.length>0){
            files.forEach(file=>{
                const CurrentFileName = file.name,
                currentFileSize = file.size,
                currentFileExt = getFileExtension(CurrentFileName).toLowerCase();
                let filesSize = currentFileSize;
                this.state.files.forEach(file=>{
                    filesSize += file.size;
                    this.setState({totalUploadedFilesSize: filesSize})
                })
                if ((currentFileSize <= this.state.maxFileSize) &&
                    this.state.acceptedFiles.includes(`.${currentFileExt}`) &&
                    (this.state.maxFilesSize >= filesSize)
                ){
                    let filesNames = [] ;
                    this.state.files.forEach(file=>{
                        filesNames.push(file.name)
                    })
                    if(!filesNames.includes(CurrentFileName)){
                        this.setState(state=>{
                            let files = state.files.concat(file);
                            this.props.changeFiles(files);
                            return{
                                ...state,
                                files: files,
                                holding: false,
                                drag: false
                            }
                        })
                    } else {
                        this.setState(state=>{
                            let errors = state.errors.concat(`${CurrentFileName} is alreay existing`);
                            return{
                                ...state,
                                errors: errors,
                                holding: false,
                                drag: false
                            }
                        })
                    }
                    
                }
            })
        }
    }

    deleteFile = (i) => {
        new Promise((resolve) => {
            let files = this.state.files.filter((fileName, index)=>{
                return index !== i
            })
            resolve(files)
        }).then(response=>{
            this.props.changeFiles(response)
            this.setState({    
                files: response
            })
        })
    }

    dragOver =()=>{
        return this.setState({drag: true, holding: true})
    }

    dragLeave =()=>{
        return this.setState({drag: false, holding: false})
    }
    
    render (){
        // drop zone area classes
        let dragAreaClasses = [classes.Dropzone];
        if (this.state.files && this.state.files.length>0) {
            dragAreaClasses = [classes.Dropzone, classes.HasItems];
        }
        if (this.state.files && this.state.files.length>0 && this.state.holding){
            dragAreaClasses = [classes.Dropzone, classes.HasItems];
        }
        // error handler
        let errors;
        if (this.state.errors && this.state.errors.length>0){
            this.state.errors.map((error, index) => (
                errors = <li key={index}>{error}</li>
            ))
        }
        return(
            <Dropzone onDrop={this.handleFiles}
                onChange={this.handleFiles}
                maxSize={this.state.maxFileSize}
                multiple={true}
                accept={this.state.acceptedMIMETypes}
            >
                {({getRootProps, getInputProps, isDragActive}) => (
                    <>
                        <section className={isDragActive?[classes.Container, classes.Draged].join(' '):classes.Container} onDragOver={this.dragOver} onDragEnd={this.dragLeave}>
                            {
                                this.state.files && this.state.files.length>0?
                                <ul className={classes.Files}>
                                    {
                                        this.state.files.map((file, index) => (
                                            <li key={index}>{file.name} {formatBytes(file.size)} <span><MdClose onClick={()=>this.deleteFile(index)} /></span></li>
                                        ))
                                    }
                                </ul>: null
                            }
                            <div {...getRootProps()} className={dragAreaClasses.join(' ')} style={this.state.holding?{display: 'flex'}:null}>
                                <input {...getInputProps()} />
                                {!isDragActive && <><MdCloudUpload/> <p>Drag &amp; drop files here, or click to select files</p></>}
                                {isDragActive && <><MdCloudUpload/> <p>Drop it like it's hot!</p></>}
                            </div>
                        </section>
                        <div className={classes.Validation}>
                            <p>Accebtable Files: {this.state.acceptedFiles.sort().join(', ')}</p>
                            <div className={classes.SizeValidation}>
                                <p>Max File Size: {formatBytes(this.state.maxFileSize)}</p>
                                <p>Max Files size: {formatBytes(this.state.maxFilesSize)}</p>
                            </div>
                            {this.state.totalUploadedFilesSize?<p>Total Uploaded Size: {formatBytes(this.state.totalUploadedFilesSize)}</p>:null}
                            <ul className={classes.Errors}>
                                {errors}
                            </ul>
                        </div>
                    </>
                )}
            </Dropzone>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeFiles: (files)=>dispatch(actions.handleTaskFiles(files))
    }
}

export default connect(null,mapDispatchToProps)(dragableArea);