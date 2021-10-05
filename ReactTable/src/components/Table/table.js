import React, {useState} from "react";
import { ReactComponent as ArrowDown } from "../../images/arrow.svg";
import './table.css'
const Table = ({data, viewProfileInfo }) =>{

    const [rotateId, setRotateId] = useState(false);
    const [rotateFirstName, setRotateFirstName] = useState(false);
    const [rotateLastName, setRotateLastName] = useState(false);
    const [rotateEmail, setRotateEmail] = useState(false);
    const [rotatePhone, setRotatePhone] = useState(false);
    const [rotateState, setRotateState] = useState(false);
console.log(data);
    const rotateArrow = (e) =>{
        switch (e) {
            case 'id':  setRotateId(!rotateId)
                break;
            case 'firstName': setRotateFirstName(!rotateFirstName)               
                break;
            case 'lastName': setRotateLastName(!rotateLastName)             
                break;
            case 'email': setRotateEmail(!rotateEmail)        
                break;
            case 'phone': setRotatePhone(!rotatePhone)             
                break;
            case 'state': setRotateState(!rotateState)           
                break;
            default:
                break;
        }
    }


    return (
        <table className='table'>
        <thead>
        <tr>
            <th onClick={() => rotateArrow('id')}>
                id{<ArrowDown className={rotateId ? 'arrowDown_rotate_id_true' : 'arrowDown_rotate_id_false'}/>}
            </th>
            <th onClick={() => rotateArrow('firstName')}>
                First name{<ArrowDown className={rotateFirstName ? 'arrowDown_rotate_firstName_true' : 'arrowDown_rotate_firstName_false'}/>}
            </th>
            <th onClick={() => rotateArrow('lastName')}>
                Last name{<ArrowDown className={rotateLastName ? 'arrowDown_rotate_lastName_true' : 'arrowDown_rotate_lastName_false'}/>}
            </th>
            <th onClick={() => rotateArrow('email')}>
                Email{<ArrowDown className={rotateEmail ? 'arrowDown_rotate_email_true' : 'arrowDown_rotate_email_false'}/>}
            </th>
            <th onClick={() => rotateArrow('phone')}>
                Phone{<ArrowDown className={rotatePhone ? 'arrowDown_rotate_phone_true' : 'arrowDown_rotate_phone_false'}/>}
            </th>
            <th onClick={() => rotateArrow('state')}>
                State{<ArrowDown className={rotateState ? 'arrowDown_rotate_state_true' : 'arrowDown_rotate_state_false'}/>}
            </th>
        </tr>
        </thead>
        <tbody>
             {data.map((e,index) => {
                 
                return (
                    <tr key={index} onClick = {() => viewProfileInfo(index) } >
                        <td>{e.id}</td>
                        <td>{e.firstName}</td>
                        <td>{e.lastName}</td>
                        <td>{e.email}</td>
                        <td>{e.phone}</td>
                        <td>{e.adress.state}</td>
                    </tr>
                )
            })}
            </tbody>
    </table>
    )
}
export default Table