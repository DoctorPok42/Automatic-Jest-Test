import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faReact, faSquareJs, faVuejs } from '@fortawesome/free-brands-svg-icons';

interface FileIconsConfig {
  [key: string]: ReactElement | IconDefinition;
}

const fileIconsConfig: FileIconsConfig = {
  tsx: faReact,
  jsx: faReact,
  js: faSquareJs,
  ts: faReact,
  vue: faVuejs,

  default: faFile,
};

const Icon = ({ fileName }: { fileName: string }) => {
  const extension = fileName.split('.').pop() || '';
  const icon = fileIconsConfig[extension] || fileIconsConfig.default;

  return (
    <div>
      <FontAwesomeIcon icon={icon as any} width={30} height={30} />
    </div>
  )
}

export default Icon;
