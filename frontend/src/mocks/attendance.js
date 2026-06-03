export const attendanceSummary = {
  attendanceRate: 92,
  sessionsAttended: 12,
  sessionsMissed: 1,
  sessionsExcused: 1
};

export const attendanceLogs = [
  {
    id: "att-1",
    activity: "Community Awareness Workshop",
    date: "2026-05-15",
    attendanceStatus: "Present",
    eventId: "evt-4"
  },
  {
    id: "att-2",
    activity: "Project Shiksha - Slum Education Drive",
    date: "2026-04-20",
    attendanceStatus: "Present",
    eventId: "evt-5"
  },
  {
    id: "att-3",
    activity: "Weekly Progress Review Sync",
    date: "2026-05-25",
    attendanceStatus: "Present"
  },
  {
    id: "att-4",
    activity: "Community Field Survey - Block A",
    date: "2026-06-01",
    attendanceStatus: "Excused"
  }
];

// Admin check-in database: maps attendeeName and eventId to status
export const eventAttendance = [
  // Event 4 attendance
  {
    id: "ea-1",
    eventId: "evt-4",
    attendeeName: "Arjun Mehta",
    attendanceStatus: "Present"
  },
  {
    id: "ea-2",
    eventId: "evt-4",
    attendeeName: "Aarav Sharma",
    attendanceStatus: "Present"
  },
  {
    id: "ea-3",
    eventId: "evt-4",
    attendeeName: "Dia Sen",
    attendanceStatus: "Absent"
  },
  {
    id: "ea-4",
    eventId: "evt-4",
    attendeeName: "Meera Nair",
    attendanceStatus: "Excused"
  },
  // Event 5 attendance
  {
    id: "ea-5",
    eventId: "evt-5",
    attendeeName: "Arjun Mehta",
    attendanceStatus: "Present"
  },
  {
    id: "ea-6",
    eventId: "evt-5",
    attendeeName: "Ishaan Gupta",
    attendanceStatus: "Present"
  }
];
