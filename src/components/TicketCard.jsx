import React from 'react';
import { Box, Text, Flex, Badge } from '@chakra-ui/react';

const TicketCard = ({ ticket, onClick }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return { bg: 'red.100', color: 'red.800', border: 'red.500' };
      case 'Medium': return { bg: 'yellow.100', color: 'yellow.800', border: 'yellow.500' };
      case 'Low': return { bg: 'green.100', color: 'green.800', border: 'green.500' };
      default: return { bg: 'gray.100', color: 'gray.800', border: 'gray.500' };
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return { bg: 'blue.100', color: 'blue.800' };
      case 'In Progress': return { bg: 'purple.100', color: 'purple.800' };
      case 'Resolved': return { bg: 'green.100', color: 'green.800' };
      case 'Pending': return { bg: 'gray.100', color: 'gray.800' };
      default: return { bg: 'gray.100', color: 'gray.800' };
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Hardware': return { bg: 'orange.100', color: 'orange.800' };
      case 'Software': return { bg: 'blue.100', color: 'blue.800' };
      case 'Network': return { bg: 'indigo.100', color: 'indigo.800' };
      case 'Account': return { bg: 'pink.100', color: 'pink.800' };
      default: return { bg: 'gray.100', color: 'gray.800' };
    }
  };

  const priority = getPriorityColor(ticket.priority);
  const status = getStatusColor(ticket.status);
  const category = getCategoryColor(ticket.category);

  // Generate fake SLA data for the card
  const slaResponse = 4; // 4 hour SLA
  const currentResponse = Math.floor(Math.random() * 6) + 1; // 1-6 hours
  const slaPercent = Math.min((currentResponse / slaResponse) * 100, 100);

  return (
    <Box 
      bg={priority.bg}
      p={4}
      borderRadius="lg"
      boxShadow="md"
      _hover={{ boxShadow: 'lg', cursor: 'pointer', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
      borderLeft="4px"
      borderColor={priority.border}
      onClick={() => onClick(ticket)}
    >
      <Flex justify="space-between" align="start" mb={3}>
        <Box flex={1}>
          <Text fontWeight="bold" fontSize="lg" color="gray.800" mb={1}>
            {ticket.title}
          </Text>
          <Flex align="center" gap={2} mb={2}>
            <Badge 
              borderRadius="full" 
              px={2} 
              py={1} 
              fontSize="xs" 
              fontWeight="semibold"
              bg={priority.bg}
              color={priority.color}
            >
              {ticket.priority}
            </Badge>
            <Badge 
              borderRadius="md"
              px={2}
              py={1}
              fontSize="xs"
              fontWeight="medium"
              bg={status.bg}
              color={status.color}
            >
              {ticket.status}
            </Badge>
            <Badge 
              borderRadius="md"
              px={2}
              py={1}
              fontSize="xs"
              bg={category.bg}
              color={category.color}
            >
              {ticket.category}
            </Badge>
          </Flex>
        </Box>
      </Flex>
      
      <Text color="gray.600" fontSize="sm" mb={4} noOfLines={2}>
        {ticket.description}
      </Text>
      
      {/* SLA Timer */}
      <Box mb={4} p={2} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
        <Flex justify="space-between" mb={1}>
          <Text fontSize="xs" color="gray.600">Response SLA</Text>
          <Text fontSize="xs" fontWeight="bold" color={slaPercent > 80 ? "red.600" : "green.600"}>
            {currentResponse}h / {slaResponse}h
          </Text>
        </Flex>
        <Box h="4px" bg="gray.100" borderRadius="full" overflow="hidden">
          <Box 
            h="100%" 
            bg={slaPercent > 80 ? "red.500" : "green.500"} 
            width={`${slaPercent}%`}
            transition="width 0.3s"
          />
        </Box>
        <Text fontSize="xs" color="gray.500" mt={1}>
          {slaPercent > 80 ? "⚠️ Approaching SLA limit" : "✅ Within SLA"}
        </Text>
      </Box>
      
      <Flex align="center" justify="space-between" fontSize="sm">
        <Box>
          <Text fontWeight="medium" color="gray.700">{ticket.assignedTo}</Text>
          <Text color="gray.500" fontSize="xs">Assigned to</Text>
        </Box>
        
        <Box textAlign="right">
          <Text color="gray.600">{ticket.date}</Text>
          <Text color="gray.500" fontSize="xs">Response: {ticket.responseTime}</Text>
        </Box>
      </Flex>
      
      <Box mt={3} pt={3} borderTop="1px" borderColor="gray.200">
        <Text color="gray.500" fontSize="xs">Customer: {ticket.customer}</Text>
      </Box>
    </Box>
  );
};

export default TicketCard;