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
};
export const PIcon = ({
  name,
  sx,
  size,
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
