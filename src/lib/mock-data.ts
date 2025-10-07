export type Meeting = {
  id: string;
  title: string;
  date: string;
  participants: number;
  duration: string;
};

export const MOCK_MEETINGS: Meeting[] = [];

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
    description: 'A classic template for official board meetings or client presentations.',
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
    sections: ['What I did yesterday', 'What I\'ll do today', 'Blockers'],
    icon: 'FileText',
  },
];
