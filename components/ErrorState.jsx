function ErrorState(props) {
  const { text = 'An internal error occurred on the server' } = props;
  return <div>{text}</div>;
}

export default ErrorState;
