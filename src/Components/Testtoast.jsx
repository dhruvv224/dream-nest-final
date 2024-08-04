// TestToast.js
import React from 'react';
import { Button, useToast, ChakraProvider } from '@chakra-ui/react';

const TestToast = () => {
    const toast = useToast();
   const alert1=()=>{
    toast({
        title: 'Test Toast',
        description: 'This is a test toast notification',
        status: 'success',
        duration: 5000,
        isClosable: true,
    })
   } 
    return (
        <div>
            <Button
                onClick={alert1}
            >
                Show Test Toast
            </Button>
        </div>
    );
};



export default TestToast;
