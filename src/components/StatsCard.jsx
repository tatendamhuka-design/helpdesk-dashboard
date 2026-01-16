import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Flex align="center" justify="space-between">
        <Box>
          <Text color="gray.500" fontSize="sm" fontWeight="medium">{title}</Text>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800" mt={1}>{value}</Text>
          <Flex align="center" mt={2}>
            <Text fontSize="sm" color={change >= 0 ? "green.600" : "red.600"}>
              {change >= 0 ? '+' : ''}{change}%
            </Text>
            <Text color="gray.500" fontSize="sm" ml={2}>from last month</Text>
          </Flex>
        </Box>
        <Box p={3} bg={color} borderRadius="full">
          <Icon size="20px" color="white" />
        </Box>
      </Flex>
    </Box>
  );
};

export default StatsCard;