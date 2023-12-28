import { Button } from "@mui/material";
import { Add } from '@mui/icons-material/';

import styles from './styles.module.scss'

interface AddTestButtonProps {
    title: string;
    onClick: () => void;
    isDisabled?: boolean;
}

const AddTestButton = ({
    title,
    onClick,
    isDisabled,
}: AddTestButtonProps) => {
    return (
        <div className={styles.addTestButton}>
            <Button
                className={styles.addTestButton__imput}
                component="label"
                variant="contained"
                startIcon={<Add />}
                onClick={() => onClick()}
                disabled={isDisabled}
                style={{
                    borderRadius: '8px',
                    ...isDisabled && {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: '#ccc',
                    },

                }}
            >
                {title}
            </Button>
        </div>
    )
}

export default AddTestButton
