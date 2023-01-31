import React, { useEffect, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { styled, Box, Button, Slider, Grid } from '@mui/material';
import { Image } from '../../types';
import getCroppedImg from './createimage';
import RotateCorner from './RotateCorner';
import PIcon from '../../images/PIcon';
import { CurrentFiles } from '../FileDropZone';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  '& .container': {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '407px',
    height: '344px',
    marginBottom: '40px',
  },
  '& .controls': {
    position: 'absolute',
    width: '330px',
    bottom: 0,
  },
  '& .slider': {
    justifyContent: 'space-between',
    alignContent: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: '12px',
  },
  '& .reactEasyCrop_Container': {
    borderRadius: '12px',
    border: 'none',
  },
  '& .button-area': {
    paddingTop: '20px',
    width: '100%',
    p: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  '& .button': {
    borderRadius: '100%',
    height: '32px',
    minWidth: '32px',
    width: '32px',
  },
  '& .reactEasyCrop_CropArea': {
    borderRadius: '12px',
  },
}));

type Props = {
  image: CurrentFiles & Pick<Image, 'crop' | 'rotation' | 'zoom'>;
  onCancel: () => void;
  setCroppedImageFor: (image: string, crop: Point, zoom: number, rotation: number, croppedImageUrl: string) => void;
};

const NewCropper = ({ image, onCancel, setCroppedImageFor }: Props) => {
  if (image.zoom === undefined) image.zoom = 1;
  if (image.crop === undefined) image.crop = { x: 0, y: 0 };
  if (image.rotation === undefined) image.rotation = 0;
  const [zoom, setZoom] = useState(image.zoom);
  const [crop, setCrop] = useState(image.crop);
  const [rotation, setRotation] = useState(image.rotation);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [cropperDimesions, setCropperDimesions] = useState<{ height: number; width: number }>({ height: 0, width: 0 });

  const onCropChange = (location: Point) => {
    setCrop(location);
  };

  const onZoomChange = (val: number) => {
    setZoom(val);
  };

  const onCropComplete = (_croppedArea: Area, _croppedAreaPixels: Area) => {
    setCroppedAreaPixels(_croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels as Area, rotation, true);
    setCroppedImageFor(image?.filename as string, crop, zoom, rotation, croppedImageUrl as string);
  };

  const onRotationChange = (rotate: number) => {
    setRotation(rotate);
  };

  const onReset = () => {
    if (image.zoom === undefined) image.zoom = 1;
    if (image.crop === undefined) image.crop = { x: 0, y: 0 };
    if (image.rotation === undefined) image.rotation = 0;
    setCrop(image.crop);
    setZoom(image.zoom);
    setRotation(image.rotation);
  };

  const CropArea = document.getElementsByClassName('reactEasyCrop_CropArea')[0];
  useEffect(() => {
    if (CropArea) setCropperDimesions({ height: CropArea.clientHeight, width: CropArea.clientWidth });
  }, [CropArea, rotation]);

  return (
    <StyledBox>
      <Box className="container">
        <Box position="relative" sx={{ zIndex: 1200 }}>
          <RotateCorner setRotate={setRotation} height={cropperDimesions.height} width={cropperDimesions.width} />
        </Box>
        <Cropper
          image={image.imageUrl}
          zoom={zoom}
          crop={crop}
          aspect={4 / 3}
          rotation={rotation}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
          onRotationChange={onRotationChange}
          objectFit="contain"
          showGrid={false}
          style={{ containerStyle: { backfaceVisibility: 'hidden', backgroundColor: 'black' } }}
        />
      </Box>
      <Box className="controls">
        <Box className="slider">
          <Grid container spacing={1}>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="center"
              sx={{ opacity: zoom >= 1.1 ? 1 : 0.5 }}
              onClick={() => zoom >= 1.1 && setZoom((prev) => prev - 0.1)}
            >
              <PIcon name="minusIcon" />
            </Grid>
            <Grid item xs={8}>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(Number(zoom))}
                classes={{ root: 'slider' }}
              />
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="center"
              sx={{ opacity: zoom <= 2.9 ? 1 : 0.5 }}
              onClick={() => zoom <= 2.9 && setZoom((prev) => prev + 0.1)}
            >
              <PIcon name="plusSmall" />
            </Grid>
          </Grid>
        </Box>
        <Box className="button-area">
          <Button className="button" variant="contained" size="small" onClick={onCancel}>
            <PIcon name="cross" />
          </Button>
          <Button className="button" variant="contained" size="small" onClick={onReset}>
            <PIcon name="rotate" />
          </Button>
          <Button className="button" variant="contained" size="small" onClick={onCrop}>
            <PIcon name="check" />
          </Button>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default NewCropper;
