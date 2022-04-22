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

export interface TruckMarker {
	position: google.maps.LatLngLiteral | google.maps.LatLng;
	text: string;
	label: {
		text: string;
		fontWeight: string;
		fontSize: string;
		color: string;
	}
}