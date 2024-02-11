import React, { useState } from 'react';
import Setting from './Setting';
import Result from './Result';

function ParentComponent() {
    const [isAccu100, setIsAccu100] = useState(false);

    return (
        <>
            <Setting setAccu100={setIsAccu100} />
            <Result isAccu100={isAccu100} />
        </>
    );
}

export default ParentComponent;
