import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { zoom } from "d3-zoom";

import {
  useInvoicesWeekData,
  InvoicesWeekDataI,
} from "@/hooks/useInvoicesWeekData";
import useMonthStore from "@/hooks/useMonthStore";

const monthsData = [
  {
    month: "January",
    value1: 78,
    value2: 80,
  },
  {
    month: "February",
    value1: 67,
    value2: 90,
  },
  {
    month: "March",
    value1: 45,
    value2: 60,
  },
  {
    month: "April",
    value1: 23,
    value2: 30,
  },
  {
    month: "May",
    value1: 34,
    value2: 40,
  },
  {
    month: "June",
    value1: 56,
    value2: 70,
  },
  {
    month: "July",
    value1: 78,
    value2: 80,
  },
  {
    month: "August",
    value1: 67,
    value2: 90,
  },
  {
    month: "September",
    value1: 45,
    value2: 60,
  },
  {
    month: "October",
    value1: 23,
    value2: 30,
  },
  {
    month: "November",
    value1: 34,
    value2: 40,
  },
  {
    month: "December",
    value1: 56,
    value2: 70,
  },
];
const InvoicesBarChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  //   const { month } = useMonthStore();
  //   const data: InvoicesWeekDataI[] = useInvoicesWeekData(month);
  const data = monthsData;

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
      .classed("text-slate-400 text-base", true)
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
      .attr("y", (d) => yScale(d.value2))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value2))
      .attr("transform", `translate(0, -30)`)
      .attr("fill", "#02bb7d")
      .attr("rx", 12);
    svg
      .selectAll("outBar")
      .data(data)
      .join("rect")
      //@ts-ignore
      .attr("x", (d) => xScale(d.month))
      .attr("y", (d) => yScale(d.value1))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value1))
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
