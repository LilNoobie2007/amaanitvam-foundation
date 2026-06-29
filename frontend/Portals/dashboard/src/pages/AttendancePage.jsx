import { useState } from 'react';
import { CalendarCheck } from 'lucide-react';

export default function AttendancePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
        <p className="text-sm text-slate-500 mt-1">Mark and view your attendance</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <CalendarCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-slate-400">Backend implementation pending (Task assigned to Person 2).</p>
      </div>
    </div>
  );
}
