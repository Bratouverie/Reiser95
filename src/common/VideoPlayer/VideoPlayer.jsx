import React from 'react';

const VideoPlayer = props => {
    const { src, type, className } = props;

    return (
        <video
            autoPlay
            muted
            controls
            className={className}
            loop
            style={{ height: '100%', width: '100%', objectFit: 'cover' }} //object-fit:cover
        >
            <source src={src} type={type} />
        </video>
    );
};

export default React.memo(VideoPlayer);
