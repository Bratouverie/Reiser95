import React from 'react';
import './index.css';

const CenteredContainer = ({ children }) => {
    return <div className="centeredContainer">{children}</div>;
};

export default React.memo(CenteredContainer);
