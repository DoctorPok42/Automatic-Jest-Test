import React from 'react';

import styles from './style.module.scss';

interface NavBarProps {
    linkSelected: 'file' | 'code' | 'params';
    setLinkSelected: (link: 'file' | 'code' | 'params') => void;
}

const NavBar = ({
    linkSelected,
    setLinkSelected,
}: NavBarProps) => {
    const links = [{
        name: "File",
        value: "file"
    }, {
        name: "Code",
        value: "code"
    }, {
        name: "Params",
        value: "params"
    }]

    return (
        <div className={styles.navbar}>
            <div className={styles.NavBarLinks}>
                {links.map((link, index) => (
                    <div
                        key={index}
                        className={styles.NavBarLink}
                        onClick={() => setLinkSelected(link.value as 'file' | 'code' | 'params')}
                    >
                        <p className={styles.NavBarLinkSelected} style={{
                            display: linkSelected === link.value ? "block" : "none"
                        }} />

                        <h2
                            className={styles.NavBarLinkText}
                            style={{...linkSelected === link.value && {
                                color: "var(--grey-light)"
                            }}}
                        >
                            {link.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavBar;
