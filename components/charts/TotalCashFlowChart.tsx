import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { zoom } from "d3-zoom";

import useMonthStore from "@/hooks/useMonthStore";
import {
  useTotalCashFlowData,
  TotalCashFlowDataI,
} from "@/hooks/useTotalCashFlowData";

const InvoicesBarChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { month } = useMonthStore();
  const data: TotalCashFlowDataI[] = useTotalCashFlowData(month);

  const width: string | number = 800;
  const height: string | number = 260;

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .classed("bg-white overflow-visible mt-4", true);
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.month))
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
      .classed("text-slate-400 text-base capitalize", true)
      .call(xAxis)
      .select(".domain")
      .style("visibility", "hidden");

    svg.append("g").call(yAxis).style("visibility", "hidden");

    svg
      .selectAll("InBar")
      .data(data)
      .join("rect")
      //@ts-ignore
      .attr("x", (d) => xScale(d.month))
      .attr("y", (d) => yScale(d.in))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.in))
      .attr("transform", `translate(0, -30)`)
      .attr("fill", "#02bb7d")
      .attr("rx", 12);
    svg
      .selectAll("outBar")
      .data(data)
      .join("rect")
      //@ts-ignore
      .attr("x", (d) => xScale(d.month))
      .attr("y", (d) => yScale(d.out))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.out))
      .attr("transform", `translate(0, -30)`)
      .attr("fill", "#47b747")
      .attr("rx", 12)
      .attr("stroke", "#fff");

    const zoomBehavior = zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event) => {
        xScale.range([0, width].map((d) => event.transform.applyX(d)));
        svg.select(".x-axis").call(xAxis.scale(xScale) as any);

        svg
          .selectAll("rect")
          .attr("x", (d: any) => xScale(d.month) as any)
          .attr("width", xScale.bandwidth());
      });

    svg.call(zoomBehavior as any);
    // Set an initial zoom level
    svg.call(zoomBehavior.transform as any, d3.zoomIdentity.scale(2));
  }, [data, height, width]);

  return <svg ref={svgRef} />;
};

export default InvoicesBarChart;
