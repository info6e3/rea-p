import React, {FC} from 'react';

interface inactiveBackgroundProps {
    children: React.ReactNode,
}

const InactiveBackground:FC<inactiveBackgroundProps> = (props) => {
    return (
        <div className={"inactive-background"}>{props.children}</div>
    );
};

export default InactiveBackground;