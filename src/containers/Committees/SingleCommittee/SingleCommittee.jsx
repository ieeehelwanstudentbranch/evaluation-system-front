import React, { Component } from 'react';
import * as classes from './SingleCommittee.module.scss';
import axios from '../../../axios';
import {NavLink} from 'react-router-dom';

class SingleCommittee extends Component{
    state={
        members: null
    }

    componentDidMount(){
        axios.get(`/committee/${this.props.match.params.id}`)
            .then(response=>{
                this.setState({
                    members: response.data.data.members
                })
            }).catch(error=>{
                console.log(error)
            })
    }
    
    render(){
        return(
            this.state.members && this.state.members.length?
            <table className={classes.Committee}>
                <thead>
                    <tr>
                        <th>avatar</th>
                        <th>name</th>
                        <th>position</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.members.map(member=>{
                        return(
                            <tr key={member.id}>
                                <td>
                                    <NavLink to={`/user/${member.id}`}>
                                        {
                                            member.image === "default.jpg" ?

                                            <img src={`http://localhost:8000/uploaded/profile_images/${member.image}`} alt={`${member.firstName}`} width="50px" height="50px"/>
                                            :<img src={`http://localhost:8000/storage${member.image}`} alt={`${member.firstName}`} width="50px" height="50px"/>
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            :null
        )
    }
}

export default SingleCommittee;