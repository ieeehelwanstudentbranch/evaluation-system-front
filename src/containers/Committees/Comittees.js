import React,{Component} from 'react';
import Committee from '../../components/Committee/Committee';

class Committees extends Component{

    render(){
        return (
            <div>
                <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
            </div>
        )
    }
}

export default Committees;