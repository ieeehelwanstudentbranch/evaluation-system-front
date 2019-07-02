import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import classes from './DragableArea.module.scss';
import {MdCloudUpload, MdFileDownload, MdClose} from 'react-icons/md';

class dragableArea extends Component{
    state={
        maxFileSize: 1073741824,
        maxFilesSize: 10737418240,
        acceptedFiles: [".docx", ".doc", ".txt", ".csv", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".jpeg", ".jpg", ".png", ".svg", ".gif", ".ps", ".xd", ".ai"],
        errors: [],
        files: [],
        drag: false,
        holding: false,
    }
    //convert Bytes to differents measures sizes
    formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    handleFiles = (files, rejectedFiles) => {
        function getFileExtension(filename) {
            return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        }
        if (rejectedFiles && rejectedFiles.length > 0){
            // eslint-disable-next-line
            rejectedFiles.map(rejectedFile=>{
                const CurrentRejectedFileName = rejectedFile.name,
                CurrentRejectedFileSize = rejectedFile.size,
                CurrentRejectedFileExt = getFileExtension(CurrentRejectedFileName).toLowerCase();
                if (CurrentRejectedFileSize > this.state.maxFileSize){
                    this.setState(state=>{
                        let errors = state.errors.concat(`Maximum file size should be less than ${this.formatBytes(this.state.maxFileSize)}`);
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
            // eslint-disable-next-line
            files.map(file=>{
                const CurrentFileName = file.name,
                currentFileSize = file.size,
                currentFileExt = getFileExtension(CurrentFileName).toLowerCase();
                if (currentFileSize <= this.state.maxFileSize && this.state.acceptedFiles.includes(`.${currentFileExt}`)){
                    this.setState(state=>{
                        let files = state.files.concat(file);
                        return{
                            ...state,
                            files: files,
                            holding: false,
                            drag: false
                        }
                    })
                }
            })
        }
    }

    DragEvent =()=>{
        return this.setState({drag: true, holding: true})
    }

    endDrag =() =>{
        return this.setState({drag: false})
    }
    
    render (){
        let dragAreaClasses = [classes.Dropzone];
        if (this.state.files && this.state.files.length>0) {
            dragAreaClasses = [classes.Dropzone, classes.HasItems];
        }
        if (this.state.files && this.state.files.length>0 && this.state.holding){
            dragAreaClasses = [classes.Dropzone, classes.HasItems];
        }
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
                accept={this.state.acceptedFiles}
            >
                {({getRootProps, getInputProps}) => (
                    <>
                        <section className={this.state.drag?[classes.Container, classes.Draged].join(' '):classes.Container} onDragOver={this.DragEvent} onDragLeave={this.endDrag}>
                            {
                                this.state.files && this.state.files.length>0?
                                <ul className={classes.Files}>
                                    {
                                        this.state.files.map((file, index) => (
                                            <li key={index}>{file.name} {this.formatBytes(file.size)} <span> <MdFileDownload /> <MdClose /></span></li>
                                        ))
                                    }
                                </ul>: null
                            }
                            <div {...getRootProps()} className={dragAreaClasses.join(' ')} style={this.state.holding?{display: 'flex'}:null}>
                                <input {...getInputProps()} />
                                <div >
                                    <MdCloudUpload/>
                                    <p>Drag &amp; drop files here, or click to select files</p>
                                </div>
                            </div>
                        </section>
                        <div className={classes.Validation}>
                            <p>Accebtable Files: {this.state.acceptedFiles.sort().join(', ')}</p>
                            <div className={classes.SizeValidation}>
                                <p>Max File Size: {this.formatBytes(this.state.maxFileSize)}</p>
                                <p>Max Files size: {this.formatBytes(this.state.maxFilesSize)}</p>
                            </div>
                        </div>
                        
                        <ul className={classes.Errors}>
                            {errors}
                        </ul>
                    </>
                )}
            </Dropzone>
        )
    }
}
    
export default dragableArea;
