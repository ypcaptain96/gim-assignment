export interface TruckResponse {
	data: TruckData[];
}

export interface TruckData {
	id: number;
	latitude: number;
	longitude: number;
	name: string;
	nameBn: string;
	truckCounts: TruckCount[];
}

export interface TruckCount {
	count: number;
	truckType: string;
}