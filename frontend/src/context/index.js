import React from 'react';
import Auth from './Auth';

const index = ({ children }) => {
	return (
			<Auth>
				{children}
			</Auth>
	);
};

export default index;