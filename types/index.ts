// Type definitions for iCrack website

export interface Brand {
  id: string;
  name: string;
  models: Model[];
}

export interface Model {
  id: string;
  name: string;
}

export interface RepairType {
  id: string;
  name: string;
  description: string;
  commonIssues: string[];
  warranty: string;
  duration: string;
}

export interface BookingData {
  brand: string;
  model: string;
  repairType: string;
  customerName: string;
  email: string;
  phone: string;
  location?: string;
  message?: string;
}

