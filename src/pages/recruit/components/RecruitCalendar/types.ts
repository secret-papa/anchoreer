export type Recruit = {
  id: number;
  company_name: string;
  title: string;
  start_time: string;
  end_time: string;
  image_url: string;
  duty_ids: string[];
};

export type RecruitCalendarProps = {
  currentDate: Date;
  recruits?: Recruit[];
  onCurrentDateChange: (currentDate: Date) => void;
};
