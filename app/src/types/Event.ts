interface Interval {
  started_at: Date;
  ended_at: Date;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  fullwidth?: boolean;
  link?: string;
  background?: string;

  chosen_interval?: Interval;
}
