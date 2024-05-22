import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';
import { menuItemType } from './PComplexFilter';
import { Search } from '../Search';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Popper, { PopperProps } from '@mui/material/Popper';
import Paper, { PaperProps } from '@mui/material/Paper';
import { TextFieldProps } from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import PIcon from '../../images/PIcon';

const StyledRadio = styled(Radio)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: '24px',
  width: '24px',
  marginRight: theme.spacing(1),
}));

export type ComplexFilterPaperProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  id: string;
  popperProps?: PopperProps;
  paperProps?: PaperProps;
  titleProps?: TypographyProps;
  currentTitle?: string;
  back: boolean;
  backButton?: React.ReactNode;
  backButtonProps?: ButtonProps;
  searchable?: boolean;
  handleBack: () => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleSelected: (menuItem: menuItemType, parent?: menuItemType) => void;
  filteredItems: menuItemType[];
  itemHeight: number;
  maxItems: number;
  listItemProps?: RadioProps;
  searchProps?: Omit<TextFieldProps, 'InputProps'>;
  filterParent?: menuItemType;
  countSelected: (items: menuItemType[], count?: number) => number;
};

const ComplexFilterPaper = ({
  open,
  anchorEl,
  id,
  popperProps,
  paperProps,
  titleProps,
  currentTitle,
  back,
  backButton,
  backButtonProps,
  searchable,
  handleBack,
  handleSearchChange,
  handleSelected,
  filteredItems,
  itemHeight,
  maxItems,
  listItemProps,
  searchProps,
  filterParent,
  countSelected,
}: ComplexFilterPaperProps) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      id={id}
      className="popper"
      sx={{ zIndex: 99999, width: '40ch' }}
      {...popperProps}
    >
      <Paper
        {...paperProps}
        sx={{
          marginTop: '12px',
          borderRadius: 0,
          boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
          filter: 'drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.14)) drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.12))',
          ...paperProps?.sx,
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center" padding={2} flex={1}>
          <Typography variant="h6" flex={1} {...titleProps}>
            {currentTitle}
          </Typography>
          {back ? (
            <Button onClick={handleBack} {...backButtonProps}>
              {backButton}
            </Button>
          ) : null}
        </Box>
        {filteredItems.length > 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              maxHeight: itemHeight * maxItems,
              overflow: 'auto',
            }}
          >
            {searchable ? (
              <Box sx={{ paddingX: 2, paddingY: 0 }}>
                <Search fullWidth onChange={handleSearchChange} {...searchProps} />
              </Box>
            ) : null}
            {filteredItems &&
              filteredItems.map((menuItem, index) =>
                menuItem.children ? (
                  <React.Fragment key={index}>
                    <Button
                      key={menuItem.text}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: itemHeight,
                        alignContent: 'center',
                        padding: 4,
                        borderRadius: 0,
                      }}
                      onClick={() => {
                        handleSelected(menuItem, filterParent);
                      }}
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        flex={1}
                        justifyContent="space-between"
                      >
                        <Box display="flex" flexDirection="column" flex={1}>
                          <Typography variant="body1" color="primary.main" textAlign="left">
                            {menuItem.text}
                          </Typography>
                          {menuItem.secondary && (
                            <Typography variant="body2" color="action.active" textAlign="left">
                              {menuItem.secondary}
                            </Typography>
                          )}
                        </Box>
                        <StyledAvatar
                          sx={{
                            display: countSelected(menuItem.children) === 0 ? 'none' : 'inline-flex',
                          }}
                        >
                          <Typography variant="body1" color="primary.contrastText">
                            {countSelected(menuItem.children)}
                          </Typography>
                        </StyledAvatar>
                      </Box>
                      <PIcon name="chevronRight" />
                    </Button>
                    <Box marginLeft={2} marginRight={2}>
                      <Divider
                        sx={{
                          width: '100%',
                          margin: 0,
                          display: index === filteredItems.length - 1 ? 'none' : 'block',
                        }}
                      />
                    </Box>
                  </React.Fragment>
                ) : (
                  <FormControlLabel
                    key={menuItem.text}
                    sx={{
                      margin: 1,
                      height: itemHeight,
                      alignContent: 'center',
                    }}
                    control={
                      (filterParent as menuItemType).multiple ? (
                        <StyledCheckbox
                          sx={{ marginY: -4 }}
                          checked={menuItem.selected || false}
                          onClick={() => handleSelected(menuItem, filterParent)}
                          name={menuItem.text}
                          value={menuItem}
                          {...listItemProps}
                        />
                      ) : (
                        <StyledRadio
                          sx={{ marginY: -4 }}
                          checked={menuItem.selected || false}
                          onClick={() => handleSelected(menuItem, filterParent)}
                          name={menuItem.text}
                          value={menuItem}
                          {...listItemProps}
                        />
                      )
                    }
                    label={
                      <React.Fragment>
                        <Typography variant="body1" color={menuItem.selected ? 'primary.main' : 'text.primary'}>
                          {menuItem.text}
                        </Typography>
                        {menuItem.secondary && (
                          <Typography variant="body2" color="action.active">
                            {menuItem.secondary}
                          </Typography>
                        )}
                      </React.Fragment>
                    }
                  />
                ),
              )}
          </Box>
        ) : null}
      </Paper>
    </Popper>
  );
};

export default ComplexFilterPaper;
