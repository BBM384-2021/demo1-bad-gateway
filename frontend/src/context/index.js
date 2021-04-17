import React from 'react';
import Auth from './Auth';
import ClubSystem from "./Club";

const index = ({ children }) => {
	return (
			<Auth>
				<ClubSystem>
					{children}
				</ClubSystem>
			</Auth>
	);
};

export default index;