import React, { useState } from 'react';
import { 
  Box, 
  Select, 
  Input, 
  Flex, 
  Text,
  VStack
} from '@chakra-ui/react';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    category: 'All'
  });

  const statusOptions = ['All', 'Open', 'In Progress', 'Resolved', 'Pending'];
  const priorityOptions = ['All', 'High', 'Medium', 'Low'];
  const categoryOptions = ['All', 'Hardware', 'Software', 'Network', 'Account'];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={6}>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text fontSize="xl" fontWeight="bold" color="gray.800">Helpdesk Tickets</Text>
          <Text color="gray.600" fontSize="sm">Filter and manage support tickets</Text>
        </Box>
        
        <Flex direction={{ base: 'column', md: 'row' }} gap={4} align={{ md: 'center' }}>
          {/* Status Filter */}
          <Box flex={1}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Status</Text>
            <Select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              size="sm"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </Box>
          
          {/* Priority Filter */}
          <Box flex={1}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Priority</Text>
            <Select 
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              size="sm"
            >
              {priorityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </Box>
          
          {/* Category Filter */}
          <Box flex={1}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Category</Text>
            <Select 
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              size="sm"
            >
              {categoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </Box>
          
          {/* Search Input */}
          <Box flex={1}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Search</Text>
            <Input
              placeholder="Search tickets..."
              size="sm"
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            />
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default FilterBar;