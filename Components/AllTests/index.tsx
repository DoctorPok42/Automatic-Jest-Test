import React, { useState } from 'react';
import Icon from '../../src/lib/icons';
import FileUpload from '../FileUpload';
import uploadFile from '@/lib/upload'
import getUnitTests from '@/lib/getUnitTests';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import styles from './allTests.module.scss';
import deleteFile from '@/lib/deleteFile';

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
    const [filePaths, setFilePaths] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [nbTest, setNbTest] = useState<number>(-1);
    let icon = Icon({ fileName: fileNames });

    const onFileUpload = async (file: File[]) => {
        setFiles(file);
        const fileNames = file.map(file => file.name);
        setFileNames(fileNames[0]);
        setIsFile(true);
        const filePath = await uploadFile(file[0]);
        setFilePaths(filePath);
        const { testResult, numberOfTests } = await getUnitTests(filePath);
        setResult(testResult);
        setNbTest(numberOfTests);
        deleteFile(filePath);
    }

    const handleRegenerate = async () => {
        setResult("");
        setNbTest(-1);
        const filePaths = await uploadFile(files[0]);
        setFilePaths(filePaths);
        const { testResult, numberOfTests } = await getUnitTests(filePaths);
        setResult(testResult);
        setNbTest(numberOfTests);
        deleteFile(filePaths);
    }

    const handleChange = () => {
        setFileNames("");
        setFilePaths("");
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
                {(isFile && linkSelected === 'file' && result) && (
                    <div className={styles.resultContent}>
                        <SyntaxHighlighter
                            language="typescript"
                            wrapLines
                            ustomStyle={{ lineHeight: '1.4em' }}
                            style={{ ...vscDarkPlus, ...oneDarkProMixColors }}
                        >
                            {result}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTests;
