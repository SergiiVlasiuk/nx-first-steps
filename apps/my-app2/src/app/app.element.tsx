import { myLib } from '@my-nx-ws/my-lib';

const AppElement = () => {
  return (
    <>
      <div>Hello from Solid.js!</div>
      <div>{myLib()}</div>
    </>
  );
};

export default AppElement;
