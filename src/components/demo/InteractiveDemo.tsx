"use client";

import { useState, useEffect } from "react";
import { sampleStudents, sampleStudyGroup, sampleAssignments, sampleMessages, sampleAnalytics } from "@/data/demoData";
import { useDemoAnalytics } from "@/hooks/useDemoAnalytics";

export default function InteractiveDemo() {
  const [activeView, setActiveView] = useState<"dashboard" | "chat" | "assignments" | "analytics">("dashboard");
  const [startTime] = useState(Date.now());
  const analytics = useDemoAnalytics();

  useEffect(() => {
    // Track demo start
    analytics.trackDemoStart();

    // Track time spent on demo when component unmounts
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      analytics.trackDemoTime(timeSpent);
    };
  }, [analytics, startTime]);

  const handleViewChange = (view: typeof activeView) => {
    setActiveView(view);
    analytics.trackViewChange(view);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#404040] overflow-hidden">
      {/* Demo Navigation */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4" id="demo-nav">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">CoStudy Demo</h3>
              <p className="text-white/80 text-sm">Interactive Product Tour</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleViewChange("dashboard")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === "dashboard"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleViewChange("chat")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === "chat"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => handleViewChange("assignments")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === "assignments"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Assignments
            </button>
            <button
              onClick={() => handleViewChange("analytics")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === "analytics"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-6">
        {activeView === "dashboard" && <DashboardView />}
        {activeView === "chat" && <ChatView />}
        {activeView === "assignments" && <AssignmentsView />}
        {activeView === "analytics" && <AnalyticsView />}
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6" id="demo-dashboard">
      <div id="demo-group-info">
        <h3 className="text-2xl font-bold text-[#374045] dark:text-[#E9EEFF] mb-2">
          {sampleStudyGroup.name}
        </h3>
        <p className="text-[#5E6E76] dark:text-[#A0AEC0]">{sampleStudyGroup.course}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4" id="demo-team-members">
        <div className="border border-gray-200 dark:border-[#404040] rounded-xl p-4">
          <h4 className="font-bold text-[#374045] dark:text-[#E9EEFF] mb-3 flex items-center gap-2">
            <span>👥</span> Team Members
          </h4>
          <div className="space-y-2">
            {sampleStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#252525] rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{student.avatar}</span>
                  <div>
                    <p className="font-medium text-[#374045] dark:text-[#E9EEFF]">{student.name}</p>
                    <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">{student.role}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  student.status === "online"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                }`}>
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 dark:border-[#404040] rounded-xl p-4" id="demo-charter">
          <h4 className="font-bold text-[#374045] dark:text-[#E9EEFF] mb-3 flex items-center gap-2">
            <span>📋</span> Team Charter
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-[#5E6E76] dark:text-[#A0AEC0]">Mission</p>
              <p className="text-sm text-[#374045] dark:text-[#E9EEFF]">{sampleStudyGroup.charter.mission}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#5E6E76] dark:text-[#A0AEC0]">Meeting Schedule</p>
              <p className="text-sm text-[#374045] dark:text-[#E9EEFF]">{sampleStudyGroup.charter.meetingSchedule}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatView() {
  return (
    <div className="space-y-4" id="demo-chat">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#374045] dark:text-[#E9EEFF] flex items-center gap-2">
          <span>💬</span> Team Chat
        </h3>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
          Start Video Call
        </button>
      </div>

      <div className="border border-gray-200 dark:border-[#404040] rounded-xl p-4 space-y-3 min-h-[400px]">
        {sampleMessages.map((msg) => (
          <div key={msg.id} className="flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-[#252525] rounded-lg transition-colors">
            <span className="text-3xl">{msg.avatar}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-[#374045] dark:text-[#E9EEFF]">{msg.author}</p>
                <p className="text-xs text-[#92A2AA] dark:text-[#A0AEC0]">{msg.timestamp}</p>
              </div>
              <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-2">{msg.message}</p>
              <div className="flex gap-1">
                {msg.reactions.map((reaction, idx) => (
                  <span key={idx} className="text-sm">{reaction}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-200 dark:border-[#404040] rounded-lg bg-white dark:bg-[#252525] text-[#374045] dark:text-[#E9EEFF] placeholder-[#92A2AA] dark:placeholder-[#A0AEC0]"
          disabled
        />
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Send
        </button>
      </div>
    </div>
  );
}

function AssignmentsView() {
  return (
    <div className="space-y-4" id="demo-assignments">
      <h3 className="text-xl font-bold text-[#374045] dark:text-[#E9EEFF] flex items-center gap-2 mb-4">
        <span>📝</span> Assignments & Tasks
      </h3>

      <div className="space-y-3">
        {sampleAssignments.map((assignment) => (
          <div key={assignment.id} className="border border-gray-200 dark:border-[#404040] rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-[#374045] dark:text-[#E9EEFF]">{assignment.title}</h4>
                <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">Due: {assignment.dueDate}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                assignment.status === "completed"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : assignment.status === "in_progress"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}>
                {assignment.status.replace("_", " ")}
              </span>
            </div>
            <div className="relative w-full h-2 bg-gray-200 dark:bg-[#404040] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                style={{ width: `${assignment.progress}%` }}
              />
            </div>
            <p className="text-xs text-right text-[#5E6E76] dark:text-[#A0AEC0] mt-1">{assignment.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-6" id="demo-analytics">
      <h3 className="text-xl font-bold text-[#374045] dark:text-[#E9EEFF] flex items-center gap-2">
        <span>📊</span> Team Analytics
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-gray-200 dark:border-[#404040] rounded-xl p-6">
          <h4 className="font-semibold text-[#374045] dark:text-[#E9EEFF] mb-4">Collaboration Score</h4>
          <div className="relative w-32 h-32 mx-auto">
            <svg className="transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="10"
                strokeDasharray={`${sampleAnalytics.teamCollaboration * 3.14} 314`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-[#374045] dark:text-[#E9EEFF]">{sampleAnalytics.teamCollaboration}%</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-[#404040] rounded-xl p-6">
          <h4 className="font-semibold text-[#374045] dark:text-[#E9EEFF] mb-4">Key Metrics</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">Communication</span>
                <span className="text-sm font-medium text-[#374045] dark:text-[#E9EEFF]">{sampleAnalytics.communicationFrequency}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-[#404040] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${sampleAnalytics.communicationFrequency}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">Task Completion</span>
                <span className="text-sm font-medium text-[#374045] dark:text-[#E9EEFF]">{sampleAnalytics.taskCompletion}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-[#404040] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${sampleAnalytics.taskCompletion}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">Peer Feedback</span>
                <span className="text-sm font-medium text-[#374045] dark:text-[#E9EEFF]">{sampleAnalytics.peerFeedbackScore}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-[#404040] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${sampleAnalytics.peerFeedbackScore}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-[#404040] rounded-xl p-6">
        <h4 className="font-semibold text-[#374045] dark:text-[#E9EEFF] mb-4">Recent Trends</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{sampleAnalytics.trends.participation}</p>
            <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">Participation</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sampleAnalytics.trends.engagement}</p>
            <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">Engagement</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{sampleAnalytics.trends.goalProgress}</p>
            <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">Goal Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}
