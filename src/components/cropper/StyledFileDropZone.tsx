import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';
import { Point } from 'react-easy-crop';
import NewCropper from './NewCropper';
import { Camera } from '@mui/icons-material';
import PIcon from '../../images/PIcon';
import { CurrentFiles, FileDropZone } from '../FileDropZone';
import { StaffInfo } from '../../types';
import { Accept } from 'react-dropzone';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
const ImageTypes: Accept = {
  'application/images': ['.jpg', '.jpeg', '.png', '.tiff', '.gif', '.webp', '.avif', '.apng', '.svg', '.bmp', '.ico'],
};

export const StyledFileDropZone = ({ name }: { name: string }) => {
  const theme = useTheme();
  const { values, setFieldValue } = useFormikContext<Partial<StaffInfo>>();
  const [selectedImage, setSelectedImage] = useState<CurrentFiles>();
  const [update, setUpdate] = useState(false);

  const handleSelect = (img: CurrentFiles) => {
    const _image = values.images?.find((i) => i.path === img.filename);
    img = {
      ...img,
      crop: _image?.crop,
      zoom: _image?.zoom,
      rotation: _image?.rotation,
      croppedImageUrl: _image?.croppedImageUrl,
    };
    if (_image) setSelectedImage(img);
  };

  const handleCrop = (image: string, crop: Point, zoom: number, rotation: number, croppedImageUrl: string) => {
    if (values.images) {
      const newImageList = [...values.images];
      const imageIndex = values.images.findIndex((x) => x.path === image);
      const _item = values.images[imageIndex];
      _item.croppedImageUrl = croppedImageUrl;
      _item.crop = crop;
      _item.zoom = zoom;
      _item.rotation = rotation;
      newImageList[imageIndex] = _item;
      setFieldValue(`images[${imageIndex}]`, _item);
      setSelectedImage(undefined);
      setUpdate(!update);
    }
  };
  return (
    <FileDropZone
      fileFormat={ImageTypes}
      fileRejectionHelperText={`
      My app specifc helper text: Only images are allowed
      Notice how newlines are handled!
      `}
      update={update}
      renderTitle={() => {
        return (
          <Box position="relative" mb={6}>
            {selectedImage ? (
              <NewCropper
                image={selectedImage}
                onCancel={() => setSelectedImage(undefined)}
                setCroppedImageFor={handleCrop}
              />
            ) : (
              <Camera />
            )}
          </Box>
        );
      }}
      renderButton={(openFilePicker) => (
        <MyCustomButton key={values?.images?.length} selected={selectedImage ? true : false} onClick={openFilePicker} />
      )}
      renderFile={(file, onStarClick, onRemoveFileCLick) => (
        <MyFileRender
          key={values?.images?.length}
          selected={file.filename === selectedImage?.filename}
          file={file}
          onClick={handleSelect}
          onStarClick={onStarClick}
          onRemoveFileCLick={onRemoveFileCLick}
        />
      )}
      addButtonInRender={(onClick) => (
        <Box
          onClick={onClick}
          display="flex"
          justifyContent="center"
          sx={{
            height: '100px',
            width: '100px',
            border: `1px solid ${theme.palette.secondary.light}`,
            borderRadius: '10px',
            margin: '10px',
          }}
        >
          <Button variant="text" sx={{ height: '100px', width: '100%' }}>
            <PIcon name="plusSmall" sx={{ color: theme.palette.secondary.light }} />
          </Button>
        </Box>
      )}
      featured
      containerSx={{
        '&.dropZone': {
          background: theme.palette.background.default,
          borderColor: theme.palette.secondary.main,
          borderStyle: 'dashed',
          borderRadius: theme.spacing(2),
          paddingTop: theme.spacing(20),
        },
        '&:hover': {
          border: 'none',
        },
      }}
      name={name}
    />
  );
};

const MyCustomButton = ({ onClick, selected }: { onClick: () => void; selected?: boolean }) => {
  if (!selected)
    return (
      <Box display="flex" flexDirection="column">
        <Typography variant="h6" color="secondary" mb={3}>
          Drag & drop your images, or{' '}
          <SpanBtn onClick={onClick} sx={{ typography: { textDecoration: 'underline' } }}>
            Browse
          </SpanBtn>
        </Typography>
        <Typography variant="body1" color="secondary" mb={2}>
          Minimum 1600px width recommended. Max 10MB each.
        </Typography>
        <Typography variant="body1" color="secondary" mb={20}>
          Read our <u>photography guides here</u> to help make your collections really shine!
        </Typography>
      </Box>
    );
  else return <></>;
};

const SpanBtn = styled('span')(() => ({
  cursor: 'pointer',
}));

const MyFileRender = ({
  file,
  selected,
  onClick,
  onStarClick,
  onRemoveFileCLick,
}: {
  file: any;
  selected: boolean;
  onClick: (img: any) => void;
  onStarClick: () => void;
  onRemoveFileCLick: () => void;
}) => {
  const handleClick = () => {
    onClick(file);
  };

  const StyledImg = styled('img')(({ theme }) => ({
    height: 100,
    border: selected ? `10px solid ${theme.palette.primary.main}` : 'none',
    margin: selected ? '-10px' : 0,
    borderRadius: selected ? '12px' : '0px',
    marginBottom: selected ? '10px' : '18px',
  }));

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {file.imageUrl && (
        <StyledImg src={file.croppedImageUrl ? file.croppedImageUrl : file.imageUrl} onClick={handleClick} />
      )}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        flex={1}
        sx={{ borderRadius: selected ? '12px' : '0px' }}
      >
        <IconButton onClick={onRemoveFileCLick} color="secondary">
          <PIcon name="closeIcon" />
        </IconButton>
        {selected && (
          <Typography color="primary" sx={{ fontWeight: 800 }} onClick={onStarClick}>
            Feature
          </Typography>
        )}
      </Box>
    </Box>
  );
};
