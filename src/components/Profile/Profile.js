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
    return {
        name: state.user.userData? state.user.userData.firstName:null,
        image: state.user.userData? state.user.userData.image:null,
    }
}

const mapDispatchToProps = dispatch =>{
    return{

    }
}
export default connect(mapStateToProps, null)(ProfileIcon);