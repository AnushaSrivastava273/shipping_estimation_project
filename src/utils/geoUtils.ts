import { getDistance } from 'geolib';

export const calculateDistance = (
    lat1: number, lng1: number,
    lat2: number, lng2: number
): number => {
    const distInMeters = getDistance(
        { latitude: lat1, longitude: lng1 },
        { latitude: lat2, longitude: lng2 }
    );
    return distInMeters / 1000;
};
