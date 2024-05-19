import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { CustomSlider, CustomSliderProps } from './CustomSlider';

const StyledBox = styled(Box)(() => ({
  '& .container': {
    width: '100%',
    height: '100vh',
    minHeight: '1040px',
    position: 'relative',
  },
  '& .imageTopLeft': {
    position: 'absolute',
    top: '0px',
  },
  '& .imageTopRight': {
    position: 'absolute',
    top: '0px',
    right: '0px',
  },
  '& .imageBottomLeft': {
    marginBottom: '-4px',
    position: 'absolute',
    bottom: '0px',
  },
  '& .imageBottomRight': {
    marginBottom: '-4px',
    position: 'absolute',
    bottom: '0px',
    right: '0px',
  },
}));

export type OnBoardingCarouselProps = {
  imageTopLeft?: string;
  imageTopRight?: string;
  imageBottomLeft?: string;
  imageBottomRight?: string;
  containerProps?: BoxProps;
} & CustomSliderProps;

export const OnBoardingCarosel = ({
  containerProps,
  items,
  imageTopLeft,
  imageTopRight,
  imageBottomLeft,
  imageBottomRight,
  children,
  ...otherProps
}: OnBoardingCarouselProps) => {
  return (
    <StyledBox className="container" {...containerProps}>
      <StyledBox className="imageTopLeft">
        <img src={imageTopLeft} />
      </StyledBox>
      <StyledBox className="imageTopRight">
        <img src={imageTopRight} />
      </StyledBox>
      <CustomSlider items={items} {...otherProps}>
        {children}
      </CustomSlider>
      <StyledBox className="imageBottomLeft">
        <img src={imageBottomLeft} />
      </StyledBox>
      <StyledBox className="imageBottomRight">
        <img src={imageBottomRight} />
      </StyledBox>
    </StyledBox>
  );
};

export default OnBoardingCarosel;
