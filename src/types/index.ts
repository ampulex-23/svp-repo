export interface SvTimelineResponse {
  data?: SvPlantData;
  success: boolean;
  statusId: number;
  statusType: number;
  statusMsg: string;
}

export interface SvPlantData {
  plantId: number;
  dateFrom: string;
  dateTo: string;
  units: Record<string, SvUnitData>;
}

export interface SvUnitData {
  minTimestamp: number;
  minTimestampValue: number;
  maxTimestamp: number;
  maxTimestampValue: number;
  states: SvState[];
}

export type SvStatus = [0 | 1, 0 | 1, 0 | 1, 0 | 1];

export type SvState = [number, SvStatus];

export interface SvEvent {
  logging: boolean;
  runing: boolean;
  alarm: boolean;
  warning: boolean;
}
