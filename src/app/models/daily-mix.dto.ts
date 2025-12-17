import { FuelDTO } from "./fuel.dto";

export interface DailyMixDTO {
    date: string;
    metrics: FuelDTO[];
    cleanEnergyPercentage: number;
}