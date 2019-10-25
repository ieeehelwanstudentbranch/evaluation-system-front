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
            <sections className={classes.Committee}>
                <table className={classes.CommitteeTable}>
                    <thead>
                        <tr>
                            <th className="DesktopOnly">avatar</th>
                            <th>name</th>
                            <th>position</th>
                            <th>status</th>
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

                                                <img src={`http://api.evaluation-system.ieeehsb.org/uploaded/profile_images/${member.image}`} alt={`${member.firstName}`} width="50px" height="50px"/>
                                                :<img src={`http://api.evaluation-system.ieeehsb.org/storage${member.image}`} alt={`${member.firstName}`} width="50px" height="50px"/>
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
            </sections>
            :<p>No volunteers yet in this committee</p>
        )
    }
}

export default SingleCommittee;