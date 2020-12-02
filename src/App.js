import React, {useEffect} from "react";
import * as d3h from "d3-hierarchy";
import * as d3 from "d3";

var data = {
  name: "A1",
  children: [
    {
      name: "B1",
      children: [
        {
          name: "C1",
          value: 100
        },
        {
          name: "C2",
          value: 300
        },
        {
          name: "C3",
          value: 200
        }
      ]
    },
    {
      name: "B2",
      value: 200
    }
  ]
};


const App = () => {
  const width = 1000;
  const height = 800;
  var treeLayout = d3h.tree();
  treeLayout.size([600, 400]);
  const root = d3h.hierarchy(data);
  // treeLayout will insert x,y coordinates into 'root'
  treeLayout(root);
  // nodes and edges will have x,y coordinates "injected" from "treeLayout"
  // other available layouts to use: https://www.d3indepth.com/layouts/
  const edges = root.links();
  const nodes = root.descendants();

  useEffect(() => {
    // The following is just to show how the injected coordinates can be used to
    // create nodes and edges
    // We should be able to force node position in graphviz by following:
    // https://stackoverflow.com/a/5344221
    // NOTE: the layout engine has to be switched to "neato" or "fdp"

    // create nodes dynamically
    d3.select('svg')
      .append('g')
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr('cx', function (d) {
        return d.x;
      })
      .attr('cy', function (d) {
        return d.y;
      })
      .attr("r", 30)

    // create edges dynamically
    d3.select('svg')
      .append('g')
      .attr('stroke', '#999')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

  }, [nodes, edges])

  return (
    <div className="App">
      <svg width={width} height={height}>
      </svg>
    </div>
  );
};

export default App;
