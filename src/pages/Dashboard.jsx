import React, { useState } from 'react';
import { 
  Box, 
  Text, 
  SimpleGrid, 
  VStack, 
  Button,
  Progress,
  Flex,
  useDisclosure
} from '@chakra-ui/react';
import { 
  FaTachometerAlt, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaClock
} from 'react-icons/fa';
import tickets from '../data/tickets';
import FilterBar from '../components/FilterBar';
import TicketCard from '../components/TicketCard';
import StatsCard from '../components/StatsCard';
import TicketModal from '../components/TicketModal';

const Dashboard = () => {
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFilterChange = (filters) => {
    let filtered = [...tickets];
    
    if (filters.status !== 'All') {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }
    
    if (filters.priority !== 'All') {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }
    
    if (filters.category !== 'All') {
      filtered = filtered.filter(ticket => ticket.category === filters.category);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(search) ||
        ticket.description.toLowerCase().includes(search) ||
        ticket.assignedTo.toLowerCase().includes(search) ||
        ticket.customer.toLowerCase().includes(search)
      );
    }
    
    setFilteredTickets(filtered);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    onOpen();
  };

  // Calculate statistics
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;

  return (
    <Box minH="100vh" bg="gray.50" p={4}>
      {/* Header */}
      <Box mb={8}>
        <Text fontSize="3xl" fontWeight="bold" color="gray.900">Tatenda's Helpdesk Dashboard</Text>
        <Text color="gray.600" mt={2}>Monitor and manage all support tickets in one place</Text>
      </Box>

      {/* Statistics Cards */}
      <SimpleGrid columns={[1, 2, 4]} spacing={4} mb={8}>
        <StatsCard
          title="Total Tickets"
          value={totalTickets}
          change={12}
          icon={FaTachometerAlt}
          color="blue.500"
        />
        <StatsCard
          title="Open Tickets"
          value={openTickets}
          change={-5}
          icon={FaExclamationTriangle}
          color="red.500"
        />
        <StatsCard
          title="In Progress"
          value={inProgressTickets}
          change={8}
          icon={FaClock}
          color="yellow.500"
        />
        <StatsCard
          title="Resolved"
          value={resolvedTickets}
          change={15}
          icon={FaCheckCircle}
          color="green.500"
        />
      </SimpleGrid>

      {/* Main Content */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {/* Left Column - Filters and Tickets */}
        <Box>
          <FilterBar onFilterChange={handleFilterChange} />
          
          {/* Tickets Grid */}
          <SimpleGrid columns={[1, 2]} spacing={4}>
            {filteredTickets.map(ticket => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                onClick={handleTicketClick}
              />
            ))}
          </SimpleGrid>
          
          {filteredTickets.length === 0 && (
            <Box textAlign="center" py={12}>
              <Text color="gray.500" fontSize="lg">No tickets found matching your filters.</Text>
              <Button 
                mt={4}
                colorScheme="blue"
                onClick={() => handleFilterChange({ status: 'All', priority: 'All', category: 'All', search: '' })}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Box>

        {/* Right Column - Analytics */}
        <VStack spacing={6} align="stretch">
          {/* SLA Overview */}
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>SLA Overview</Text>
            <VStack spacing={4} align="stretch">
              <Box>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="sm" fontWeight="medium">Average Response Time</Text>
                  <Text fontSize="sm" fontWeight="bold" color="green.600">2.4h</Text>
                </Flex>
                <Progress value={60} size="sm" colorScheme="green" borderRadius="full" />
                <Text fontSize="xs" color="gray.500" mt={1}>4h SLA target</Text>
              </Box>
              <Box>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="sm" fontWeight="medium">Average Resolution Time</Text>
                  <Text fontSize="sm" fontWeight="bold" color="blue.600">18.7h</Text>
                </Flex>
                <Progress value={39} size="sm" colorScheme="blue" borderRadius="full" />
                <Text fontSize="xs" color="gray.500" mt={1}>48h SLA target</Text>
              </Box>
              <Box>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="sm" fontWeight="medium">SLA Compliance Rate</Text>
                  <Text fontSize="sm" fontWeight="bold" color="green.600">94.2%</Text>
                </Flex>
                <Progress value={94.2} size="sm" colorScheme="green" borderRadius="full" />
                <Text fontSize="xs" color="gray.500" mt={1}>Target: 95%</Text>
              </Box>
            </VStack>
          </Box>

          {/* Priority Distribution */}
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>Priority Distribution</Text>
            <VStack spacing={4} align="stretch">
              <Box>
                <Flex justify="space-between" fontSize="sm" mb={1}>
                  <Text color="red.600" fontWeight="medium">High Priority</Text>
                  <Text>25%</Text>
                </Flex>
                <Progress value={25} size="sm" colorScheme="red" borderRadius="full" />
              </Box>
              <Box>
                <Flex justify="space-between" fontSize="sm" mb={1}>
                  <Text color="yellow.600" fontWeight="medium">Medium Priority</Text>
                  <Text>50%</Text>
                </Flex>
                <Progress value={50} size="sm" colorScheme="yellow" borderRadius="full" />
              </Box>
              <Box>
                <Flex justify="space-between" fontSize="sm" mb={1}>
                  <Text color="green.600" fontWeight="medium">Low Priority</Text>
                  <Text>25%</Text>
                </Flex>
                <Progress value={25} size="sm" colorScheme="green" borderRadius="full" />
              </Box>
            </VStack>
          </Box>

          {/* Quick Stats */}
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>Quick Stats</Text>
            <SimpleGrid columns={2} spacing={4}>
              <Box textAlign="center" p={3} bg="blue.50" borderRadius="lg">
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">{totalTickets}</Text>
                <Text fontSize="sm" color="gray.600" mt={1}>Total Tickets</Text>
              </Box>
              <Box textAlign="center" p={3} bg="green.50" borderRadius="lg">
                <Text fontSize="2xl" fontWeight="bold" color="green.600">{resolvedTickets}</Text>
                <Text fontSize="sm" color="gray.600" mt={1}>Resolved</Text>
              </Box>
              <Box textAlign="center" p={3} bg="yellow.50" borderRadius="lg">
                <Text fontSize="2xl" fontWeight="bold" color="yellow.600">
                  {Math.round((resolvedTickets / totalTickets) * 100)}%
                </Text>
                <Text fontSize="sm" color="gray.600" mt={1}>Success Rate</Text>
              </Box>
              <Box textAlign="center" p={3} bg="purple.50" borderRadius="lg">
                <Text fontSize="2xl" fontWeight="bold" color="purple.600">4.2</Text>
                <Text fontSize="sm" color="gray.600" mt={1}>Avg. Response (hrs)</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </SimpleGrid>

      {/* Ticket Details Modal */}
      <TicketModal 
        isOpen={isOpen} 
        onClose={onClose} 
        ticket={selectedTicket}
      />
    </Box>
  );
};

export default Dashboard;