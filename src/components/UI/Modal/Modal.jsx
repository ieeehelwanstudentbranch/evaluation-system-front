import React, {Component} from 'react';
import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';
import Logo from '../../Logo/ColoredLogo';
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
                        display: this.props.show? 'flex': 'none'
                    }}
                >
                    <header className={classes.ModalHeader}>
                        <Logo height='100%'/>
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