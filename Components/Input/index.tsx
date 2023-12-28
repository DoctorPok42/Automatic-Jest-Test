import React from 'react';

import styles from './input.module.scss';

interface InputProps {
    placeholder: string;
    onChange: (e: any) => void;
    label?: string;
    subLabel?: string;
    size?: 'small' | 'large';
    onClear?: () => void;
    setClear?: (clear: boolean) => void;
}

const Input = ({
    placeholder,
    onChange,
    label,
    subLabel,
    size = 'large',
    onClear,
    setClear,
}: InputProps) => {
    const handleChange = (e: any) => {
        onChange(e);
    }

    return (
        <div className={styles.inputContainer} style={{
            width: size === 'small' ? '80%' : '100%',
            height: size === 'small' ? '36px' : '8%',
            borderRadius: size === 'small' ? '10px' : '16px',
            padding: size === 'small' ? '8px' : '16px',
            marginTop: size === 'small' ? '-7px' : '16px',
        }}>
            {size !== "small" && <label className={styles.Input__label}>{label}</label>}
            <div className={styles.inputContent}>
                <input
                    className={styles.Input__input}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e)}
                    style={{
                        width: size === 'small' ? '97.5%' : '30%',
                        fontSize: size === 'small' ? '1.2em' : '1.4em',
                        borderRadius: size === 'small' ? '6px' : '8px',
                    }}
                />
                {subLabel && <span className={styles.Input__subLabel}>{subLabel}</span>}
            </div>
        </div>
    );
};

export default Input;
