export type Meeting = {
  id: string;
  title: string;
  date: string;
  participants: number;
  duration: string;
};

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'meet-1698332400000',
    title: 'Q3 Project Kick-off',
    date: '2023-10-26T10:00:00.000Z',
    participants: 5,
    duration: '45 mins',
  },
  {
    id: 'meet-1698246000000',
    title: 'Marketing Sync',
    date: '2023-10-25T09:00:00.000Z',
    participants: 8,
    duration: '30 mins',
  },
  {
    id: 'meet-1698159600000',
    title: 'Design Review',
    date: '2023-10-24T14:00:00.000Z',
    participants: 4,
    duration: '1 hour',
  },
  {
    id: 'meet-1698073200000',
    title: 'Weekly Team Stand-up',
    date: '2023-10-23T11:30:00.000Z',
    participants: 12,
    duration: '15 mins',
  },
];

export type Template = {
  id: string;
  title: string;
  description: string;
  sections: string[];
  icon: 'Brain' | 'Lightbulb' | 'FileText';
};

export const MOCK_TEMPLATES: Template[] = [
  {
    id: 'formal-meeting',
    title: 'Formal Meeting',
    description:
      'A classic template for official board meetings or client presentations.',
    sections: ['Attendees', 'Agenda', 'Discussion', 'Decisions', 'Action Items'],
    icon: 'Brain',
  },
  {
    id: 'creative-brainstorm',
    title: 'Creative Brainstorm',
    description: 'Capture ideas and inspiration in a free-flowing format.',
    sections: ['Topic', 'Ideas Generated', 'Key Takeaways', 'Next Steps'],
    icon: 'Lightbulb',
  },
  {
    id: 'daily-standup',
    title: 'Daily Stand-up',
    description: 'A concise template for agile team check-ins.',
    sections: ["What I did yesterday", "What I'll do today", 'Blockers'],
    icon: 'FileText',
  },
];