import React from 'react';
import AllTests from '../AllTests';
import Params from '../Params';

import styles from './styles.module.scss';

interface MainBoxProps {
    linkSelected: 'file' | 'code' | 'params';
}

const MainBox = ({
    linkSelected,
}: MainBoxProps) => {
    return (
        <div className={styles.mainBox}>
            <div className={styles.mainBoxContent}>
                {linkSelected === "file" && (
                    <AllTests
                      linkSelected={linkSelected}
                    />
                )}

                {linkSelected === "code" && (
                    <AllTests
                      linkSelected={linkSelected}
                    />
                )}

                {linkSelected === "params" && (
                    <Params />
                )}
            </div>
        </div>
    );
};

export default MainBox;
