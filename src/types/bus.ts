export type BusCategory = 'ALL' | 'ORDINARY' | 'HVAC' | 'VOLVO';

export type Language = 'en' | 'hi';

export interface RouteStop {
  stopNameEn: string;
  stopNameHi: string;
  arrivalTime: string;
  departureTime: string;
  distanceKm: number;
}

export interface BusSchedule {
  id: string;
  busNumber: string;
  depotEn: string;
  depotHi: string;
  originEn: string;
  originHi: string;
  destinationEn: string;
  destinationHi: string;
  category: 'ORDINARY' | 'HVAC' | 'VOLVO';
  departureTime: string; // HH:mm
  arrivalTime: string;   // HH:mm
  duration: string;
  fare: number;
  frequencyEn: string;
  frequencyHi: string;
  runsOnDays: number[]; // 0 for Sun, 1 for Mon, etc. Empty means all days
  viaStops: RouteStop[];
}

export interface SearchParams {
  origin: string;
  destination: string;
  category: BusCategory;
  travelDate: string; // YYYY-MM-DD
  sortBy: 'EARLIEST' | 'SHORTEST' | 'FARE_LOW';
}