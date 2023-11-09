"use client";
import { use, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

const Linechart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<string[] | number[]>([
    10, 30, 50, 20, 40, 60, 40,
  ]);
  const width: string | number = 800;
  const height: string | number = 280;

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .classed("bg-white m-auto overflow-visible", true);

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const generatedScaleLine = d3
      .line()
      .x((d, i) => xScale(i))
      //@ts-ignore
      .y(yScale)
      .curve(d3.curveCardinal);

    const xAxis = d3.axisBottom(xScale).ticks(data.length).tickSize(0);

    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 20}) `)
      .classed("text-slate-400 text-base", true)
      .call(xAxis)
      .select(".domain")
      .style("visibility", "hidden");

    svg.append("g").call(yAxis).style("visibility", "hidden");

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (d: any) => generatedScaleLine(d as any))
      .attr("fill", "none")
      .attr("stroke", "#47b747")
      .attr("stroke-width", 2);
  }, [data]);

  return <svg ref={svgRef} className=""/>;
};

export default Linechart;
