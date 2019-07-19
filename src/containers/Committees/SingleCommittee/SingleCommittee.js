import React, { Component } from 'react';
import * as classes from './SingleCommittee.module.scss';
import axios from '../../../axios';

class SingleCommittee extends Component{
    state={
        members: null
    }

    componentDidMount(){
        axios.get(`/committee/${this.props.match.params.id}`)
            .then(response=>{
                console.log(response.data.data)
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
            <table>
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
                            <tr>
                                <td>
                                {
                                    member.image === "default.jpg" ?
                                    <img src={`http://localhost:8000/uploaded/profile_images/${member.image}`} alt={`${member.firstName}`} width="100px" height="100px"/>
                                    :<img src={`http://localhost:8000/storage${member.image}`} alt={`${member.firstName}`} width="100px" height="100px"/>
                                }
                                </td>
                                <td><span>{member.firstName} {member.lastName}</span></td>
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