export const STANDARD_COURIER_CHARGE = 10;
export const EXPRESS_CHARGE_PER_KG = 1.2;

export enum DeliverySpeed {
    STANDARD = 'standard',
    EXPRESS = 'express'
}

export enum TransportMode {
    AEROPLANE = 'Aeroplane',
    TRUCK = 'Truck',
    MINI_VAN = 'Mini Van'
}

export interface ITransportStrategy {
    mode: TransportMode;
    calculateBaseCharge(distanceKm: number, weightKg: number): number;
}

export class AeroplaneStrategy implements ITransportStrategy {
    mode = TransportMode.AEROPLANE;
    calculateBaseCharge(distanceKm: number, weightKg: number): number {
        return distanceKm * weightKg * 1;
    }
}

export class TruckStrategy implements ITransportStrategy {
    mode = TransportMode.TRUCK;
    calculateBaseCharge(distanceKm: number, weightKg: number): number {
        return distanceKm * weightKg * 2;
    }
}

export class MiniVanStrategy implements ITransportStrategy {
    mode = TransportMode.MINI_VAN;
    calculateBaseCharge(distanceKm: number, weightKg: number): number {
        return distanceKm * weightKg * 3;
    }
}

export class TransportStrategyFactory {
    public static getStrategy(distanceKm: number): ITransportStrategy {
        if (distanceKm > 500) {
            return new AeroplaneStrategy();
        } else if (distanceKm > 100) {
            return new TruckStrategy();
        } else {
            return new MiniVanStrategy();
        }
    }
}

export const calculateShippingCharge = (
    distanceKm: number,
    totalWeightKg: number,
    speed: DeliverySpeed
): number => {
    const strategy = TransportStrategyFactory.getStrategy(distanceKm);
    const baseShippingCharge = strategy.calculateBaseCharge(distanceKm, totalWeightKg);

    let totalCharge = baseShippingCharge + STANDARD_COURIER_CHARGE;

    if (speed === DeliverySpeed.EXPRESS) {
        totalCharge += totalWeightKg * EXPRESS_CHARGE_PER_KG;
    }

    return Math.round(totalCharge * 100) / 100;
};
