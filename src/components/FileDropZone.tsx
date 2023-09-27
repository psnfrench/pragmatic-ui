import { Box, Button, Grid, IconButton, styled, SxProps, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { cloneDeep, get } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Accept, DropzoneOptions, FileRejection, useDropzone, FileWithPath } from 'react-dropzone';
import { FileInfo, Image, S3Files } from '../types';
import { PIcon } from '../images/PIcon';
import { Colors } from '../constants/Colors';
import { ErrorLabel } from './ErrorLabel';

const sortFiles = (files: CurrentFiles[]) => {
  return files.sort((a, b) =>
    a.filePosition !== undefined && b.filePosition !== undefined && a.filePosition > b.filePosition
      ? 1
      : a.filePosition !== undefined && b.filePosition !== undefined && b.filePosition > a.filePosition
      ? -1
      : 0,
  );
};

const checkFileNameUsed = (name: string, newFiles: File[], oldFiles?: CurrentFiles[]) => {
  let used = -1;
  const _name = name.substring(0, name.lastIndexOf('.')) || name;

  for (const file of newFiles) {
    if (file.name.includes(_name)) used++;
  }
  if (oldFiles)
    for (const file of oldFiles) {
      if (file.filename.includes(_name)) used++;
    }
  if (used) {
    const newExt = name.substring(name.lastIndexOf('.')) || '';
    const newName = name.substring(0, name.lastIndexOf('.')) || name;
    return `${newName}(${used})${newExt}`;
  } else return name;
};

