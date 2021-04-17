import React, {useContext } from 'react';
import {Card} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {AuthContext} from "../../context/Auth";
import {ClubContext} from "../../context/Club";
const ClubComponent = ({clubName,clubDescription,category,members,key}) => {
	const {authState} = useContext(AuthContext);
	const {deleteClub} = useContext(ClubContext);
	const capitalizeFirstLetter = (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
	const handleClubDelete = () => {
		console.log("club delete request")
		deleteClub();
	}
	return (
		<div className="site-card-border-less-wrapper" style={{marginBottom:25}} key={key}>
			<Card title={capitalizeFirstLetter(clubName || "Title")} bordered={true} extra={authState?.role?.find((role)=> role==="ADMIN") && <DeleteOutlined style={{color:"red"}} onClick={handleClubDelete}/>} >
				<div style={{display:"flex"}}>
					<p style={{fontWeight:"bold",marginRight:5}}>Category : </p>
					<p>{" "}{capitalizeFirstLetter(category.name || "Name not found") }</p>
				</div>
				<div style={{display:"flex"}}>
					<p style={{fontWeight:"bold",marginRight:5}}>Description : </p>
					<p>{" "}{capitalizeFirstLetter(clubDescription || "No Description provided")}</p>
				</div>
				<div style={{display:"flex"}}>
					<p style={{fontWeight:"bold",marginRight:5}}>Members : </p>
					<p>{" "}{members.length || 0}</p>
				</div>
			</Card>
		</div>

	)
}
export default ClubComponent;