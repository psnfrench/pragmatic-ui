import { Box } from '@mui/material';
import React from 'react';
import { OnBoardingCarosel } from '../components/OnBoardingCarosel';
import slider_1 from '../images/slider_1';
import slider_2 from '../images/slider_2';
import slider_3 from '../images/slider_3';
const ImageTopLeft = require('../images/background_img_top.png');
const ImageBottomRight = require('../images/background_img_bottom.png');

const items = [
  { headerText: 'Slider 1', bodyText: 'Body 1', image: slider_1 },
  { headerText: 'Slider 2', bodyText: 'Body 2', image: slider_2 },
  { headerText: 'Slider 3', bodyText: 'Body 3', image: slider_3 },
];

const SliderDemo = () => {
  return (
    <Box sx={{ width: '45%' }}>
      <OnBoardingCarosel
        items={items}
        imageBottomLeft={ImageBottomRight}
        imageBottomRight={ImageBottomRight}
        imageTopLeft={ImageTopLeft}
        imageTopRight={ImageTopLeft}
      />
    </Box>
  );
};

export default SliderDemo;
