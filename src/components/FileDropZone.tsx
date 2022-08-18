import { Box, Button, Grid, IconButton, styled, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { ErrorLabel } from './ErrorLabel';
import React, { useCallback, useEffect, useState } from 'react';
import { Accept, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';
import { FileInfo } from '../types';
import { OverridesColors } from '../pegasus/Colors';
import { PIcon } from '../images/PIcon';

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
  maxFiles?: number;
  maxSize?: number;
  fileFormat: Accept;
  featured?: boolean;

  onFilesChange?: () => void;
};

export type FileSelected = {
  fileName: string;
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
  const { setFieldValue, values } = useFormikContext();
  const { name, maxFiles = 0, maxSize, fileFormat, featured } = props;
  const [files, setFiles] = useState<File[]>([]);
  const [filesSync, setFileSync] = useState<FileInfo[]>(get(values, name, []));
  const [fileSelected, setFileSelected] = useState<FileSelected[]>(
    get(values, name, []).map((file: FileInfo, index: number) => ({
      fileName: file.origFileName,
      filePosition: index,
      fileType: 'old',
    })),
  );

  const [error, setError] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Do something with the files
      const numberOfFiles = fileSelected.length + acceptedFiles.length;
      if ((numberOfFiles <= maxFiles && maxFiles !== 0) || maxFiles === 0) {
        const newFileSelected: FileSelected[] = acceptedFiles.map((_file, index) => ({
          fileName: _file.name,
          filePosition: index + files.length,
          fileType: 'new',
        }));
        console.log(acceptedFiles);
        setFileSelected([...fileSelected, ...newFileSelected]);
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
    [fileSelected, files, maxFiles],
  );

  useEffect(() => {
    setFieldValue('files', [...files]);
  }, [files, setFieldValue]);

  useEffect(() => {
    setFieldValue(name, [...filesSync]);
  }, [filesSync, name, setFieldValue]);

  const removeFile = (fileIndex: number) => {
    const fileRemove = fileSelected[fileIndex];
    if (fileRemove.fileType === 'new') {
      const _files = [...files];
      _files.splice(fileRemove.filePosition, 1);
      setFiles([..._files]);
    } else {
      const _fileSync = [...filesSync];
      _fileSync.splice(fileRemove.filePosition, 1);
      setFileSync([..._fileSync]);
    }
    const _fileSelected = [...fileSelected];
    _fileSelected.splice(fileIndex, 1);
    setFileSelected([..._fileSelected]);
    setError('');
  };

  const starFile = (fileIndex: number) => {
    const fileStar = fileSelected[fileIndex];
    const _fileSelected = [...fileSelected];
    _fileSelected.splice(fileIndex, 1);
    setFileSelected([fileStar, ..._fileSelected]);
    const _fileStar = files[fileIndex];
    const _files = [...files];
    _files.splice(fileIndex, 1);
    setFiles([_fileStar, ..._files]);
    setError('');
  };

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
        {fileSelected.length > 0 && (
          <Grid container spacing={2} justifyContent="space-around">
            {fileSelected.map((file, index) => (
              <Grid item xs={6} key={index}>
                <Box className="thumbnailCover">
                  <>
                    {name.includes('.pdf') ? (
                      <PIcon sx={{ display: 'block' }} name="pdfFileIcon" />
                    ) : (
                      <StyledImg src={URL.createObjectURL(files[index])} />
                      // (files[index].type
                    )}
                  </>
                  <IconButton
                    onClick={() => {
                      index && starFile(index);
                    }}
                    sx={{ position: 'absolute' }}
                    className="iconStarFile"
                  >
                    <PIcon
                      name="starIcon"
                      sx={{
                        display: featured ? 'inline-flex' : 'none',
                        backgroundColor: index ? 'white' : '#FFB400',
                        color: index ? 'currentColor' : 'white',
                        borderRadius: 16,
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
                <Typography color={OverridesColors.text.primary} sx={{ wordBreak: 'break-all' }} variant="caption">
                  {file.fileName}
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
