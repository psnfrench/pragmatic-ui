import { CustomSliderItem } from '../components/CustomSlider';
import { ReactComponent as Slider1 } from '../images/slider1.svg';
import { ReactComponent as Slider2 } from '../images/slider2.svg';
import { ReactComponent as Slider3 } from '../images/slider3.svg';

export const items: CustomSliderItem[] = [
  {
    headerText: 'Slider 1',
    bodyText: 'Body 1',
    image: <Slider1 />,
    headerVariant: 'h3',
    bodyColor: 'red',
    headerColor: 'red',
  },
  {
    headerText: 'Slider 2',
    bodyText: 'Body 2',
    image: <Slider2 />,
    headerVariant: 'h1',
    bodyColor: 'white',
    headerColor: 'red',
  },
  {
    headerText: 'Slider 3',
    bodyText: 'Body 3',
    image: <Slider3 />,
    headerVariant: 'h5',
    bodyColor: 'red',
    headerColor: 'white',
  },
];
