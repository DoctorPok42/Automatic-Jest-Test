import React from 'react';

import styles from './styles.module.scss';

interface ParamsProps {

}

const Params = ({ }: ParamsProps) => {
    return (
        <div className={styles.params}>
            <div className={styles.paramsToken}>
                <div className={styles.paramsTitle}>
                    <h2>Token Open AI</h2>
                </div>

                <div className={styles.paramsInput}>
                    <input type="text" placeholder="Token" />

                    <div className={styles.paramsButton}>
                        <h2>Save</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Params;
