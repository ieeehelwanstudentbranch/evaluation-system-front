import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '../UI/Button/Button'
import { connect } from 'react-redux';
import classes from './RichEditor.module.scss';

class RichEditor extends Component {
    state={

    }
    onSubmit(){

    }
    render(){
        return(
            <header className={classes.Editor}>
                <CKEditor
                    editor={ ClassicEditor }
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <Button type="submit" btnType="Default">Submit</Button>
            </header>
        )
    }
}
const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RichEditor);