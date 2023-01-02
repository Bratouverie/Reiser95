import { cnb } from 'cnbuilder';
import React from 'react';
import css from './Loader.module.css';

const Loader = ({ className }) => (
    <div className={cnb(css.clearLoading, css.loadingEffect, className)}>
        <span></span>
    </div>
);

export default React.memo(Loader);
