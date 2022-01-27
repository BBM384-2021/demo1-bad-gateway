import React from 'react';

const PageContent = (props) => {
    const {
        children,
        bottomless
    } = props;

    let classNames = "content";

    if(bottomless){
        classNames = "bottomless " + classNames;
    }

    return (
        <div className={classNames}>
            {children}
        </div>
    )
};

export default PageContent;