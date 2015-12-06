({
	removeElementsWithClass : function(className) {
    var nodeList = document.getElementsByClassName(className);
    Array.from(nodeList).forEach(function(node){
      node.parentElement.removeChild(node);
    });
	}
})