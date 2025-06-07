
import React from 'react';
import { TrendingUp } from "lucide-react";

const ScoreVisualization = () => {
  const scoreData = [
    { score: 520, height: "h-16", barHeight: "h-12", color: "destructive", label: "Start" },
    { score: 650, height: "h-24", barHeight: "h-20", color: "accent", label: "3 Months" },
    { score: "750+", height: "h-36", barHeight: "h-32", color: "success", label: "6 Months", showIcon: true }
  ];

  return (
    <div className="relative animate-scale-in">
      <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Your Credit Score Journey</h3>
          <p className="text-sm text-muted-foreground">Watch your score climb with ScoreUp</p>
        </div>
        
        {/* Score visualization */}
        <div className="relative h-48 flex items-end justify-between space-x-2 mb-4">
          {scoreData.map((data, index) => (
            <div key={index} className={`flex-1 bg-${data.color}/20 rounded-t ${data.height} relative`}>
              <div className={`absolute bottom-0 w-full bg-${data.color} rounded-t ${data.barHeight} ${data.showIcon ? 'flex items-center justify-center' : ''}`}>
                {data.showIcon && <TrendingUp className="w-6 h-6 text-success-foreground" />}
              </div>
              <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${index === 2 ? 'text-lg font-bold' : 'text-sm font-semibold'} text-${data.color}`}>
                {data.score}
              </span>
            </div>
          ))}
        </div>
        
        {/* X-axis labels centered under each bar */}
        <div className="flex justify-between space-x-2 text-xs text-muted-foreground">
          {scoreData.map((data, index) => (
            <div key={index} className="flex-1 text-center">{data.label}</div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Join thousands who've improved their credit with ScoreUp
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreVisualization;
