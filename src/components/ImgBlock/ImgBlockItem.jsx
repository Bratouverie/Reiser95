import { cnb } from 'cnbuilder';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetFilteredCollectionQuery } from '../../redux/api/dataService';

import './index.css';

const ImgBlockItem = ({ path, id, alt = 'img' }) => {
    const { data: collections, isLoading: isCollectionsLoading } = useGetFilteredCollectionQuery(
        {
            accountId: id,
            page: 1,
            pageSize: 1000,
        },
        { skip: !id },
    );

    // TODO: set accountId when accaunts page will be created
    const firstCollectionId = useMemo(() => {
        if (!collections || !collections.results || collections.results.length === 0) {
            return null;
        }

        return collections.results[0].id;
    }, [collections, id]);

    if (!firstCollectionId || isCollectionsLoading) {
        return null;
    }

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

export default React.memo(ImgBlockItem);
