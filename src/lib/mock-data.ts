export type Meeting = {
  id: string;
  title: string;
  date: string;
  participants: number;
  duration: string;
};

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: '123',
    title: 'Q3 Project Kick-off',
    date: '2023-10-26',
    participants: 5,
    duration: '45min',
  },
  {
    id: '124',
    title: 'Marketing Sync',
    date: '2023-10-24',
    participants: 8,
    duration: '30min',
  },
  {
    id: '125',
    title: 'Design Review: New Feature',
    date: '2023-10-22',
    participants: 4,
    duration: '1h 15min',
  },
  {
    id: '126',
    title: 'Weekly Stand-up',
    date: '2023-10-20',
    participants: 12,
    duration: '15min',
  },
  {
    id: '127',
    title: 'All-Hands Q&A',
    date: '2023-10-18',
    participants: 45,
    duration: '1h',
  },
];
