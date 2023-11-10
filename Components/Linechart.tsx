"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { zoom, zoomIdentity } from "d3-zoom";

const generateDataForCurrentMonth = () => {
  const currentDate = new Date();
  const currentMonth = 4;
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the last day of the month

  const data = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(currentYear, currentMonth, index + 1);
    const value = Math.floor(Math.random() * 90) + 10; // Generate a random value less than 100
    return { date, value };
  });

  return data;
};

type Data = {
  date: Date;
  value: number;
}[];

const Linechart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<Data>(generateDataForCurrentMonth());
  const width: string | number = 800;
  const height: string | number = 280;

  // Calculate minDate and maxDate outside useEffect
  const minDate = d3.min(data, (d) => d.date) as Date;
  const maxDate = d3.max(data, (d) => d.date) as Date;

  // State to store the zoom transform
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform>(
    d3.zoomIdentity
  );

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .classed("bg-white m-auto overflow-visible", true);

    // Set the scales
    const xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);

    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const generatedScaleLine = d3
      .line<{ date: Date; value: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveCardinal);

    const xAxis = d3
      .axisBottom<Date>(xScale)
      .tickFormat((d: Date) => d3.timeFormat("%d")(d))
      .tickSize(0);

    const yAxis = d3.axisLeft(yScale);
    svg.select<SVGGElement>(".x-axis").remove();

    // Create a zoom behavior
    const zoomBehavior = zoom<SVGSVGElement, Data>()
      .scaleExtent([1, 8]) // Set the zoom extent (min and max zoom levels)
      .translateExtent([
        [0, 0],
        [width, height],
      ]) // Set the pan boundaries
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, Data>) => {
        setZoomTransform(event.transform);

        // Update xScale with the new transform
        const newXScale = event.transform.rescaleX(xScale);

        // Add the new x-axis
        svg.select<SVGGElement>(".x-axis").call(xAxis.scale(newXScale));

        svg.select<SVGPathElement>(".line").attr(
          "d",
          //@ts-ignore
          generatedScaleLine.x((d) => newXScale(d.date))
        );
      });

    // Apply zoom behavior to the SVG
    //@ts-ignore
    svg.call(zoomBehavior);

    // Set an initial zoom level
    svg.call(zoomBehavior.transform as any, d3.zoomIdentity.scale(3));

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
      .selectAll(".line")
      .data([data]) // Binds data to the line
      .join("path")
      .attr("class", "line")
      .attr("d", generatedScaleLine as any)
      .attr("fill", "none")
      .attr("stroke", "#47b747")
      .attr("stroke-width", 2);
  }, [data, width, height, minDate, maxDate]);

  return <svg ref={svgRef} />;
};

export default Linechart;
