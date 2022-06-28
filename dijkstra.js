function NodesGetter(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

  function NodesDistanceSorter(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function unvisitedNeighborsUpdate(node, grid) {
    const unvisitedNeighbors = unvisitedGetter(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function unvisitedGetter(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  
export function dijkstrapath(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = NodesGetter(grid);
    while (!!unvisitedNodes.length) {
      NodesDistanceSorter(unvisitedNodes);
      const NeighborNode = unvisitedNodes.shift();
      if (NeighborNode.isWall) continue;
      if (NeighborNode.distance === Infinity) return visitedNodesInOrder;
      NeighborNode.isVisited = true;
      visitedNodesInOrder.push(NeighborNode);
      if (NeighborNode === finishNode) return visitedNodesInOrder;
      unvisitedNeighborsUpdate(NeighborNode, grid);
    }
  }

  