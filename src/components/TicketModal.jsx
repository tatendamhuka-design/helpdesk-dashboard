import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Badge,
  Flex,
  Box,
  Progress,
  VStack,
  HStack,
  Divider,
  Tag,
  TagLabel,
  Icon
} from '@chakra-ui/react';
import { 
  FaUser, 
  FaCalendar, 
  FaClock, 
  FaExclamationCircle,
  FaCheckCircle,
  FaHourglassHalf,
  FaTools,
  FaLaptop,
  FaNetworkWired,
  FaUserCircle
} from 'react-icons/fa';

const TicketModal = ({ isOpen, onClose, ticket }) => {
  if (!ticket) return null;

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'red';
      case 'Medium': return 'yellow';
      case 'Low': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'blue';
      case 'In Progress': return 'purple';
      case 'Resolved': return 'green';
      case 'Pending': return 'gray';
      default: return 'gray';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Hardware': return FaTools;
      case 'Software': return FaLaptop;
      case 'Network': return FaNetworkWired;
      case 'Account': return FaUserCircle;
      default: return FaTools;
    }
  };

  // Calculate SLA status (fake data)
  const slaData = {
    responseTime: Math.floor(Math.random() * 24) + 1, // 1-24 hours
    resolutionTime: Math.floor(Math.random() * 72) + 1, // 1-72 hours
    slaResponse: 4, // 4 hour SLA for response
    slaResolution: 48 // 48 hour SLA for resolution
  };

  const responseSlaPercent = Math.min((slaData.responseTime / slaData.slaResponse) * 100, 100);
  const resolutionSlaPercent = Math.min((slaData.responseTime / slaData.slaResolution) * 100, 100);

  const CategoryIcon = getCategoryIcon(ticket.category);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex align="center" gap={2}>
            <Text fontSize="xl" fontWeight="bold">{ticket.title}</Text>
            <Badge colorScheme={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            {/* Ticket Info */}
            <Box>
              <Text fontWeight="medium" color="gray.600" mb={2}>Description</Text>
              <Text>{ticket.description}</Text>
            </Box>

            <Divider />

            {/* Metadata */}
            <HStack spacing={6} wrap="wrap">
              <Flex align="center" gap={2}>
                <Icon as={FaUser} color="gray.500" />
                <Box>
                  <Text fontSize="sm" color="gray.500">Assigned to</Text>
                  <Text fontWeight="medium">{ticket.assignedTo}</Text>
                </Box>
              </Flex>

              <Flex align="center" gap={2}>
                <Icon as={CategoryIcon} color="gray.500" />
                <Box>
                  <Text fontSize="sm" color="gray.500">Category</Text>
                  <Text fontWeight="medium">{ticket.category}</Text>
                </Box>
              </Flex>

              <Flex align="center" gap={2}>
                <Icon as={FaCalendar} color="gray.500" />
                <Box>
                  <Text fontSize="sm" color="gray.500">Created</Text>
                  <Text fontWeight="medium">{ticket.date}</Text>
                </Box>
              </Flex>
            </HStack>

            <Divider />

            {/* SLA Timers */}
            <Box>
              <Text fontWeight="medium" color="gray.600" mb={4}>SLA Status</Text>
              
              <VStack spacing={4} align="stretch">
                {/* Response Time SLA */}
                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Flex align="center" gap={2}>
                      <Icon as={FaClock} color={responseSlaPercent > 80 ? "red.500" : "green.500"} />
                      <Text fontSize="sm">Response Time</Text>
                    </Flex>
                    <Text fontSize="sm" fontWeight="bold">
                      {slaData.responseTime}h / {slaData.slaResponse}h SLA
                    </Text>
                  </Flex>
                  <Progress 
                    value={responseSlaPercent} 
                    size="sm" 
                    colorScheme={responseSlaPercent > 80 ? "red" : "green"}
                    borderRadius="full"
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {responseSlaPercent > 80 ? "⚠️ Exceeding SLA" : "✅ Within SLA"}
                  </Text>
                </Box>

                {/* Resolution Time SLA */}
                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Flex align="center" gap={2}>
                      <Icon as={FaHourglassHalf} color={resolutionSlaPercent > 80 ? "red.500" : "green.500"} />
                      <Text fontSize="sm">Resolution Time</Text>
                    </Flex>
                    <Text fontSize="sm" fontWeight="bold">
                      {slaData.resolutionTime}h / {slaData.slaResolution}h SLA
                    </Text>
                  </Flex>
                  <Progress 
                    value={resolutionSlaPercent} 
                    size="sm" 
                    colorScheme={resolutionSlaPercent > 80 ? "red" : "green"}
                    borderRadius="full"
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {resolutionSlaPercent > 80 ? "⚠️ At risk of SLA breach" : "✅ On track"}
                  </Text>
                </Box>
              </VStack>
            </Box>

            <Divider />

            {/* Customer Info */}
            <Box>
              <Text fontWeight="medium" color="gray.600" mb={2}>Customer Information</Text>
              <Flex align="center" gap={2}>
                <Icon as={FaUserCircle} color="gray.500" />
                <Text>{ticket.customer}</Text>
              </Flex>
            </Box>

            {/* Status */}
            <Box>
              <Text fontWeight="medium" color="gray.600" mb={2}>Current Status</Text>
              <Tag size="lg" colorScheme={getStatusColor(ticket.status)} borderRadius="full">
                <TagLabel>{ticket.status}</TagLabel>
              </Tag>
              {ticket.status === 'Open' && (
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Awaiting assignment to support agent
                </Text>
              )}
              {ticket.status === 'In Progress' && (
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Being worked on by {ticket.assignedTo}
                </Text>
              )}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" onClick={() => {
            alert(`Marking ticket #${ticket.id} as resolved`);
            onClose();
          }}>
            Mark as Resolved
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TicketModal;