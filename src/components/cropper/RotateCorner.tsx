/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, styled } from '@mui/material';
import PIcon from '../../images/PIcon';
type Props = {
  setRotate: React.Dispatch<React.SetStateAction<number>>;
  width: number;
  height: number;
};
const StyledBox = styled(Box)(() => ({
  '&.boxWrapper': {
    zIndex: 0,
    position: 'absolute',
    userSelect: 'none',
    width: '1px',
    height: '1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .box': {
    zIndex: 0,
    userSelect: 'none',
    width: '1px',
    height: '1px',
  },

  '& .dot': {
    zIndex: 1200,
    height: '30px',
    width: '30px',
    position: 'absolute',
    borderRadius: '100px',
    userSelect: 'none',
    opacity: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '& .dot:hover': {
    opacity: 1,
    backgroundColor: 'white',
    backgroundOpacity: 0.5,
  },

  '& .dot.rotate': {
    position: 'absolute',
    zIndex: 1200,
    // eslint-disable-next-line quotes
    cursor: "url('https://findicons.com/files/icons/1620/crystal_project/16/rotate_ccw.png'), auto",
  },
}));
const RotateCorner = ({ setRotate, width, height }: Props) => {
  function rotateBox(deg: number) {
    setRotate(deg);
  }

  // handle rotation
  const rotate = document.getElementById('rotate');
  const rotate2 = document.getElementById('rotate2');
  const rotate3 = document.getElementById('rotate3');
  const rotate4 = document.getElementById('rotate4');

  rotate?.addEventListener(
    'mousedown',
    function () {
      const arrow = document.querySelector('#box');
      const arrowRects = (arrow as Element).getBoundingClientRect();
      const arrowX = arrowRects.left + arrowRects.width / 2;
      const arrowY = arrowRects.top + arrowRects.height / 2;

      function eventMoveHandler(event: any) {
        const angle = Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + Math.PI / 2;
        rotateBox((angle * 180) / Math.PI);
      }

      window.addEventListener('mousemove', eventMoveHandler, false);

      window.addEventListener(
        'mouseup',
        function eventEndHandler() {
          window.removeEventListener('mousemove', eventMoveHandler, false);
          window.removeEventListener('mouseup', eventEndHandler);
        },
        false,
      );
    },
    false,
  );
  rotate2?.addEventListener(
    'mousedown',
    function () {
      const arrow = document.querySelector('#box');
      const arrowRects = (arrow as Element).getBoundingClientRect();
      const arrowX = arrowRects.left + arrowRects.width / 2;
      const arrowY = arrowRects.top + arrowRects.height / 2;

      function eventMoveHandler(event: any) {
        const angle = Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + Math.PI / 2;
        rotateBox((angle * 180) / Math.PI);
      }

      window.addEventListener('mousemove', eventMoveHandler, false);

      window.addEventListener(
        'mouseup',
        function eventEndHandler() {
          window.removeEventListener('mousemove', eventMoveHandler, false);
          window.removeEventListener('mouseup', eventEndHandler);
        },
        false,
      );
    },
    false,
  );
  rotate3?.addEventListener(
    'mousedown',
    function () {
      const arrow = document.querySelector('#box');
      const arrowRects = (arrow as Element).getBoundingClientRect();
      const arrowX = arrowRects.left + arrowRects.width / 2;
      const arrowY = arrowRects.top + arrowRects.height / 2;

      function eventMoveHandler(event: any) {
        const angle = Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + Math.PI / 2;
        rotateBox((angle * 180) / Math.PI);
      }

      window.addEventListener('mousemove', eventMoveHandler, false);

      window.addEventListener(
        'mouseup',
        function eventEndHandler() {
          window.removeEventListener('mousemove', eventMoveHandler, false);
          window.removeEventListener('mouseup', eventEndHandler);
        },
        false,
      );
    },
    false,
  );
  rotate4?.addEventListener(
    'mousedown',
    function () {
      const arrow = document.querySelector('#box');
      const arrowRects = (arrow as Element).getBoundingClientRect();
      const arrowX = arrowRects.left + arrowRects.width / 2;
      const arrowY = arrowRects.top + arrowRects.height / 2;

      function eventMoveHandler(event: any) {
        const angle = Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + Math.PI / 2;
        rotateBox((angle * 180) / Math.PI);
      }

      window.addEventListener('mousemove', eventMoveHandler, false);

      window.addEventListener(
        'mouseup',
        function eventEndHandler() {
          window.removeEventListener('mousemove', eventMoveHandler, false);
          window.removeEventListener('mouseup', eventEndHandler);
        },
        false,
      );
    },
    false,
  );
  // repositionElement(r);
  return (
    <StyledBox className="boxWrapper" id="boxWrapper">
      <Box className="box" id="box">
        <Box className="dot rotate" id="rotate" sx={{ left: -width / 2 - 10, top: -height / 2 - 10 }}>
          <PIcon name="rotateCube" sx={{ transform: 'rotate(-45deg)' }} />
        </Box>
        <Box className="dot rotate" id="rotate2" sx={{ right: -width / 2 - 10, top: -height / 2 - 10 }}>
          <PIcon name="rotateCube" sx={{ transform: 'rotate(45deg)' }} />
        </Box>
        <Box className="dot rotate" id="rotate3" sx={{ right: -width / 2 - 10, bottom: -height / 2 - 10 }}>
          <PIcon name="rotateCube" sx={{ transform: 'rotate(135deg)' }} />
        </Box>
        <Box className="dot rotate" id="rotate4" sx={{ left: -width / 2 - 10, bottom: -height / 2 - 10 }}>
          <PIcon name="rotateCube" sx={{ transform: 'rotate(-135deg)' }} />
        </Box>
      </Box>
    </StyledBox>
  );
};

export default RotateCorner;
