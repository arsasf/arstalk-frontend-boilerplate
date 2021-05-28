import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Button, Container } from "react-bootstrap";

// WITHOUT REDUX ===========================================================================
function Counter() {
  const [count, setCount] = useState(0);

  // object
  // const [form, setForm] = useState({
  //   username: "",
  //   password: "",
  // });

  //index 0 digunakan untuk pengambilan data/peletakan data
  //inndex 1 dgunakan untuk memanipulasi di index 0

  // Lifecycle
  // Menggantikan componentDidMount
  useEffect(() => {
    console.log("GET DATA");
  }, []);
  // Menggantikan componentDidUpdate
  useEffect(() => {
    console.log("UPDATE COUNT RUNNING");
  }, [count]);

  const increaseCounter = () => {
    setCount(count + 1);

    // setForm({ ...form, username: "Aul" });
  };
  // console.log(form);

  return (
    <>
      <Container className="text-center">
        <Navbar />
        <h1>Counter</h1>
        <hr />
        <h3>{count}</h3>
        <Button variant="primary">-</Button>
        <Button variant="secondary" className="mx-2">
          RESET
        </Button>
        <Button variant="primary" onClick={increaseCounter}>
          +
        </Button>
      </Container>
    </>
  );
}

export default Counter;

// WITH REDUX ===========================================================================
// function Counter() {
//   return (
//     <>
//       <Container className="text-center">
//         <Navbar />
//         <h1>Counter</h1>
//         <hr />
//         <h3>0</h3>
//         <Button variant="primary">-</Button>
//         <Button variant="secondary" className="mx-2">
//           RESET
//         </Button>
//         <Button variant="primary">+</Button>
//       </Container>
//     </>
//   );
// }

// export default Counter;
