import React from 'react';
import Slider from 'react-slick';
import { Box, styled, Typography } from '@mui/material';

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
  headerVariant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | undefined;
  bodyVariant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | undefined;
  children?: React.ReactNode;
};

export type CustomSliderItem = {
  headerText?: string;
  bodyText?: string;
  image: React.FC<{}>;
  headerColor?: string;
  bodyColor?: string;
};

export const CustomSlider = ({ items, headerVariant, bodyVariant, children, ...otherProps }: CustomSliderProps) => {
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
    <React.Fragment>
      <Slider {...updatedSettings}>
        {items.map((item, key) => (
          <StyledBox
            key={key}
            className="sliderContainer"
            sx={{ marginTop: '260px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <StyledBox className="imageSlider" marginBottom={4}>
              <item.image />
            </StyledBox>
            <StyledBox className="textSlider">
              <Typography color={item.headerColor} variant={headerVariant} marginBottom={3.5}>
                {item.headerText}
              </Typography>
              <Typography color={item.bodyColor} variant={bodyVariant}>
                {item.bodyText}
              </Typography>
            </StyledBox>
          </StyledBox>
        ))}
      </Slider>
    </React.Fragment>
  );
};
