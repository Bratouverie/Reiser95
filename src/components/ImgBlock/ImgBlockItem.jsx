import { cnb } from 'cnbuilder';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './index.css';

const ImgBlockItem = ({ path, id, alt = 'img' }) => {
    const collections = useSelector(state => state.collections);

    // TODO: set accountId when accaunts page will be created
    const firstCollectionId = useMemo(() => {
        const currentAccauntCollections = collections.collections.results.filter(
            c => c.account === id,
        );

        if (currentAccauntCollections.length === 0) {
            return null;
        }

        return currentAccauntCollections[0].id;
    }, [collections.collections, id]);

    return (
        <Link
            to={`/collection/${firstCollectionId}`}
            className={cnb('imgblock__item', {
                ['disabled-link']: !firstCollectionId,
            })}
        >
            <img src={path} alt={alt} className="imgblock__item--img" />
        </Link>
    );
};

export default ImgBlockItem;
