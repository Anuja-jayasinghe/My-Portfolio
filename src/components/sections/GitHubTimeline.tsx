"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getContributionLevel } from "@/lib/github-contributions";

interface ContributionDay {
  date: string;
  contributionCount: number;
  weekday: number;
}

interface GitHubTimelineProps {
  contributions: ContributionDay[];
}

/**
 * Color palette based on contribution intensity
 * Level 0 (no contrib) -> Level 4 (many contribs)
 */
const CONTRIBUTION_COLORS = [
  "bg-gray-100", // 0 contributions
  "bg-blue-200", // 1-4 contributions
  "bg-blue-400", // 5-9 contributions
  "bg-blue-600", // 10-19 contributions
  "bg-accent", // 20+ contributions (#000075 - deep blue)
];

const ACCENT_COLORS = {
  0: "#f3f4f6",
  1: "#bfdbfe",
  2: "#60a5fa",
  3: "#2563eb",
  4: "#000075",
};

/**
 * Organizes contributions into weeks (Sunday-Saturday)
 */
function organizeIntoWeeks(contributions: ContributionDay[]): ContributionDay[][] {
  if (!contributions.length) return [];

  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  let currentWeekStart: number | null = null;

  contributions.forEach((day) => {
    const date = new Date(day.date);
    const weekStart = date.getDate() - date.getDay();

    if (currentWeekStart === null) {
      currentWeekStart = weekStart;
    }

    // If we've moved to a new week, save the current one
    if (weekStart !== currentWeekStart && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
      currentWeekStart = weekStart;
    }

    currentWeek.push(day);
  });

  // Add the last week
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

/**
 * Contribution square component with tooltip
 */
function ContributionSquare({ day }: { day?: ContributionDay }) {
  if (!day) {
    return <div className="h-3 w-3 rounded-sm bg-gray-50" />;
  }

  const level = getContributionLevel(day.contributionCount);
  const color = CONTRIBUTION_COLORS[level];
  const hoverColor =
    level === 0 ? "hover:bg-gray-200" : "hover:opacity-80 transition-opacity";

  const dateObj = new Date(day.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`group relative h-3 w-3 cursor-pointer rounded-sm ${color} ${hoverColor}`}
      title={`${day.contributionCount} contributions on ${formattedDate}`}
    >
      {/* Tooltip */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 z-10">
        {day.contributionCount} {day.contributionCount === 1 ? "contribution" : "contributions"}
        <br />
        <span className="text-gray-300">{formattedDate}</span>
      </div>
    </div>
  );
}

/**
 * Main GitHubTimeline component with draggable x-axis
 */
export function GitHubTimeline({
  contributions,
}: GitHubTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  // Organize contributions into weeks
  const weeks = organizeIntoWeeks(contributions);

  // Calculate stats
  const totalContributions = contributions.reduce(
    (sum, day) => sum + day.contributionCount,
    0
  );
  const maxStreak = calculateMaxStreak(contributions);
  const currentStreak = calculateCurrentStreak(contributions);

  // Scroll to the right on mount (most recent data) and calculate constraints
  useEffect(() => {
    if (containerRef.current && innerRef.current) {
      const scrollWidth =
        innerRef.current.scrollWidth - containerRef.current.clientWidth;
      containerRef.current.scrollLeft = scrollWidth;

      // Calculate drag constraints
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = innerRef.current.offsetWidth;

      setDragConstraints({
        left: -(contentWidth - containerWidth),
        right: 0,
      });
    }
  }, [weeks]);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          GitHub Contributions
        </h3>
        <p className="text-sm text-gray-600">
          {new Date(contributions[0]?.date).getFullYear()} -{" "}
          {new Date(contributions[contributions.length - 1]?.date).getFullYear()}{" "}
          — Drag to explore your contribution history
        </p>
      </div>

      {/* Draggable contribution grid */}
      <div
        ref={containerRef}
        className="w-full overflow-x-hidden rounded-lg border border-gray-200 bg-white p-4 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          ref={innerRef}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.2}
          dragTransition={{
            power: 0.3,
            restDelta: 10,
          }}
          className="inline-flex gap-1 will-change-transform"
        >
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {/* Ensure 7 days per week */}
              {Array.from({ length: 7 }).map((_, dayIdx) => (
                <ContributionSquare
                  key={`${weekIdx}-${dayIdx}`}
                  day={week[dayIdx]}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-3 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase text-gray-600 tracking-wide">
            Total
          </p>
          <p className="text-2xl font-bold text-accent">
            {totalContributions.toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase text-gray-600 tracking-wide">
            Max Streak
          </p>
          <p className="text-2xl font-bold text-accent">{maxStreak}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase text-gray-600 tracking-wide">
            Current Streak
          </p>
          <p className="text-2xl font-bold text-accent">{currentStreak}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-600">
        <span className="font-semibold">Less</span>
        <div className="flex gap-1">
          {Object.values(ACCENT_COLORS).map((color, idx) => (
            <div
              key={idx}
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="font-semibold">More</span>
      </div>
    </div>
  );
}

/**
 * Calculate maximum consecutive contribution streak
 */
function calculateMaxStreak(contributions: ContributionDay[]): number {
  let maxStreak = 0;
  let currentStreak = 0;

  contributions.forEach((day) => {
    if (day.contributionCount > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  return maxStreak;
}

/**
 * Calculate current contribution streak (from most recent date)
 */
function calculateCurrentStreak(contributions: ContributionDay[]): number {
  let streak = 0;

  // Iterate from the end (most recent)
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i]!.contributionCount > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
