import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './styles.module.scss'

interface FileUploadProps {
  title?: string;
  onFileUpload: (files: File[]) => void;
}

const FileUpload = ({
  title = 'File',
  onFileUpload,
}: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.inputStyle} >
      <input {...getInputProps()} />
      <div className={styles.item__icon}>
          <FontAwesomeIcon icon={faFile} />
      </div>

      <div className={styles.item__title}>
        <h2>
          {title}
        </h2>
      </div>
    </div>
  );
};

export default FileUpload;
