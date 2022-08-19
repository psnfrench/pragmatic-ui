import { Box, Button, Grid, IconButton, styled, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Accept, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';
import { FileInfo, Image } from '../types';
import { PIcon } from '../images/PIcon';
import { Colors } from '../constants/Colors';
import { ErrorLabel } from './ErrorLabel';

const StyledBox = styled(Box)(({ theme }) => ({
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
  fileFormat: Accept;
  featured?: boolean;
  onFilesChange?: () => void;
};

export type CurrentFiles = {
  imageUrl?: string;
  filename: string;
  filePosition: number;
  fileType: 'new' | 'old';
};

const StyledImg = styled('img')(() => ({
  height: '58px',
  width: '100%',
  objectFit: 'cover',
  mask: 'linear-gradient(-45deg, transparent 8px, #ddd 0) bottom right',
}));

export const FileDropZone = (props: FileUploaderProps) => {
  const { name, maxFiles = 0, maxSize, fileFormat, featured, awsUrl } = props;
  const { setFieldValue, values } = useFormikContext<{ [name: string]: Image[] | FileInfo[] }>();
  const [files, setFiles] = useState<File[]>([]);
  const [filesSync, setFileSync] = useState<(Image | FileInfo)[]>(get(values, name, []));
  const [currentFiles, setCurrentFiles] = useState<CurrentFiles[]>(
    get(values, name, []).map((value: FileInfo | Image, index: number) => {
      const file: FileInfo | undefined = (value as FileInfo).locationUrl ? (value as FileInfo) : undefined;
      const image: Image = value as Image;
      if (file) {
        return {
          imageUrl: file.locationUrl,
          filename: file.origFileName,
          filePosition: index,
          fileType: 'old',
        };
      } else {
        return {
          imageUrl: awsUrl ? awsUrl + '/' + image.path : image.path,
          filename: image.filename,
          filePosition: index,
          fileType: 'old',
        };
      }
    }),
  );

  const [error, setError] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Do something with the files
      const numberOfFiles = currentFiles.length + acceptedFiles.length;
      if ((numberOfFiles <= maxFiles && maxFiles !== 0) || maxFiles === 0) {
        const newCurrentFiles: CurrentFiles[] = acceptedFiles.map((_file, index) => ({
          imageUrl: URL.createObjectURL(_file),
          filename: _file.name,
          filePosition: index + files.length,
          fileType: 'new',
        }));
        setCurrentFiles([...currentFiles, ...newCurrentFiles]);
        setFiles([...files, ...acceptedFiles]);
        setError('');
      } else {
        setError(`The maximum number of files allowed is ${maxFiles}`);
      }
      if (fileRejections && fileRejections.length > 0) {
        if (fileRejections[0].errors[0].code === 'too-many-files') {
          setError(`The maximum number of files allowed is ${maxFiles}`);
        } else {
          setError(fileRejections[0].errors[0].message);
        }
      }
    },
    [currentFiles, files, maxFiles],
  );

  useEffect(() => {
    setFieldValue('files', [...files]);
  }, [files, setFieldValue]);

  useEffect(() => {
    setFieldValue(name, [...filesSync]);
  }, [filesSync, name, setFieldValue]);

  const removeFile = (fileIndex: number) => {
    const fileRemove = currentFiles[fileIndex];
    if (fileRemove.fileType === 'new') {
      const _files = [...files];
      _files.splice(fileIndex, 1);
      setFiles([..._files]);
    } else {
      const _fileSync = [...filesSync];
      _fileSync.splice(fileIndex, 1);
      setFileSync([..._fileSync]);
    }
    const _fileSelected = [...currentFiles];
    _fileSelected.splice(fileIndex, 1);
    setCurrentFiles([..._fileSelected]);
    setError('');
  };

  const starFile = (fileIndex: number) => {
    const fileStar = currentFiles[fileIndex];
    if (fileStar.fileType === 'new') {
      const _files = [...files];
      _files.splice(fileIndex, 1);
      setFiles([files[fileIndex], ..._files]);
    } else {
      const _fileSync = [...filesSync];
      _fileSync.splice(fileIndex, 1);
      setFileSync([filesSync[fileIndex], ..._fileSync]);
    }
    const _fileSelected = [...currentFiles];
    _fileSelected.splice(fileIndex, 1);
    setCurrentFiles([fileStar, ..._fileSelected]);
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
        }}
        {...getRootProps({ className: 'dropZone' })}
        alignItems="center"
      >
        <input type="file" name={name} {...getInputProps()} />
        <Typography variant="subtitle2" marginBottom={2}>
          Drag and drop or upload files from your library
        </Typography>
        {currentFiles.length > 0 && (
          <Grid container spacing={2} justifyContent="space-around">
            {currentFiles.map((file, index) => (
              <Grid item xs={6} key={index}>
                <Box className="thumbnailCover">
                  <Thumbnail file={file} />
                  <IconButton
                    onClick={() => {
                      starFile(index);
                    }}
                    sx={{ position: 'absolute' }}
                    className="iconStarFile"
                  >
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
                  <IconButton
                    onClick={() => {
                      removeFile(index);
                    }}
                    sx={{ position: 'absolute' }}
                    className="iconRemoveFile"
                  >
                    <PIcon name="closeIcon" />
                  </IconButton>
                </Box>
                <Typography color={Colors.text.primary} sx={{ wordBreak: 'break-all' }} variant="caption">
                  {file.filename}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
        <Button
          onClick={() => open()}
          className="buttonUpload"
          startIcon={<PIcon name="upLoadIcon" />}
          variant="contained"
        >
          Upload
        </Button>
      </Box>
      {error && <ErrorLabel errorText={error} />}
    </StyledBox>
  );
};

const Thumbnail = ({ file }: { file: CurrentFiles }) => {
  const nameArray = file.filename.split('.');
  const _name = nameArray[nameArray.length - 1];
  if (_name === 'pdf') return <PIcon sx={{ display: 'block' }} name="pdfFileIcon" />;
  else if (file.imageUrl) return <StyledImg src={file.imageUrl} />;
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
          {_name}
        </Typography>
        <PIcon name="blankFileIcon" sx={{ objectFit: 'fill' }} />
      </Box>
    );
};
