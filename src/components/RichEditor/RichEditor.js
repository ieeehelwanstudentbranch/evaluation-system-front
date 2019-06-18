import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './RichEditor.module.scss';
import * as actions from '../../store/actions/index';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class RichEditor extends Component {
    modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
      }
    
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]   
    render(){
        return(
            <header className={classes.Editor}>
                <ReactQuill
                    placeholder="Write a new post"
                    theme="snow"
                    value={this.props.data}
                    modules={this.modules}
                    formats={this.formats}
                    onChange={(value)=>this.props.onChange(value)}
                />
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.richEditor.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChange: (data)=> dispatch(actions.handleData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RichEditor);