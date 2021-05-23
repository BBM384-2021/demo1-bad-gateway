import React, {Component} from 'react';
import {Button, Form, Icon, Label} from "semantic-ui-react";
import {FILE_UPLOAD_MAX_SIZE} from "../../constants/common/file";
import prettyBytes from "pretty-bytes";


class FileInput extends Component {

    static initialState = {
        file: null,
        message: null,
    };

    state = FileInput.initialState;

    fileInputRef = React.createRef();

    static defaultProps = {
        buttonIcon: "file",
        buttonText: "Dosya Seçiniz",
        fileTypes: "*",
        maxFileSize: FILE_UPLOAD_MAX_SIZE,
        required: false,
        selectFileCallback: (event) => {},
    };

    handleFileSelect = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];

        if (!file){
            this.setState(FileInput.initialState);
            event.target.value = null;
            return;
        }

        reader.onloadend = () => {
            let maxFileSize = this.props.maxFileSize * 1000 * 1000;
            if (file.size > maxFileSize){
                this.setState({
                    file: null,
                    message: {
                        icon: "cancel",
                        color: "red",
                        content: `Upload File must not exceed limit ${prettyBytes(maxFileSize)}. Selected file size: ${prettyBytes(file.size)}.`
                    }
                });
                event.target.value = null;
            } else {
                this.setState({
                    file: file,
                    message: null,
                });
            }

            this.props.selectFileCallback(event, this.state.file, this.state.message);
        };

        reader.readAsDataURL(file);
    };

    render() {

        const {buttonIcon, buttonText, required, fileTypes} = this.props;

        let color = "blue";

        if (required){
            color = "red";
        }

        return (
        <Form.Field>
            <Button as={"div"} labelPosition={"right"} onClick={() => this.fileInputRef.current.click()}>
                <Button icon labelPosition="left">
                    <Icon name={buttonIcon} color={color}/>
                    {buttonText} <span style={{color: "red"}}>{required && "*"}</span>
                </Button>
                {
                    this.state.file &&
                    <Label as='a' basic color={color} pointing='left'>
                        {this.state.file.name}
                    </Label>
                }
            </Button>
            <input
                ref={this.fileInputRef}
                type="file"
                hidden
                accept={fileTypes}
                onChange={this.handleFileSelect}
                onClick={this.resetInputFile}
            />

        </Form.Field>
        )
    }

}

export default FileInput;