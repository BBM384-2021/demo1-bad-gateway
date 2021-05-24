import React, {Component} from 'react';
import {connect} from "react-redux";
import * as clubActions from '../../api/actions/club';
import * as SubClubActions from "../../api/actions/subClub";
import defaultClubImage from '../../static/image/white-image.png';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class SubClubs extends Component{
    state = {
      subClubs: [],
      canJoinClubs:false,
      enrolledClubs: [],
      userId:0
    };

    constructor(props) {
      super(props);
      this.handleSubClubList = this.handleSubClubList.bind(this);
      this.sendEnrollmentRequest = this.sendEnrollmentRequest.bind(this);
    }

    componentDidMount() {
      const {clubId,enrolledClubs} = this.props;
      if(clubId === null || clubId === ""){
        this.setState({
          subClubs: []
        });
      } else {
        let scores = JSON.parse(localStorage.getItem("scores"))
        if(scores){
          console.log("scores")
          console.log(scores)
          let scoreOfClub = scores.find(score=> score.clubId === clubId)
          let status = false;
          if(scoreOfClub && scoreOfClub.score>=50){
            status = true
          }
          this.setState({
            ...this.state,
            canJoinClubs: status,
            enrolledClubs: enrolledClubs,
            userId:scores[0].userId
          })
        }

        this.props.getSubClubs(clubId, this.handleSubClubList);
      }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if(prevProps.clubId !== this.props.clubId){
        if(this.props.clubId === null || this.props.clubId  === ""){
          this.setState({
            subClubs: []
          });
        } else {
          const {clubId} = this.props;
          this.props.getSubClubs(clubId, this.handleSubClubList);
        }
      }
    }

    handleSubClubList(data) {
      let subClubs = [];
      data.forEach((SubClub) => {
        subClubs.push({value: {id:SubClub.id, name:SubClub.name, description:SubClub.description, admin:SubClub.admin}});
      });
      this.setState({
        subClubs: subClubs,
      })
    }

    handleDropdownChange = (event, data) => {
      this.props.stateChangeCallback(data.value);
    };

    sendEnrollmentRequest = (subClubId) => {
        this.props.enrollToSubClub(subClubId,this.state.userId,this.enrollmentCallback)
    }

    enrollmentCallback = (data) => {
        console.log("callback enrollment")
        console.log(data)
        const {enrolledClubs} = this.state
        enrolledClubs.push(data)
        this.setState({
          ...this.state,
          enrolledClubs: enrolledClubs
        })
    }


    render(){
      if(this.props.clubId){
        return(
          this.state.subClubs.map((subClub) =>
            <div className="card">
              <div className="content">
                <div className="header" style={{color: "#0066cc"}} style={{display:"flex",justifyContent:"space-between"}}>
                  <Link to={"/sub_club/info/" + subClub.value.id}>{subClub.value.name.toUpperCase()}</Link>
                  {this.state.enrolledClubs.find(club => club.id === subClub.value.id)
                    ?
                    <div>
                      {<Button positive onClick={() => {} }>Enrolled</Button>}
                    </div>
                    :
                    <div>
                      {this.state.canJoinClubs && <Button positive onClick={() => this.sendEnrollmentRequest(subClub.value.id)}>Join Sub Club</Button>}
                    </div>
                    }

                </div>
                <div as='h2' className="meta">
                  {subClub.value.admin.name}
                </div>
                <br/>
                <img className="left floated small ui image" src={defaultClubImage}/>
                  <div>
                    {subClub.value.description}
                  </div>
              </div>
            </div>

          )
        )
      }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSubClubs: (clubId, callback) => {
      dispatch(clubActions.subClubListAction(clubId, callback));
    },
    enrollToSubClub: (subClubId,userId,callback) => {
        dispatch(clubActions.enrollToSubClub(subClubId,userId, callback));
    },
  }
};

const mapStateToProps = (state, ownProps) => {
  const {subClubList} = state;

  return {
    subClubList
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubClubs);