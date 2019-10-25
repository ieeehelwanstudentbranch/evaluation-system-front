import React, {Component} from 'react';
import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';
import {MdClose} from 'react-icons/md';

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render(){
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        display: this.props.show? 'block': 'none'
                    }}
                >
                    <header className={classes.ModalHeader}>
                        {this.props.title? <h3>{this.props.title}</h3>:null}
                        <div className={classes.Icon}>
                            <MdClose onClick={this.props.modalClosed}/>
                        </div>
                        
                    </header>
                    
                    {this.props.children}
                </div>
            </>
        );
    }
}
export default Modal;