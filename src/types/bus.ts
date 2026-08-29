export type Language = 'en' | 'hi';

export type FleetType = 'ORDINARY' | 'HVAC' | 'VOLVO';
export type BusCategory = FleetType;

export interface IntermediateStop {
  name: string;
  nameHi?: string;
  time: string;
  fareFromOrigin?: number;
  fare?: number;
}

export interface BusService {
  id: string;
  busNumber?: string;
  depotId: string;
  depotName?: string;
  depotNameHi?: string;
  origin: string;
  originHi?: string;
  destination: string;
  destinationHi?: string;
  departureTime?: string;
  departure?: string;
  arrivalTime?: string;
  arrival?: string;
  fleetType?: FleetType;
  category?: FleetType;
  fare: number;
  routeVia?: string[];
  routeViaHi?: string[];
  via?: string | string[];
  intermediateStops?: IntermediateStop[];
  helpline?: string;
  frequency?: string;
  operatingDays?: string[];
}

export type BusSchedule = BusService;

export interface Depot {
  id: string;
  name: string;
  nameHi?: string;
  contactNumber?: string;
  address?: string;
  totalBuses?: number;
}

export interface DepotHelpline {
  depot: string;
  depotHi?: string;
  phone: string;
  location?: string;
}