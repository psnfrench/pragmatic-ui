import React from 'react';
import { Box, SxProps, Theme } from '@mui/system';
import SearchIcon from './icons/search';
import AddIcon from './icons/add';
import ChevronLeft from './icons/chevronLeft';
import ChevronRight from './icons/chevronRight';
import UpLoadIcon from './icons/upload';
import PDFFileIcon from './icons/pdfFileIcon';
import CloseIcon from './icons/closeIcon';
import IconCloseTag from './icons/iconCloseTag';
import PenIcon from './icons/pen';
import DownloadIcon from './icons/download';
import PhoneIcon from './icons/phone';
import GiftIcon from './icons/gift';
import HashTagIcon from './icons/hashTag';
import CalendarIcon from './icons/calendar';
import DashboardIcon from './icons/dashboard';
import StaffIcon from './icons/staff';
import CompanyIcon from './icons/company';
import TrainingIcon from './icons/training';
import LogoutIcon from './icons/logout';
import ClockIcon from './icons/clock';
import ChevronDownIcon from './icons/chevronDown';
import ChevronUpIcon from './icons/chevronUp';
import FilterIcon from './icons/filterIcon';
import CrossSmallIcon from './icons/crossSmall';
import StarIcon from './icons/star';
import BlankFileIcon from './icons/blankFileIcon';
import Rotate from './icons/rotate';
import RotateCube from './icons/rotateCube';
import PlusSmall from './icons/plusSmall';
import MinusIcon from './icons/minusIcon';
import MenuIcon from './icons/menu';
import Check from './icons/check';
import Cross from './icons/cross';
import EyeOpen from './icons/eyeOpen';
import EyeClosed from './icons/eyeClosed';

export const customIconMap = {
  searchIcon: SearchIcon,
  addIcon: AddIcon,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  upLoadIcon: UpLoadIcon,
  pdfFileIcon: PDFFileIcon,
  closeIcon: CloseIcon,
  iconCloseTag: IconCloseTag,
  penIcon: PenIcon,
  downloadIcon: DownloadIcon,
  phoneIcon: PhoneIcon,
  giftIcon: GiftIcon,
  hashTagIcon: HashTagIcon,
  calendarIcon: CalendarIcon,
  dashboardIcon: DashboardIcon,
  staffIcon: StaffIcon,
  companyIcon: CompanyIcon,
  trainingIcon: TrainingIcon,
  logoutIcon: LogoutIcon,
  clockIcon: ClockIcon,
  chevronDownIcon: ChevronDownIcon,
  chevronUpIcon: ChevronUpIcon,
  filterIcon: FilterIcon,
  crossSmallIcon: CrossSmallIcon,
  starIcon: StarIcon,
  blankFileIcon: BlankFileIcon,
  rotate: Rotate,
  rotateCube: RotateCube,
  plusSmall: PlusSmall,
  minusIcon: MinusIcon,
  check: Check,
  cross: Cross,
  menu: MenuIcon,
  eyeOpen: EyeOpen,
  eyeClosed: EyeClosed,
};
export const PIcon = ({
  name,
  sx,
  size = 24,
  className,
}: {
  name: keyof typeof customIconMap;
  sx?: SxProps<Theme>;
  size?: number;
  className?: string;
}) => {
  const MyComponent = customIconMap[name];
  return (
    <Box className={className ? className : ''} display="flex" sx={{ width: size, height: size, ...sx }}>
      <MyComponent />
    </Box>
  );
};

export default PIcon;
