import React from 'react';
import { Box, styled } from '@mui/material';
import { CustomSlider, CustomSliderItem } from './CustomSlider';
// import '~slick-carousel/slick/slick.css';
// import '~slick-carousel/slick/slick-theme.css';

const StyledBox = styled(Box)(() => ({
  '& .container': {
    width: '100%',
    height: '100vh',
    minHeight: '1040px',
    background: '#4938A6',
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
    position: 'absolute',
    bottom: '0px',
  },
  '& .imageBottomRight': {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
  },
}));

export type OnBoardingCarouselProps = {
  items: CustomSliderItem[];
  imageTopLeft?: string;
  imageTopRight?: string;
  imageBottomLeft?: string;
  imageBottomRight?: string;
  children?: React.ReactNode;
};

export const OnBoardingCarosel = ({
  items,
  imageTopLeft,
  imageTopRight,
  imageBottomLeft,
  imageBottomRight,
  children,
  ...otherProps
}: OnBoardingCarouselProps) => {
  return (
    <StyledBox className="container">
      <StyledBox className="imageTopLeft">
        <img src={imageTopLeft} />
      </StyledBox>
      <StyledBox className="imageTopRight">
        <img src={imageTopRight} />
      </StyledBox>
      <CustomSlider items={items} children={children} {...otherProps} />
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
