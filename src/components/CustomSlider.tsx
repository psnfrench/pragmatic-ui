import React from 'react';
import Slider, { Settings } from 'react-slick';
import { Box, BoxProps, styled, Typography, TypographyTypeMap } from '@mui/material';

const StyledBox = styled(Box)(() => ({
  '& .sliderContainer': {
    marginTop: '260px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  '& .imageSlider': {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '350px',
  },
  '& .textSlider': {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '350px',
  },
}));

export type CustomSliderProps = {
  items: CustomSliderItem[];
  children?: React.ReactNode;
} & Settings;

export type CustomSliderItem = {
  headerText?: string;
  bodyText?: string;
  image: React.ReactNode;
  headerColor?: string;
  bodyColor?: string;
  headerVariant?: TypographyTypeMap['props']['variant'];
  bodyVariant?: TypographyTypeMap['props']['variant'];
  sliderBoxProps?: BoxProps;
};

export const CustomSlider = ({ items, ...otherProps }: CustomSliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 7000,
    arrows: false,
    cssEase: 'linear',
  };

  const updatedSettings = { ...settings, ...otherProps };

  return (
    <Slider {...updatedSettings}>
      {items.map((item, key) => {
        return (
          <StyledBox
            key={key}
            className="sliderContainer"
            sx={{ marginTop: '260px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
            {...item.sliderBoxProps}
          >
            <StyledBox className="imageSlider" marginBottom={4}>
              {item.image}
            </StyledBox>
            <StyledBox className="textSlider">
              <Typography color={item.headerColor} variant={item.headerVariant} marginBottom={3.5}>
                {item.headerText}
              </Typography>
              <Typography color={item.bodyColor} variant={item.bodyVariant}>
                {item.bodyText}
              </Typography>
            </StyledBox>
          </StyledBox>
        );
      })}
    </Slider>
  );
};
