import React from 'react';
import './index.css';

const Loader = ({ className }) => <div className={`${className} loader`}></div>;

export default React.memo(Loader);
