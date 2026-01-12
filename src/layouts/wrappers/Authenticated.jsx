function Authenticated({ children }) {
  console.log('Authenticated wrapper applied', children);
  return children;
}

export default Authenticated;
