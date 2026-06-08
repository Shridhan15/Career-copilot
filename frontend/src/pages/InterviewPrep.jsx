import React from "react";
import { Mic, ShieldAlert } from "lucide-react";

export default function InterviewPrep() {
  return (
    <div className="max-w-md mx-auto text-center bg-white border border-slate-200 rounded-2xl p-12 shadow-sm min-h-[340px] flex flex-col items-center justify-center">
      <div className="bg-amber-50 text-amber-600 p-3 rounded-2xl border border-amber-200/50 mb-4">
        <Mic className="w-6 h-6 animate-pulse" />
      </div>
      <h3 className="text-base font-bold text-slate-900">
        Dynamic Screening Module Locked
      </h3>
      <p className="text-xs text-slate-400 max-w-xs mt-1 leading-normal">
        This workspace activates dynamically once an engineering curriculum is
        built or active profile data syncs with your state machine.
      </p>
    </div>
  );
}
