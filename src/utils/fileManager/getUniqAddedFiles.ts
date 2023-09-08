import { File } from '@/types/fileManager';

export const getUniqAddedFiles = (files: File[], names: string[]) => {
  const addedFile = files.filter(file => names.includes(file.name));

  const uniqAddedFiles = addedFile.reduce((total, file, index, arr) => {
    const lastUniqFile = arr.filter(fi => fi.name === file.name).at(-1);

    if (lastUniqFile && !total.includes(lastUniqFile)) {
      total.push(lastUniqFile);
    }

    return total;
  }, [] as File[]);

  return {
    uniqAddedFiles,
    uniqAddedFileIDs: uniqAddedFiles.map(file => file.fileID),
  };
};
