import React, { Component } from 'react';
import * as classes from './SingleCommittee.module.scss';
import axios from '../../../axios';
import {NavLink} from 'react-router-dom';
import {endpoint} from '../../../utilize/endpoint';
import DeleteUser from '../../../components/DeleteUser/DeleteUser';
import {connect} from 'react-redux';

class SingleCommittee extends Component{
    state={}

    componentDidMount(){
        axios.get(`/committee/${this.props.match.params.id}`)
            .then(response=>{
                this.setState({
                    ...response.data.data
                })
            }).catch(error=>{
                console.log(error)
            })
    }
    
    render(){
        return(
            this.state.members && this.state.members.length?
            <section className={classes.Committee}>
                {
                    this.props.message?
                        <p style={{textTransform: 'capitalize', margin: '20px auto', color: "#8bc24c"}}>{this.props.message}</p>
                    :this.props.error?
                        <p style={{textTransform: 'capitalize', margin: '20px auto', color: "#ca0000"}}>
                            {this.props.error}
                        </p>
                    :null
                }
                <table className={classes.CommitteeTable}>
                    <thead>
                        <tr>
                            <th className="DesktopOnly">avatar</th>
                            <th>name</th>
                            <th>position</th>
                            <th>status</th>
                            {
                                ((this.props.position === "EX_com")&&(this.state.mentor === this.props.userName)) || ((this.props.position === "highBoard")&&(this.state.director === this.props.userName))?
                                    <th>Delete</th>
                                :null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.members.map(member=>{
                            return(
                                <tr key={member.id}>
                                    <td className="DesktopOnly">
                                        <NavLink to={`/user/${member.id}`}>
                                            {
                                                member.image === "default.jpg" ?
                                                <img src={`${endpoint}/uploaded/profile_images/${member.image}`} alt={`${member.firstName}`} width="50px" height="50px"/>
                                                :<img src={`${endpoint}/storage${member.image}`} alt={`${member.firstName}`} width="50px" height="50px"/>
                                            }
                                        </NavLink>
                                    </td>
                                    <td>
                                        <NavLink to={`/user/${member.id}`}>
                                            {member.firstName} {member.lastName}
                                        </NavLink>
                                    </td>
                                    <td><span>{member.position}</span></td>
                                    <td><span>{member.status}</span></td>
                                    {
                                        ((this.props.position === "EX_com")&&(this.state.mentor === this.props.userName)) || ((this.props.position === "highBoard")&&(this.state.director === this.props.userName))?
                                            <td><DeleteUser selectedID={member.id}/></td>
                                        :null
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
            :<p>No volunteers yet in this committee</p>
        )
    }
}

const mapStateToProps = state => {
    return {
        position: state.user.userData? state.user.userData.position:null,
        role: state.user.userData? state.user.userData.ex_options.ex_options:null,
        userID: state.user.userData?state.user.userData.id:null,
        userName: state.user.userData?`${state.user.userData.firstName} ${state.user.userData.lastName}`:null,
        message: state.deleteUser?state.deleteUser.message:null,
        error: state.deleteUser?state.error:null,
    }
}

export default connect(mapStateToProps, null)(SingleCommittee)