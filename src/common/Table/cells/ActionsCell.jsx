import React from 'react';

// type Props = {
//   actionsComponent: React.ReactNode;
//   classes?: {
//     cellRoot?: string;
//   };
// };

const ActionsCell = props => {
    const { classes, actionsComponent } = props;

    return <div className={classes.cellRoot}>{actionsComponent}</div>;
};

export default React.memo(ActionsCell);
