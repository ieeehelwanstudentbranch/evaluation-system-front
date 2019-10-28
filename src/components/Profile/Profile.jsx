import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as classes from './Profile.module.scss';
import {endpoint} from '../../utilize/endpoint';

class ProfileIcon extends Component {

    render(){
        let data;
        if(this.props.name && this.props.image){
            data = <div className={classes.ProfileIcon}>
                {
                    this.props.image === "default.jpg" ?
                        <img src={`${endpoint}/uploaded/profile_images/${this.props.image}`} alt={`${this.props.name}`}/>
                        :<img src={`${endpoint}/storage${this.props.image}`} alt={`${this.props.name}`}/>
                }
                <p>{this.props.name}</p>
            </div>
        }
        return(
            <>
                {data}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.user.userData? state.user.userData.firstName:null,
        image: state.user.userData? state.user.userData.image:null,
    }
}
export default connect(mapStateToProps, null)(ProfileIcon);