const ImageTypes: string[] = [
  '.apng',
  '.avif',
  '.giv',
  '.jpg',
  '.jpeg',
  '.jfif',
  '.pjpeg',
  '.pjp',
  '.png',
  '.webp',
  '.svg',
  'apng',
  'avif',
  'giv',
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'webp',
  'svg',
];

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  '& .dropZone': {
    background: '#EFF0F6',
    borderRadius: theme.spacing(2),
    minWidth: theme.spacing(56),
    minHeight: theme.spacing(15),
    textAlign: 'center',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  '& .buttonUpload': {
    padding: '9px 22px !important',
    backgroundColor: '#757EF2 !important',
    marginTop: `${theme.spacing(2)} !important`,
    width: `${theme.spacing(24)} !important`,
  },
  '& .iconRemoveFile': {
    top: theme.spacing(-3),
    left: theme.spacing(3.75),
  },
  '& .iconStarFile': {
    top: theme.spacing(-3),
    right: theme.spacing(3.75),
  },
  '& .thumbnailCover': {
    position: 'relative',
    width: '53px',
    height: '58px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export type FileUploaderProps = {
  name: string;
  awsUrl?: string;
  maxFiles?: number;
  maxSize?: number;
  fileFormat?: Accept;
  featured?: boolean;
  onFilesChange?: () => void;
  containerSx?: SxProps;
  renderTitle?: (openFilePicker?: () => void) => React.ReactNode;
  renderButton?: (openFilePicker: () => void) => React.ReactNode;
  renderFile?: (file: CurrentFiles, onStarClick: () => void, onRemoveFileCLick: () => void) => React.ReactNode;
  addButtonInRender?: (openFilePicker: () => void) => React.ReactNode;
  update?: boolean;
  renderFilesBoxProps?: SxProps;
  fileRejectionHelperText?: string;
};

export type CurrentFileImage = Partial<Pick<Image, 'crop' | 'rotation' | 'zoom' | 'croppedImageUrl'>> & {
  path?: string;
};

export type CurrentFiles = {
  imageUrl?: string;
  alteredName?: string;
  filename: string;
  fileType: 'new' | 'old';
  crop?: { x: number; y: number };
  zoom?: number;
  rotation?: number;
  croppedImageUrl?: string;
  filePosition?: number;
};

const StyledImg = styled('img')(() => ({
  height: '58px',
  width: '100%',
  objectFit: 'cover',
  mask: 'linear-gradient(-45deg, transparent 8px, #ddd 0) bottom right',
}));

export const FileDropZone = ({
  name,
  maxFiles = 0,
  maxSize,
  fileFormat,
  featured,
  awsUrl,
  containerSx,
  renderTitle,
  renderButton,
  renderFile,
  addButtonInRender,
  update,
  renderFilesBoxProps,
  fileRejectionHelperText,
}: FileUploaderProps) => {
  const { setFieldValue, values } = useFormikContext<{ [name: string]: Image[] | FileInfo[] | S3Files[] }>();
  const [files, setFiles] = useState<(File & CurrentFileImage)[]>([]);
  const [filesSync, setFileSync] = useState<(Image | FileInfo | (File & CurrentFileImage) | S3Files)[]>(
    get(values, name, []),
  );

  const getCurrentFiles = useCallback(() => {
    const files: CurrentFiles[] = get(values, name, []).map(
      (value: FileInfo | Image | (File & CurrentFileImage) | S3Files, index: number) => {
        const file: FileInfo | undefined = (value as FileInfo).locationUrl ? (value as FileInfo) : undefined;
        const s3File: S3Files | undefined = (value as S3Files).file ? (value as S3Files) : undefined;
        const image: Image = value as Image;
        if (file) {
          return {
            imageUrl: file.locationUrl,
            filename: file.origFileName,
            fileType: 'old',
            filePosition: index,
          };
        } else if (s3File) {
          return {
            imageUrl: awsUrl ? awsUrl + (s3File.file as Image).path : (s3File.file as Image).path,
            filename: (s3File.file as Image).filename,
            fileType: 'old',
            alteredName: s3File.alteredName,
            filePosition: index,
          };
        } else {
          return {
            imageUrl: image.signedUrl ? image.signedUrl : awsUrl ? awsUrl + image.path : image.path,
            filename: image.filename,
            fileType: 'old',
            crop: image.crop,
            zoom: image.zoom,
            rotation: image.rotation,
            croppedImageUrl: image.croppedImageUrl,
            filePosition: index,
          };
        }
      },
    );
    return files;
  }, [awsUrl, name, values]);
  const [currentFiles, setCurrentFiles] = useState<CurrentFiles[]>(getCurrentFiles());

  const [error, setError] = useState('');

  // Handles reordering and re-setting items in DropZone
  const updateFieldValues = useCallback(
    (sortedFiles: CurrentFiles[]) => {
      const _filesSync = cloneDeep(filesSync);
      const _files = cloneDeep(files);
      const arr: (Image | FileInfo | (File & CurrentFileImage) | S3Files)[] = [];
      for (const sortedFile of sortedFiles) {
        _filesSync.forEach((file) => {
          const _file: FileInfo | undefined = (file as FileInfo).locationUrl ? (file as FileInfo) : undefined;
          const _s3File: S3Files | undefined = (file as S3Files).file ? (file as S3Files) : undefined;
          if (_s3File && (_s3File.file as Image).filename === sortedFile.filename) arr.push(file);
          else if (_file && _file.origFileName === sortedFile.filename) arr.push(file);
          else if ((file as Image).filename === sortedFile.filename) arr.push(file);
        });
        _files.forEach((file) => {
          if (file.name === sortedFile.filename || file.path === sortedFile.filename) arr.push(file);
        });
      }
      setCurrentFiles(sortedFiles);
      setFieldValue(name, arr);
    },
    [files, filesSync, name, setFieldValue],
  );

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      // Do something with the files
      const numberOfFiles = currentFiles.length + acceptedFiles.length;
      if ((numberOfFiles <= maxFiles && maxFiles !== 0) || maxFiles === 0) {
        acceptedFiles = acceptedFiles.map((_file) => {
          const _name = checkFileNameUsed(_file.name, acceptedFiles, currentFiles);
          if (_name !== _file.name) {
            const blob = _file.slice(0, _file.size, _file.type);
            const _newFile = new File([blob], checkFileNameUsed(_file.name, acceptedFiles, currentFiles));
            Object.defineProperty(_newFile, 'path', {
              writable: true,
              value: _name,
            });
            return _newFile;
          } else return _file;
        });
        const newCurrentFiles: CurrentFiles[] = acceptedFiles.map((_file, index) => ({
          imageUrl: URL.createObjectURL(_file),
          filename: _file.name,
          fileType: 'new',
          filePosition: index + files.length,
        }));
        setCurrentFiles([...currentFiles, ...newCurrentFiles]);
        setFiles([...files, ...acceptedFiles]);
        setError('');
        values[name] && values[name].length
          ? setFieldValue(name, [...values[name], ...acceptedFiles])
          : setFieldValue(name, acceptedFiles);
      } else {
        setError(`The maximum number of files allowed is ${maxFiles}`);
      }
      if (fileRejections && fileRejections.length > 0) {
        if (fileRejections[0].errors[0].code === 'too-many-files') {
          setError(`The maximum number of files allowed is ${maxFiles}`);
        } else {
          setError(fileRejections[0].errors[0].message + fileRejectionHelperText);
        }
      }
    },
    [currentFiles, fileRejectionHelperText, files, maxFiles, name, setFieldValue, values],
  );

  useEffect(() => {
    if (values[name] && values[name].length) {
      setFileSync((prev) =>
        prev.map((item) => {
          const file: FileInfo | undefined = (item as FileInfo).locationUrl ? (item as FileInfo) : undefined;
          const s3File: S3Files | undefined = (item as S3Files).file ? (item as S3Files) : undefined;
          const image: Image = item as Image;
          if (file) return file;
          if (s3File) return s3File;
          else {
            let i = image;
            for (const value of values[name]) {
              const isImage: Image | undefined = (value as Image).croppedImageUrl ? (value as Image) : undefined;
              if (isImage && isImage.path === image.path) {
                i = isImage;
              }
            }
            return i;
          }
        }),
      );
      setFiles((prev) =>
        prev.map((item) => {
          let i = item;
          for (const value of values[name]) {
            const isImage: Image | undefined = (value as Image).croppedImageUrl ? (value as Image) : undefined;
            if (isImage && isImage.path === item.path) {
              i = { ...item, ...isImage };
            }
          }
          return i;
        }),
      );
    }
  }, [name, currentFiles, values, update]);

  useEffect(() => {
    if (values[name] === [] || values[name] === undefined) {
      setCurrentFiles([]);
      setFiles([]);
      setFileSync([]);
    }
  }, [name, values]);

  const removeFile = (fileIndex: number) => {
    const fileRemove = currentFiles[fileIndex];
    const updatedFiles: CurrentFiles[] = [];
    currentFiles.forEach((file) => {
      if (file.filename !== fileRemove.filename && file.filePosition !== undefined && file.filePosition < fileIndex)
        updatedFiles.push(file);
      else if (file.filename !== fileRemove.filename)
        updatedFiles.push({
          ...file,
          filePosition: file.filePosition !== undefined ? file.filePosition - 1 : undefined,
        });
    });
    const _files = [...files];
    const _fileSync = [...filesSync];
    if (fileRemove.fileType === 'new') {
      _files.splice(fileIndex - currentFiles.length, 1);
      setFiles([..._files]);
    } else {
      _fileSync.splice(fileIndex, 1);
      setFileSync([..._fileSync]);
    }
    updateFieldValues(updatedFiles);
    setError('');
  };

  const starFile = (fileIndex: number) => {
    const fileStar = currentFiles[fileIndex];
    const updatedFiles = cloneDeep(currentFiles).map((file) => {
      if (file.filename === fileStar.filename) {
        return { ...file, filePosition: 0 };
      } else if (file.filePosition !== undefined && file.filePosition < fileIndex) {
        return { ...file, filePosition: file.filePosition + 1 };
      } else return file;
    });
    const sortedFiles = sortFiles(updatedFiles);
    updateFieldValues(sortedFiles);
    setError('');
  };

  // eslint-disable-next-line object-shorthand
  const dropZoneConfig: DropzoneOptions = {
    onDrop,
    multiple: true,
    maxFiles,
    maxSize,
    noDragEventsBubbling: true,
    noClick: true,
    accept: fileFormat,
  };
  const { getRootProps, getInputProps, open } = useDropzone(dropZoneConfig);

  return (
    <StyledBox>
      <Box
        sx={{
          '&:hover': {
            border: '3px solid #757EF2',
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #757EF2;',
            padding: '13px',
          },
          ...containerSx,
        }}
        {...getRootProps({ className: 'dropZone' })}
        alignItems="center"
      >
        <input type="file" name={name} {...getInputProps()} />
        {renderTitle ? (
          renderTitle(open)
        ) : (
          <Typography variant="subtitle2" marginBottom={2}>
            Drag and drop or upload files from your library
          </Typography>
        )}
        {displayFiles(
          name,
          currentFiles,
          starFile,
          removeFile,
          renderFile,
          featured,
          addButtonInRender,
          open,
          renderFilesBoxProps,
        )}

        {renderButton ? (
          renderButton(open)
        ) : (
          <Button
            onClick={() => open()}
            className="buttonUpload"
            startIcon={<PIcon name="upLoadIcon" />}
            variant="contained"
          >
            Upload
          </Button>
        )}
      </Box>
      {error && <ErrorLabel errorText={error} />}
    </StyledBox>
  );
};

