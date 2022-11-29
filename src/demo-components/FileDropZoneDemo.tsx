import { Box, Divider, Typography, Button } from '@mui/material';
import React from 'react';
import { CurrentFiles, FileDropZone } from '../components/FileDropZone';

const FileDropZoneDemo = () => {
  return (
    <Box>
      <Typography variant="h4">Standard File Dropzone</Typography>
      <Divider />
      <FileDropZone name="downloads" maxFiles={0} featured />

      <br />

      <Typography variant="h4">Customised File Dropzone</Typography>
      <Divider />
      <FileDropZone
        name="downloads"
        maxFiles={0}
        featured
        renderTitle={MyCustomTitle}
        renderButton={(openFilePicker) => <MyCustomButton onClick={openFilePicker} />}
        renderFile={(file, onStarClick, onRemoveFileCLick) => (
          <MyFileRender file={file} onStarClick={onStarClick} onRemoveFileCLick={onRemoveFileCLick} />
        )}
        containerSx={{
          '&:hover': {
            border: 'none',
          },
        }}
      />

      <br />
    </Box>
  );
};

const MyCustomTitle = () => {
  return (
    <>
      <Typography variant="h6" color="secondary" marginBottom={2}>
        My Custom Title
      </Typography>
      <Typography variant="body1" marginBottom={2}>
        Also, check out how files look when they are added
      </Typography>
      <Typography variant="body1" marginBottom={2}>
        Lastly, there hover effect has been overridden
      </Typography>
    </>
  );
};
const MyCustomButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick} variant="outlined">
      Upload that file!
    </Button>
  );
};
const MyFileRender = ({
  file,
  onStarClick,
  onRemoveFileCLick,
}: {
  file: CurrentFiles;
  onStarClick: () => void;
  onRemoveFileCLick: () => void;
}) => {
  return (
    <>
      <Box>
        {/* <Thumbnail file={file} /> */}
        <Button onClick={onStarClick}>Star Me</Button>
        <Button onClick={onRemoveFileCLick}>Delete File</Button>
        {file.imageUrl && (
          <Box
            sx={{ maxWidth: 100, maxHeight: 100, overflow: 'hidden' }}
            display="flex"
            alignContent="center"
            alignItems="center"
          >
            <img src={file.imageUrl} />
          </Box>
        )}
      </Box>
      <Typography variant="caption">{file.filename}</Typography>
    </>
  );
};

export default FileDropZoneDemo;
