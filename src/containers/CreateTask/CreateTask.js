import React, {Component} from "react";
import Input from '../../components/UI/Input/Input';
import classes from './CreateTask.module.scss'
import DragableArea from "../../components/DragableArea/DragableArea";
import Button from '../../components/UI/Button/Button';
import RichEditor from '../../components/RichEditor/RichEditor';
import axios from '../../axios';
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdAddBox,
  MdIndeterminateCheckBox,
  MdFolder,
  MdFolderOpen,
  MdInsertDriveFile
} from "react-icons/md";


class CreateTask extends Component {
    state = {
        TaskForm: {
            title: {
                labelName: null,
                elementConfig: {
                    type: 'text',
                    id: 'taskTitle',
                    name: 'taskTitle',
                    placeholder: 'Task Title',
                },
                value: '',
                validation: {
                    minLength: 3,
                    maxLength: 50,
                    required: true
                },
                valid: false,
                touched: false
            },
            deadline: {
                labelName: null,
                elementConfig: {
                    type: 'datetime-local',
                    id: 'deadline',
                    name: 'deadline',
                    placeholder: 'Deadline',
                },
                value: '',
                validation: {
                    minLength: 3,
                    maxLength: 50,
                    required: true
                },
                valid: false,
                touched: false
            },
            files: [],
        },
        nodes: [
            {
                value: 'ex-com',
                label: 'Ex-com',
                children: [
                    { value: 'chairperson', label: 'Chairperson' },
                    { value: 'vice-chairperson', label: 'Vice Chairperson' },
                ],
            },{
                value: 'high-board',
                label: 'High Board',
                children: [
                    { value: 'it', label: 'IT' },
                    { value: 'ac', label: 'AC' },
                ],
            }
        ],
        checked: [],
        expanded: [],
    }
    componentDidMount(){
        axios.get('/create-task/')
            .then(response=>{
                console.log(response);
            }).catch(error=>{
                console.log(error)
            })
        ;
    }
    
    render(){
        const icons = {
            check: <MdCheckBox className="rct-icon rct-icon-check" />,
            uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
            halfCheck: (
              <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
            ),
            expandClose: (
              <MdChevronRight className="rct-icon rct-icon-expand-close" />
            ),
            expandOpen: (
              <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />
            ),
            expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
            collapseAll: (
              <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
            ),
            parentClose: <MdFolder className="rct-icon rct-icon-parent-close" />,
            parentOpen: <MdFolderOpen className="rct-icon rct-icon-parent-open" />,
            leaf: <MdInsertDriveFile className="rct-icon rct-icon-leaf-close" />
        };
        return(
            <>
                <form>
                    <div className={classes.leftSection}>
                        <div className={classes.basicInfo} >
                            <Input elementConfig={this.state.TaskForm.title.elementConfig} />
                            <Input elementConfig={this.state.TaskForm.deadline.elementConfig} />
                        </div>
                        <RichEditor />
                        <DragableArea />
                    </div>
                    <div className={classes.rightSection}>
                        <CheckboxTree
                            nodes={this.state.nodes}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                            icons={icons}
                        />
                    </div>
                    <Button btnType="Default">Send</Button>
                </form>
            </>
        )
    }
}

export default CreateTask