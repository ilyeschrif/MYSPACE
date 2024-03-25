import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function CellVisualisation({ data, width, height }) {
  const svgRef = useRef()
  useEffect(() => {
    if (svgRef.current) {
      const svgDom = svgRef.current;


      // Create the color scale.
      const color = d3.scaleLinear()
        .domain([0, 5])
        .range(["hsla(27, 100%, 80%,0.9)", "hsla(27, 100%, 45%,1)"])

        .interpolate(d3.interpolateHcl);

      // Compute the layout.
      const pack = data => d3.pack()
        .size([width, height])
        .padding(40)
        (d3.hierarchy(data)
          .sum(_ => 1)
          .sort((a, b) => b.value - a.value));
      const root = pack(data);

      // Create the SVG container.
      const svg = d3.select(svgDom);
      svg
        .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
        .attr("style", `max-width: 100%; height: auto; display: block; cursor: pointer;`);
   // Append the nodes.
   function appendNode(svg) {
    return svg.append("g") 
    .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "#FFE5B4")
      .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
      .on("mouseout", function () { d3.select(this).attr("stroke", null); })
      .on("click", (event, d) =>d.children && focus !== d && (zoom(event, d), event.stopPropagation()));  
  }
  const node =appendNode(svg)
      
  // Append the text labels.
   
      const label = addLabels(svg)
      function addLabels(svg) {
        return svg.append("g")
          .style("font", "10px sans-serif")
          .attr("pointer-events", "none")
          .attr("text-anchor", "middle")
          .selectAll("text")
          .data(root.descendants())
          .join("text")
          .style("fill-opacity", d => d.parent === root ? 1 : 0)
          .style("display", d => d.parent === root ? "inline" : "none")
          .text(d => d.data.label);
      }

      // Create the zoom behavior and zoom immediately in to the initial focus node.
      svg.on("click", (event) => zoom(event, root));
      let focus = root;
      let view;
      zoomTo([focus.x, focus.y, focus.r * 2]);

      function zoomTo(v) {
        const k = width / v[2];

        view = v;

        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
      }

      function zoom(event, d) {

        focus = d;

        const transition = svg.transition()
          .duration(event.altKey ? 7500 : 1000)
          .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
          });

        label
          .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
          .transition(transition)
          .style("fill-opacity", d => d.parent === focus ? 1 : 0)
          .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
          .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
      }
    }

    return () => { cleanup(svgRef) }
  }, [])

  function cleanup(svgRef) {
    if (!svgRef.current) return;
    svgRef.current.querySelectorAll('*').forEach((n) => n.remove());
  }
  return (
    <svg className="visualization" ref={svgRef} width={width} height={height}> </svg>
  );
}
export default CellVisualisation