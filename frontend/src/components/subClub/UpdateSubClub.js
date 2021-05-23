import React, {Component} from 'react';
import {withRouter} from "react-router";
import { Segment, Icon, Loader, Form, Message, Button, Header, TextArea } from 'semantic-ui-react';
import {LoadingStates} from "../../constants/common";
import {connect} from "react-redux";
import * as userActions from "../../api/actions/user";

import Page from "../base/Page";
import * as categoryActions from '../../api/actions/category';
import * as clubActions from '../../api/actions/club';
import * as SubClubActions from '../../api/actions/subClub';
import { Link } from 'react-router-dom';
import {FILE_UPLOAD_DOC_TYPES, FILE_UPLOAD_STATUS_SUCCESS} from "../../constants/common/file";
import FileInput from "../base/FileInput";


class UpdateSubClub extends Component {
    state = {
        fields: {
            id: "",
            name: "",
            parentClub: "",
            description: "",
            category: "",
        },

        categories: [],
        clubs:[],
        users:[],
        admin: "",

        photo: null,
        photoMessage: null,

        submitErrors: {},
        isFormSubmitting: false,

        isHidden: true,
        isSuccess: false,
        isError: false,

        messageHeader: "",
        messageForm: "",

        status: LoadingStates.LOADING,
        submitStatus: null,
    };

    constructor(props) {
        super(props);
        this.handleSubClubEdit = this.handleSubClubEdit.bind(this);
        this.handleGetCategories = this.handleGetCategories.bind(this);
        this.handleGetClubs = this.handleGetClubs.bind(this);
        this.handleGetUsers= this.handleGetUsers.bind(this);
        this.handleGetSubClubs = this.handleGetSubClubs.bind(this);
        this.submitFormCallback = this.submitFormCallback.bind(this);
        this.uploadFileCallback = this.uploadFileCallback.bind(this);
        this.uploadFileErrorCallback = this.uploadFileErrorCallback.bind(this);
        this.selectFile = this.selectFile.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getCategories(this.handleGetCategories);
        this.props.getClubs(this.handleGetClubs);
        this.props.getUsers(this.handleGetUsers);
        this.props.getSubClubs(this.handleGetSubClubs);

        this.setState({
            id: id
        })
        this.props.getSubClubInfo(id, this.handleSubClubEdit);
    }

    handleGetCategories(data) {
        this.setState({
              ...this.state,
              categories: data,
            }
        )
    }

    handleGetClubs(data) {
        this.setState({
              ...this.state,
              clubs: data,
          }
        )
    }

    handleGetSubClubs(data) {
        this.setState({
              ...this.state,
              allSubClubs: data,
          }
        )
    }


    handleGetUsers(data) {
        this.setState({
              ...this.state,
              users: data,
          }
        )
    }

    submitFormCallback = (response) => {
        this.setState({
          isHidden: false,
          messageHeader: "Sub-Club Updated Successfully",
          messageForm: response,
          isSuccess: true,
          isError: false,
        })
        setTimeout(() => {
          this.props.history.push("/sub_club/info/"+this.state.id);
        }, 2000)

        this.setState({
            isFormSubmitting: true,
            submitStatus: null,
        });

        const formData = new FormData();

        if(this.state.photo){
            formData.append("photo", this.state.photo);
        }

        this.props.uploadPhoto(this.state.fields.name, formData, this.uploadFileCallback, this.uploadFileErrorCallback)
    }

    handleSubClubEdit(data) {
        this.setState({
            fields: data,
            status: LoadingStates.LOADED,
        })
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const spaceCharacter = " ";
        const newLineCharacter = "\n";

        if (value.length && (value.startsWith(spaceCharacter) || value.startsWith(newLineCharacter)))
          return;

        if(this.state.allSubClubs.indexOf(value) > -1 ) {
            this.setState({
              isError:true,
              isHidden:false,
              isSuccess:false,
              messageHeader:"Sub-club with that name already exists!",
              messageFrom:"Sub-club with that name already exists!"
            })
            return;
        }
        this.setState({
          isError:false,
          isHidden:true,
          isSuccess:true,
          fields: {
            ...this.state.fields,
            [event.target.id]: value
          }
        })
    };

    uploadFileCallback = (result) => {
        if (result.success) {
            this.setState({
                submitStatus: FILE_UPLOAD_STATUS_SUCCESS,
                submitErrors: {},
                isFormSubmitting: false,
                photo: null,
            });
        }
    };

    uploadFileErrorCallback = () => {
        this.setState({
            isFormSubmitting: false,
        });
    };


    resetInputFile = (event) => event.target.value = null;

    dismissMessage = (state) => {
        return (event) => {
            this.setState({
                [state + 'Message']: null,
            });
        }
    };

