import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";

interface AdminFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  totalMessages: number;
  filteredCount: number;
}

export interface FilterOptions {
  search: string;
  status: 'all' | 'read' | 'unread';
  service: string;
  sortBy: 'date' | 'name';
  sortOrder: 'asc' | 'desc';
}

const AdminFilters = ({ onFilterChange, totalMessages, filteredCount }: AdminFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
    service: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const clearFilters = () => {
    const cleared: FilterOptions = {
      search: '',
      status: 'all',
      service: 'all',
      sortBy: 'date',
      sortOrder: 'desc'
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="bg-muted/30 rounded-lg p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h3 className="text-lg font-semibold mb-2 sm:mb-0">Filter Messages</h3>
        <div className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalMessages} messages
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={filters.status} onValueChange={(value: 'all' | 'read' | 'unread') => updateFilters({ status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>

        {/* Service Filter */}
        <Select value={filters.service} onValueChange={(value) => updateFilters({ service: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="renovation">Renovation</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={filters.sortBy} onValueChange={(value: 'date' | 'name') => updateFilters({ sortBy: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Order & Clear */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            className="flex-1"
          >
            {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="flex-1"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminFilters;