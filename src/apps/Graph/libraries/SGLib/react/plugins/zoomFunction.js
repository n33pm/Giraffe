import * as d3 from 'd3';

const zoomPlugin = (
  graphData,
  graphFidelity,
  mouseMode,
  setTransform,
  transform,
  simulationUpdate,
  dataLibrary
) => {
  if (mouseMode !== 'move' && mouseMode !== 'add') {
    return;
  }

  const localTransform = d3.event.transform;

  setTransform(localTransform);

  if (graphFidelity !== 'low' && localTransform.k !== transform.k) {
    graphData.nodes.forEach(node => {
      node.preRender(localTransform, dataLibrary);
    });
  }

  simulationUpdate(localTransform);
};

export default zoomPlugin;