    renderMessage(message, state, messagePrefix){
        return (
            <Message
                icon={message.icon}
                color={message.color}
                content={<React.Fragment>{messagePrefix && <b>{messagePrefix}:</b> }{message.content} </React.Fragment>}
                onDismiss={this.dismissMessage(state)}
            />
        )
    }

    selectFile = (state) => {
        return (event, file, message) => {
            this.setState({
                [state]: file,
                [state + 'Message']: message
            });


        }
    };



    handleParentClubChange= (e, { value }) => this.setState({
      fields: {
        ...this.state.fields,
        parentClub: value
      }
    });

  handleCategoryChange= (e, { value }) => this.setState({
    fields: {
      ...this.state.fields,
      category: value
    }
  });

  handleAdminChange= (e, { value }) => this.setState({
    fields: {
      ...this.state.fields,
      admin: value
    }
  });

  handleSubmit = (event) => {
    if(this.state.fields.name == "" || this.state.fields.parentClub == "" || this.state.fields.category == "" ||
      this.state.fields.admin == "" || this.state.fields.description == ""){
      this.setState({
        isError:true,
        isHidden:false,
        isSuccess:false,
        messageHeader:"Please fill in all fields in the form!",
        messageFrom:"Please fill in all fields in the form!"
      })
      return;
    }
    this.setState({
      submitStatus: true,
      isError:false,
      isHidden:true,
      isSuccess:true,
    });

      this.setState({
          photoMessage: null,
      });

    this.props.updateSubClub(this.state.fields, this.submitFormCallback);
  }

  render() {

    const {status} = this.state;

    if (status !== LoadingStates.LOADED) {
      return (
        <Loader active>
          Yükleniyor...
        </Loader>
      )
    }

    return (
      <Page>
        <Page.Content>
          <Message
            hidden={this.state.isHidden}
            success={this.state.isSuccess}
            error={this.state.isError}
            header={this.state.messageHeader}
            content={this.state.messageForm}
            className={"message-auth"}
          />
          <Segment>
            <Header className={"loginHeader"} size={"large"} >Update Sub-Club</Header>
              <Form.Field>
                  <b>Photo:</b>
                  <FileInput selectFileCallback={this.selectFile('photo')} buttonIcon={"photo"} buttonText={"Photo"} fileTypes={FILE_UPLOAD_DOC_TYPES} />
              </Form.Field>

            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Form.Input
                  label={"Name"}
                  placeholder='Sub-Club Name'
                  value={this.state.fields.name}
                  required
                  id={"name"}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
                <Form.Select
                  search
                  required
                  fluid
                  label = "Parent Club"
                  id={"parentClub"}
                  options={this.state.clubs.map((key) => ({text: key.name, value: key.name}))}
                  placeholder={"Club"}
                  value={this.state.fields.parentClub}
                  onChange={this.handleParentClubChange}
                />
                <Form.Select
                  search
                  required
                  fluid
                  label = "Category"
                  id={"category"}
                  options={this.state.categories.map((key) => ({text: key.name, value: key.name}))}
                  placeholder={"Category"}
                  value={this.state.fields.category}
                  onChange={this.handleCategoryChange}
                />
                <Form.Select
                  search
                  required
                  fluid
                  label = "Sub-Club Admin"
                  id={"admin"}
                  options={this.state.users.map((key) => ({text: key.name, value: key.name}))}
                  placeholder={"Sub-Club Admin"}
                  value={this.state.fields.admin}
                  onChange={this.handleAdminChange}
                />
                <Form.Field
                  required
                  fluid
                  id={'description'}
                  control={TextArea}
                  label='Description'
                  placeholder='Description'
                  value={this.state.fields.description}
                  onChange={this.handleInputChange}

                />
            </Form>
            <br/>
            <Button size={"large"} as={Link} onClick={this.handleSubmit} color='orange'>
              Update
            </Button>

          </Segment>
        </Page.Content>
      </Page>
    )

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategories: (callback) => {
      dispatch(categoryActions.getAllCategoriesAction(callback));
    },
    getClubs: (callback) => {
      dispatch(clubActions.getAllClubsAction(callback));
    },
    getUsers: (callback) => {
      dispatch(userActions.getAllUsersAction(callback));
    },
    getSubClubs: (callback) => {
      dispatch(SubClubActions.getAllSubClubsAction(callback));
    },

    getSubClubInfo: (id, callback) => {
      dispatch(SubClubActions.subClubInfoAction(id, callback));
    },
    updateSubClub: (body, callback) => {
      dispatch(SubClubActions.editSubClubAction(body, callback));
    },
      uploadPhoto: (id, data, callback, uploadFileErrorCallback) => {
          dispatch(SubClubActions.uploadPhotoAction(id, data, callback, uploadFileErrorCallback))
      },
  };
};

const mapStateToProps = (state, ownProps) => {
  const {user} = state;

  return {
    user
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateSubClub));