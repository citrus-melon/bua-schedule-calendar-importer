const validityMessage = (node, val) => {
  if(!!val) node.setCustomValidity(val);
  return {
    update(newVal) {
      node.setCustomValidity(newVal ?? '');
    }
  };
}

export default validityMessage;