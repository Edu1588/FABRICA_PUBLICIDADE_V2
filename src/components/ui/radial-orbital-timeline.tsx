import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export interface TimelineItem {
  id: number;
  title: string;
  date?: string;
  content: string;
  category?: string;
  icon: any;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  centerTitle?: string;
  className?: string;
  theme?: 'dark' | 'light';
}

export default function RadialOrbitalTimeline({
  timelineData,
  centerTitle,
  className = "",
  theme = 'dark'
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: any;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 230;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-[#00A859] border-[#00A859]";
      case "in-progress":
        return "text-black bg-[#FFB800] border-[#FFB800]";
      case "pending":
        return "text-white bg-gray-700 border-gray-600";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full h-full min-h-[460px] md:min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden select-none ${
        isDark ? "bg-[#0A0F1A] text-white" : "bg-transparent text-gray-900"
      } ${className}`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Pulsing Orb */}
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#00A859] via-[#0074BC] to-[#FFB800] animate-pulse flex items-center justify-center z-10 shadow-2xl shadow-[#00A859]/50">
            <div className="absolute w-28 h-28 rounded-full border-2 border-white/30 animate-ping opacity-70"></div>
            <div
              className="absolute w-36 h-36 rounded-full border border-[#00A859]/40 animate-ping opacity-40"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-16 h-16 rounded-full bg-black/75 backdrop-blur-md flex items-center justify-center p-2 text-center border border-white/20">
              <span className="text-[11px] font-black uppercase text-white tracking-tight leading-none font-mono">
                {centerTitle || "FLUXO 360°"}
              </span>
            </div>
          </div>

          {/* Orbital Ring Guides */}
          <div className={`absolute w-[470px] h-[470px] rounded-full border-2 border-dashed ${isDark ? 'border-white/20' : 'border-[#00A859]/35'} pointer-events-none`}></div>
          <div className={`absolute w-[320px] h-[320px] rounded-full border border-dotted ${isDark ? 'border-white/10' : 'border-[#00A859]/20'} pointer-events-none`}></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = !!expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = !!pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Pulsing Energy Glow */}
                <div
                  className={`absolute rounded-full -inset-2 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(0,168,89,0.4) 0%, rgba(0,168,89,0) 70%)`,
                    width: `${item.energy * 0.45 + 55}px`,
                    height: `${item.energy * 0.45 + 55}px`,
                    left: `-${(item.energy * 0.45 + 55 - 52) / 2}px`,
                    top: `-${(item.energy * 0.45 + 55 - 52) / 2}px`,
                  }}
                ></div>

                {/* Large Node Orb Button */}
                <div
                  className={`
                  w-13 h-13 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#00A859] text-white shadow-2xl shadow-[#00A859]/70 scale-125"
                      : isRelated
                      ? "bg-[#0074BC] text-white shadow-xl shadow-[#0074BC]/50 scale-110"
                      : isDark
                      ? "bg-[#111827] text-white"
                      : "bg-white text-gray-900 shadow-lg"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white shadow-xl"
                      : isRelated
                      ? "border-[#00A859] animate-pulse"
                      : isDark
                      ? "border-white/35"
                      : "border-[#00A859]/50"
                  }
                  transition-all duration-300 transform hover:scale-115
                `}
                >
                  <Icon size={22} />
                </div>

                {/* Prominent Node Label Below */}
                <div
                  className={`
                  absolute top-15 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs sm:text-sm font-bold tracking-wide px-2.5 py-1 rounded-full shadow-md
                  transition-all duration-300
                  ${
                    isExpanded
                      ? "bg-[#00A859] text-white scale-115 shadow-xl ring-2 ring-white"
                      : isDark
                      ? "text-white bg-black/60 border border-white/10"
                      : "text-gray-900 bg-white/95 border border-gray-200"
                  }
                `}
                >
                  {item.title}
                </div>

                {/* Expanded Detail Floating Card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-gray-950/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/80 overflow-visible text-white z-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#00A859]"></div>
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-[10px] font-bold ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "CONCLUÍDO"
                            : item.status === "in-progress"
                            ? "EM ANDAMENTO"
                            : "PLANEJADO"}
                        </Badge>
                        {item.date && (
                          <span className="text-[10px] font-mono text-white/60">
                            {item.date}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-sm font-bold mt-2 text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-gray-300 px-4 pb-4">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="mt-3 pt-2.5 border-t border-white/10">
                        <div className="flex justify-between items-center text-[11px] mb-1">
                          <span className="flex items-center text-gray-400">
                            <Zap size={11} className="mr-1 text-[#FFB800]" />
                            Nível de Impacto
                          </span>
                          <span className="font-mono font-bold text-[#00A859]">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00A859] via-[#0074BC] to-[#FFB800]"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="flex items-center mb-1.5">
                            <LinkIcon size={10} className="text-white/60 mr-1" />
                            <h4 className="text-[10px] uppercase tracking-wider font-semibold text-white/60">
                              Etapas Conectadas
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-[10px] font-medium rounded-lg border-white/20 bg-white/5 hover:bg-[#00A859]/20 text-white hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
