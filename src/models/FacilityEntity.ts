export interface FacilityEntity {
  id: string;
  name: string;
  address: string;
}
export const dummyFacilities: FacilityEntity[] = [
  {
    id: 'fac-001',
    name: 'Central Park Gym',
    address: '123 Main Street, District 1, Ho Chi Minh City',
  },
  {
    id: 'fac-002',
    name: 'Downtown Spa & Wellness',
    address: '456 Nguyen Trai, District 5, Ho Chi Minh City',
  },
  {
    id: 'fac-003',
    name: 'Ocean View Resort',
    address: '789 Tran Phu, Nha Trang, Khanh Hoa',
  },
  {
    id: 'fac-004',
    name: 'Highland Coffee Hub',
    address: '12 Le Loi, District 1, Ho Chi Minh City',
  },
  {
    id: 'fac-005',
    name: 'City Library Center',
    address: '34 Nguyen Hue, District 1, Ho Chi Minh City',
  },
];
