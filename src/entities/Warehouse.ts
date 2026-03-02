
export interface Warehouse {
    id: string;
    name: string;
    location: {
        lat: number;
        long: number;
    };

    capacitySt?: number;
    managerName?: string;
    contactNumber?: string;
}
