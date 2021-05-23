import React, {Component} from 'react';
import {connect} from "react-redux";
import * as clubActions from '../../api/actions/club';
import defaultClubImage from '../../static/image/white-image.png';
import { Link } from 'react-router-dom';

class SubClubs extends Component{
    state = {
      subClubs: [],
    };

    constructor(props) {
      super(props);
      this.handleSubClubList = this.handleSubClubList.bind(this);
    }

    componentDidMount() {
      const {clubId} = this.props;
      if(clubId === null || clubId === ""){
        this.setState({
          subClubs: []
        });
      } else {
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

    render(){
      if(this.props.clubId){
        return(
          this.state.subClubs.map((subClub) =>
            <div className="card">
              <div className="content">
                <div className="header" style={{color: "#0066cc"}}>
                  <Link to={"/subClub/info/" + subClub.value.id}>{subClub.value.name.toUpperCase()}</Link>
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
  }
};

const mapStateToProps = (state, ownProps) => {
  const {subClubList} = state;

  return {
    subClubList
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubClubs);