import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as classes from './Profile.module.scss'
class ProfileIcon extends Component {
    componentDidMount(){

    }
    render(){
        let data;
        if(this.props.name && this.props.image){
            data = <div className={classes.ProfileIcon}>
                <img src={`http://localhost:8000/uploaded/profile_images/${this.props.image}`} alt={`${this.props.name}`}/>
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
    if(state.user.userData){
        return {
            name: state.user.userData.firstName,
            image: state.user.userData.image
        }
    }
}

const mapDispatchToProps = dispatch =>{
    return{

    }
}
export default connect(mapStateToProps, null)(ProfileIcon);