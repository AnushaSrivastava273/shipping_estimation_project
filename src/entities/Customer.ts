export interface Location {
    lat: number;
    lng: number;
}

export interface Customer {
    id: string;
    name: string;
    phoneNumber: string;
    location: Location;
    gstNumber?: string;
    shopType?: 'Kirana' | 'Supermarket' | 'Wholesaler';
    ownerName?: string;
}
