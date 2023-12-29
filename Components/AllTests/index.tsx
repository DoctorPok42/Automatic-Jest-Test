import React, { useState } from 'react';
import Icon from '../../src/lib/icons';
import FileUpload from '../FileUpload';
import { uploadFile, getUnitTests, deleteFile } from '@/lib/';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Skeleton from '@mui/material/Skeleton';

import styles from './allTests.module.scss';

interface AllTestsProps {
    linkSelected: string;
    isFile: boolean;
    setIsFile: (isFile: boolean) => void;
}

const AllTests = ({
    linkSelected,
    isFile,
    setIsFile,
}: AllTestsProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [fileNames, setFileNames] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [nbTest, setNbTest] = useState<number>(-1);
    let icon = Icon({ fileName: fileNames });

    const lines = "....................." // 20 lines
    const nbLines = lines.split('');

    const onFileUpload = async (file: File[]) => {
        setFiles(file);
        const fileNames = file.map(file => file.name);
        setFileNames(fileNames[0]);
        setIsFile(true);
        const filePath = await uploadFile(file[0]);
        const { testResult, numberOfTests } = await getUnitTests(filePath);
        setResult(testResult);
        setNbTest(numberOfTests);
        deleteFile(filePath);
    }

    const handleRegenerate = async () => {
        setResult("");
        setNbTest(-1);
        const filePaths = await uploadFile(files[0]);
        const { testResult, numberOfTests } = await getUnitTests(filePaths);
        setResult(testResult);
        setNbTest(numberOfTests);
        deleteFile(filePaths);
    }

    const handleChange = () => {
        setFileNames("");
        setResult("");
        setNbTest(-1);
        setIsFile(false);
    }

    const oneDarkProMixColors = {
      'code[class*="language-"]': {
        color: '#abb2bf',
        background: 'none',
      },
      'pre[class*="language-"]': {
        color: '#abb2bf',
        background: '#282c34',
      },
    };

    return (
        <div className={styles.allTestsContainer}>
            <div className={styles.allTests}>
                {(!isFile && linkSelected === 'file') &&
                    <div className={styles.uploadFile}>
                        <FileUpload onFileUpload={onFileUpload} />
                    </div>
                }

                <div className={styles.fileDesc}>
                    {(isFile && linkSelected === 'file') && (
                        <div className={styles.file}>
                            <div className={styles.fileIcon}>
                                {icon}
                            </div>
                            <div className={styles.fileName}>
                                <h2>{fileNames.length > 22 ? fileNames.substring(0, 22) + "..." : fileNames}</h2>
                            </div>
                        </div>
                    )}

                    {(isFile && linkSelected === 'file' && nbTest !== -1) && (
                        <div className={styles.text}>
                            <div className={styles.title}>
                                <h2>Number of tests: {nbTest}</h2>
                            </div>
                        </div>
                    )}

                    {(isFile && linkSelected === 'file' && result) && (
                        <div className={styles.button}>
                            <div className={styles.title}>
                                <h2 onClick={handleRegenerate}>Regenerate</h2>
                            </div>
                        </div>
                    )}

                    {(isFile && linkSelected === 'file' && result) && (
                        <div className={styles.button}>
                            <div className={styles.title}>
                                <h2 onClick={handleChange}>Change File</h2>
                            </div>
                        </div>
                    )}
                </div>
                {(isFile && linkSelected === 'file' && result) ? (
                    <div className={styles.resultContent}>
                        <SyntaxHighlighter
                            language="typescript"
                            wrapLines
                            wrapLongLines
                            ustomStyle={{ lineHeight: '1.4em' }}
                            style={{ ...vscDarkPlus, ...oneDarkProMixColors }}
                        >
                            {result}
                        </SyntaxHighlighter>
                    </div>
                ) : (isFile && linkSelected === 'file') && (
                    <div className={styles.resultContent}>
                        {nbLines.map((index) => (
                            <Skeleton
                                key={index}
                                variant="text"
                                width={Math.floor(Math.random() * 100) + 1 + '%'}
                                height={20}
                                animation="wave"
                                style={{ marginBottom: 5 }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTests;
