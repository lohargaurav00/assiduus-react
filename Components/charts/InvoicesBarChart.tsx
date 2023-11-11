import React, { useEffect } from "react";
import * as d3 from "d3";

import {
  useInvoicesWeekData,
  InvoicesWeekDataI,
} from "@/hooks/useInvoicesWeekData";
import useMonthStore from "@/hooks/useMonthStore";

const InvoicesBarChart = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const { month } = useMonthStore();
  const data: InvoicesWeekDataI[] = useInvoicesWeekData(month);
  console.log(data);
  const width: string | number = 800;
  const height: string | number = 280;

  useEffect(() => {
    const svg = d3
    .select(svgRef.current)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .classed("bg-white overflow-visible mt-4", true);
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.date))
      .padding(0.8)
      .paddingOuter(0.2);

    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickSize(0);

    const yAxis = d3.axisLeft(yScale);
    
    // Add the initial x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - 20})`)
      .classed("text-slate-400 text-base", true)
      .call(xAxis)
      .select(".domain")
      .style("visibility", "hidden");

    

    svg.append("g").call(yAxis).style("visibility", "hidden");

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      //@ts-ignore
      .attr("x", (d) => xScale(d.date))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("transform", `translate(0, -30)`)
      .attr("fill", "#47b747")
      .attr("rx", 12);
  }, [data, height, width]);

  return <svg ref={svgRef} />;
};

export default InvoicesBarChart;