const displayFiles = (
  name: string,
  currentFiles: CurrentFiles[],
  starFile: (fileIndex: number) => void,
  removeFile: (fileIndex: number) => void,
  renderFile?: (file: CurrentFiles, onStarClick: () => void, onRemoveFileCLick: () => void) => React.ReactNode,
  featured?: boolean,
  addButtonInRender?: (openFilePicker: () => void) => React.ReactNode,
  open?: () => void,
  renderFilesBoxProps?: SxProps,
) => {
  return (
    currentFiles.length > 0 && (
      <Grid container spacing={2} justifyContent="center" wrap="wrap" sx={renderFilesBoxProps}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {currentFiles.map((file: any, index: number) => {
          const onStarClick = () => starFile(index);
          const onRemoveFileCLick = () => removeFile(index);
          const { values } = useFormikContext<{ [name: string]: Image[] | FileInfo[] | S3Files[] }>();

          values[name] &&
            values[name].some((val) => {
              const isImage: Image | undefined = (val as Image).croppedImageUrl ? (val as Image) : undefined;
              if (isImage && isImage.path === file.filename) file = { ...file, ...isImage };
            });

          return (
            <Box key={index} sx={{ padding: 2 }}>
              {renderFile ? (
                renderFile(file, onStarClick, onRemoveFileCLick)
              ) : (
                <>
                  <Box className="thumbnailCover">
                    <Thumbnail file={file} />
                    <IconButton onClick={onStarClick} sx={{ position: 'absolute' }} className="iconStarFile">
                      <PIcon
                        name="starIcon"
                        sx={{
                          display: featured ? 'inline-flex' : 'none',
                          backgroundColor: index ? 'white !important' : '#FFB400 !important',
                          color: index ? 'currentColor !important' : 'white !important',
                          borderRadius: '16px !important',
                          padding: '4px',
                        }}
                      />
                    </IconButton>
                    <IconButton onClick={onRemoveFileCLick} sx={{ position: 'absolute' }} className="iconRemoveFile">
                      <PIcon name="closeIcon" />
                    </IconButton>
                  </Box>
                  <Typography color={Colors.text.primary} sx={{ wordBreak: 'break-all' }} variant="caption">
                    {currentFiles[index].alteredName ? currentFiles[index].alteredName : file.filename}
                    {/* {file.filename} */}
                  </Typography>
                </>
              )}
            </Box>
          );
        })}
        {addButtonInRender && open && addButtonInRender(open)}
      </Grid>
    )
  );
};

// TODO Find why this is breaking
const Thumbnail = ({ file }: { file: CurrentFiles }) => {
  if (file.filename) {
    const nameArray = file.filename.split('.');
    const _name = nameArray[nameArray.length - 1];
    if (ImageTypes.includes(_name.toLowerCase()))
      return <StyledImg src={file.croppedImageUrl ? file.croppedImageUrl : file.imageUrl} />;
    else
      return (
        <Box position="relative" padding="0px">
          <Typography
            variant="body1"
            color="white"
            sx={{
              padding: 0,
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              margin: 0,
              transform: 'translateY(-50%)',
              width: '50.156px',
            }}
          >
            {_name.toUpperCase()}
          </Typography>
          <PIcon name="blankFileIcon" sx={{ objectFit: 'fill', color: 'primary.main' }} />
        </Box>
      );
  } else {
    return (
      <Box position="relative" padding="0px">
        <Typography
          variant="body1"
          color="white"
          sx={{
            padding: 0,
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            margin: 0,
            transform: 'translateY(-50%)',
            width: '50.156px',
          }}
        >
          undefined
        </Typography>
        <PIcon name="blankFileIcon" sx={{ objectFit: 'fill', color: 'primary.main' }} />
      </Box>
    );
  }
};
