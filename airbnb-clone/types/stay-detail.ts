export type StayDetailFeature = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type StayDetailAmenity = {
  id: string;
  icon: string;
  label: string;
  unavailable?: boolean;
};

export type StayDetailNearbyPlace = {
  id: string;
  name: string;
  distanceLabel: string;
  travelLabel: string;
};
