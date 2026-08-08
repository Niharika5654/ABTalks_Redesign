import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TrendingUp, Activity, Info } from 'lucide-react';

interface D3ProgressChartProps {
  completedDays: number[];
  currentDay: number;
}

export const D3ProgressChart: React.FC<D3ProgressChartProps> = ({ completedDays, currentDay }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverData, setHoverData] = useState<{ day: number; count: number; percentage: number } | null>(null);

  // Prepare 60 days trajectory data
  const data = React.useMemo(() => {
    let cumulative = 0;
    const result: { day: number; count: number; completed: boolean; target: number }[] = [];
    for (let day = 1; day <= 60; day++) {
      if (completedDays.includes(day)) {
        cumulative += 1;
      }
      result.push({
        day,
        count: cumulative,
        completed: completedDays.includes(day),
        target: Math.min(day, 60) // ideal benchmark curve
      });
    }
    return result;
  }, [completedDays]);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const renderChart = () => {
      const width = containerRef.current?.clientWidth || 320;
      const height = 180;
      const margin = { top: 20, right: 15, bottom: 30, left: 35 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      svg
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);

      // Scales
      const xScale = d3
        .scaleLinear()
        .domain([1, 60])
        .range([0, innerWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 60])
        .range([innerHeight, 0]);

      // Main Group
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // SVG Filters & Gradients (Claymorphic Glow & Area Gradient)
      const defs = svg.append('defs');

      // Monochromatic Area Gradient
      const areaGradient = defs
        .append('linearGradient')
        .attr('id', 'monochrome-area-grad')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      areaGradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#ffffff')
        .attr('stop-opacity', '0.25');

      areaGradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#ffffff')
        .attr('stop-opacity', '0.0');

      // Clay Line Shadow
      const filter = defs
        .append('filter')
        .attr('id', 'clay-line-glow')
        .attr('x', '-20%')
        .attr('y', '-20%')
        .attr('width', '140%')
        .attr('height', '140%');

      filter
        .append('feDropShadow')
        .attr('dx', '0')
        .attr('dy', '2')
        .attr('stdDeviation', '3')
        .attr('flood-color', '#ffffff')
        .attr('flood-opacity', '0.4');

      // Gridlines (Horizontal)
      const yAxisGrid = d3
        .axisLeft(yScale)
        .tickValues([0, 15, 30, 45, 60])
        .tickSize(-innerWidth)
        .tickFormat(() => '');

      g.append('g')
        .attr('class', 'grid')
        .call(yAxisGrid)
        .selectAll('line')
        .attr('stroke', 'rgba(255, 255, 255, 0.08)')
        .attr('stroke-dasharray', '3,3');

      g.select('.grid .domain').remove();

      // Target Ideal Pace Line (Dashed subtle)
      const targetLine = d3
        .line<{ day: number; target: number }>()
        .x((d) => xScale(d.day))
        .y((d) => yScale(d.target))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(255, 255, 255, 0.2)')
        .attr('stroke-dasharray', '4,4')
        .attr('stroke-width', 1.5)
        .attr('d', targetLine);

      // Area Path
      const area = d3
        .area<{ day: number; count: number }>()
        .x((d) => xScale(d.day))
        .y0(innerHeight)
        .y1((d) => yScale(d.count))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(data)
        .attr('fill', 'url(#monochrome-area-grad)')
        .attr('d', area);

      // Solid Progress Line
      const line = d3
        .line<{ day: number; count: number }>()
        .x((d) => xScale(d.day))
        .y((d) => yScale(d.count))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2.5)
        .attr('filter', 'url(#clay-line-glow)')
        .attr('d', line);

      // Current Day Vertical Milestone Line
      const currentX = xScale(currentDay);
      g.append('line')
        .attr('x1', currentX)
        .attr('x2', currentX)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', 'rgba(255, 255, 255, 0.5)')
        .attr('stroke-dasharray', '2,2');

      // Milestone Dots (Key checkpoints: Day 1, 15, 30, 45, 60 & currentDay)
      const keyDays = [1, 15, 30, 45, 60, currentDay];
      const milestoneData = data.filter((d) => keyDays.includes(d.day));

      g.selectAll('.milestone-dot')
        .data(milestoneData)
        .enter()
        .append('circle')
        .attr('class', 'milestone-dot')
        .attr('cx', (d: any) => xScale(d.day))
        .attr('cy', (d: any) => yScale(d.count))
        .attr('r', (d: any) => (d.day === currentDay ? 5 : 3.5))
        .attr('fill', (d: any) => (d.completed ? '#ffffff' : '#18181b'))
        .attr('stroke', '#ffffff')
        .attr('stroke-width', (d: any) => (d.day === currentDay ? 2 : 1))
        .style('cursor', 'pointer');

      // X-Axis Ticks
      const xAxis = d3
        .axisBottom(xScale)
        .tickValues([1, 15, 30, 45, 60])
        .tickFormat((d) => `D${d}`);

      const xAxisG = g
        .append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxis);

      xAxisG.select('.domain').attr('stroke', 'rgba(255, 255, 255, 0.2)');
      xAxisG
        .selectAll('.tick text')
        .attr('fill', '#a1a1aa')
        .attr('font-size', '10px')
        .attr('font-family', 'monospace');

      xAxisG.selectAll('.tick line').attr('stroke', 'rgba(255, 255, 255, 0.2)');

      // Y-Axis Ticks
      const yAxis = d3
        .axisLeft(yScale)
        .tickValues([0, 20, 40, 60])
        .tickFormat((d) => `${d}`);

      const yAxisG = g.append('g').call(yAxis);
      yAxisG.select('.domain').remove();
      yAxisG
        .selectAll('.tick text')
        .attr('fill', '#a1a1aa')
        .attr('font-size', '10px')
        .attr('font-family', 'monospace');

      yAxisG.selectAll('.tick line').remove();

      // Interactive Overlay for Touch/Mouse Tooltip
      const overlay = g
        .append('rect')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('fill', 'transparent')
        .style('cursor', 'crosshair');

      overlay.on('mousemove touchmove', function (event) {
        const [mouseX] = d3.pointer(event, this);
        const dayVal = Math.round(xScale.invert(mouseX));
        const clampedDay = Math.max(1, Math.min(60, dayVal));
        const match = data.find((d) => d.day === clampedDay);

        if (match) {
          setHoverData({
            day: match.day,
            count: match.count,
            percentage: Math.round((match.count / 60) * 100)
          });
        }
      });

      overlay.on('mouseleave touchend', function () {
        setHoverData(null);
      });
    };

    renderChart();

    const resizeObserver = new ResizeObserver(() => {
      renderChart();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [data, currentDay]);

  const activeHover = hoverData || {
    day: currentDay,
    count: completedDays.length,
    percentage: Math.round((completedDays.length / 60) * 100)
  };

  return (
    <div className="space-y-2">
      {/* Chart Header Bar */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
          <Activity className="w-4 h-4 text-white" />
          <span>60-Day Progress Trajectory</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-300 bg-black/80 px-2.5 py-1 rounded-full border border-white/10">
          <span className="text-zinc-400">Day {activeHover.day}:</span>
          <strong className="text-white">{activeHover.count}/60 Days ({activeHover.percentage}%)</strong>
        </div>
      </div>

      {/* D3 Monochromatic SVG Canvas Container */}
      <div
        ref={containerRef}
        className="w-full bg-black/90 p-3 rounded-2xl border border-white/15 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.9),0_4px_20px_rgba(0,0,0,0.6)] relative overflow-hidden"
      >
        <svg ref={svgRef} className="w-full overflow-visible block"></svg>

        {/* Legend Footnote */}
        <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-zinc-400 border-t border-white/10 mt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-white inline-block"></span> Actual
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-zinc-500 border-dashed border-b inline-block"></span> Benchmark
            </span>
          </div>
          <span className="text-zinc-500">D3 Monochromatic Engine</span>
        </div>
      </div>
    </div>
  );
};
