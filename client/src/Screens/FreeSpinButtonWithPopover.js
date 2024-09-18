import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai'; // Import the eye icon

const FreeSpinButtonWithPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <button style={{ fontSize: '24px', cursor: 'pointer' }}>
          <AiOutlineEye /> {/* Use the eye icon here */}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Free Spins Information</PopoverHeader>
        <PopoverBody>
          By holding your favorite tokens, you’ll receive 4 daily free spins—giving you multiple chances to win every day. For those who stake our native CG tokens, you’ll enjoy 6 daily free spins, maximizing your chances to score big.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FreeSpinButtonWithPopover;
