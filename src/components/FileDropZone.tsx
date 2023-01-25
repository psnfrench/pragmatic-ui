import { Box, Button, Grid, IconButton, styled, SxProps, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Accept, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';
import { FileInfo, Image, S3Files } from '../types';
import { PIcon } from '../images/PIcon';
import { Colors } from '../constants/Colors';
import { ErrorLabel } from './ErrorLabel';

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
  renderTitle?: () => React.ReactNode;
  renderButton?: (openFilePicker: () => void) => React.ReactNode;
  renderFile?: (file: CurrentFiles, onStarClick: () => void, onRemoveFileCLick: () => void) => React.ReactNode;
  addButtonInRender?: (openFilePicker: () => void) => React.ReactNode;
  update?: boolean;
};

export type CurrentFileImage = Partial<Pick<Image, 'crop' | 'rotation' | 'zoom' | 'croppedImageUrl'>> & {
  path?: string;
};

export type CurrentFiles = {
  imageUrl?: string;
  alteredName?: string;
  filename: string;
  filePosition: number;
  fileType: 'new' | 'old';
  crop?: { x: number; y: number };
  zoom?: number;
  rotation?: number;
  croppedImageUrl?: string;
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
            filePosition: index,
            fileType: 'old',
          };
        } else if (s3File) {
          return {
            imageUrl: awsUrl ? awsUrl + (s3File.file as Image).path : (s3File.file as Image).path,
            filename: (s3File.file as Image).filename,
            filePosition: index,
            fileType: 'old',
            alteredName: s3File.alteredName,
          };
        } else {
          return {
            imageUrl: image.signedUrl ? image.signedUrl : awsUrl ? awsUrl + image.path : image.path,
            filename: image.filename,
            filePosition: index,
            fileType: 'old',
            crop: image.crop,
            zoom: image.zoom,
            rotation: image.rotation,
            croppedImageUrl: image.croppedImageUrl,
          };
        }
      },
    );
    return files;
  }, [awsUrl, name, values]);
  const [currentFiles, setCurrentFiles] = useState<CurrentFiles[]>(getCurrentFiles());

  const [error, setError] = useState('');

  const updateFieldValues = useCallback(
    (files: (File & CurrentFileImage)[], filesSync: (Image | FileInfo | (File & CurrentFileImage) | S3Files)[]) => {
      console.log('Hi');
      setFieldValue(name, [...filesSync, ...files]);
    },
    [name, setFieldValue],
  );

  useEffect(() => {
    console.log('files', files);
  }, [files]);

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
        updateFieldValues([...files, ...acceptedFiles], filesSync);
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
    [currentFiles, files, filesSync, maxFiles, updateFieldValues],
  );

  useEffect(() => {
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
              console.log('isImage', isImage);
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
  }, [name, currentFiles, values, update]);

  const removeFile = (fileIndex: number) => {
    const fileRemove = currentFiles[fileIndex];
    const _files = [...files];
    const _fileSync = [...filesSync];
    if (fileRemove.fileType === 'new') {
      _files.splice(fileIndex - currentFiles.length, 1);
      setFiles([..._files]);
    } else {
      _fileSync.splice(fileIndex, 1);
      setFileSync([..._fileSync]);
    }
    const _fileSelected = [...currentFiles];
    _fileSelected.splice(fileIndex, 1);
    setCurrentFiles([..._fileSelected]);
    setError('');
    updateFieldValues([..._files], [..._fileSync]);
  };

  const starFile = (fileIndex: number) => {
    const fileStar = currentFiles[fileIndex];
    if (fileStar.fileType === 'new') {
      setError('Can only select existing items to be first. Coming in future update');
    } else {
      const _fileSync = [...filesSync];
      _fileSync.splice(fileIndex, 1);
      setFileSync([filesSync[fileIndex], ..._fileSync]);
      const _fileSelected = [...currentFiles];
      _fileSelected.splice(fileIndex, 1);
      setCurrentFiles([fileStar, ..._fileSelected]);
      setError('');
      updateFieldValues(files, [filesSync[fileIndex], ..._fileSync]);
    }
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
          renderTitle()
        ) : (
          <Typography variant="subtitle2" marginBottom={2}>
            Drag and drop or upload files from your library
          </Typography>
        )}
        {displayFiles(name, currentFiles, starFile, removeFile, renderFile, featured, addButtonInRender, open)}

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
) => {
  return (
    currentFiles.length > 0 && (
      <Grid container spacing={2} justifyContent="center" wrap="wrap">
        {currentFiles.map((file, index) => {
          const onStarClick = () => starFile(index);
          const onRemoveFileCLick = () => removeFile(index);
          const { values } = useFormikContext<{ [name: string]: Image[] | FileInfo[] | S3Files[] }>();

          values[name].some((val) => {
            const isImage: Image | undefined = (val as Image).croppedImageUrl ? (val as Image) : undefined;
            console.log('Hi');
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
    console.log(file.croppedImageUrl);
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
