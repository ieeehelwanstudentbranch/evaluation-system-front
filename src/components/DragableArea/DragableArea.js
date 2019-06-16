import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import classes from './DragableArea.module.scss';


import {MdCloudUpload} from 'react-icons/md';

class dragableArea extends Component{
    state={
        maxFileSize: 1000000000,
        maxFilesSize: 10000000000,
        acceptedFiles: [".docx", ".doc", ".txt", ".csv", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".jpeg", ".jpg", ".png", ".svg", ".gif", ".ps", ".xd", ".ai"],
        errors: [],
        files: []
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
                        let errors = state.errors.concat(`Maximum file size should be less than ${this.state.maxFileSize}`);
                        return{
                            ...state,
                            errors: errors
                        }
                    })
                }
                if (!this.state.acceptedFiles.includes(`.${CurrentRejectedFileExt}`)){
                    this.setState(state=>{
                        let errors = state.errors.concat(`We can't accept ${CurrentRejectedFileExt} extenstion`);
                        return{
                            ...state,
                            errors: errors
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
                            files: files
                        }
                    })
                }
            })
        }
    }
    render (){
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
                        <section className={classes.Container}>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className={classes.Dropzone}>
                                    <MdCloudUpload/>
                                    <p>Drag &amp; drop files here, or click to select files</p>
                                </div>
                            </div>
                        </section>
                        <div className={classes.Validation}>
                            <p>Accebtable Files: {this.state.acceptedFiles.sort().join(', ')}</p>
                            <div className={classes.SizeValidation}>
                                <p>Max File Size: {this.state.maxFileSize/1000000000}GB</p>
                                <p>Max Files size: {this.state.maxFilesSize/1000000000}GB</p>
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
