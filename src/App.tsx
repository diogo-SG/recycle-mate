import "flowbite";
import "./App.css";
import { About } from "./views/About";
import { Home } from "./views/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { NotFound } from "./views/auth/NotFound";
import { Layout } from "./views/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      <Home />
    </>
  );
}

export default App;

// async function onImageUpload() {
//   console.log(assistant)
//   console.log('heyo')
// }

// return (
//   <>
//     <div className="pt-[38px]">
//       <Formik
//         initialValues={{}}
//         onSubmit={onImageUpload}
//         // validationSchema={schema}
//       >
//         {() => (
//           <Form className="flex flex-col gap-3">
//             <Input />
//             <div className="flex pt-5">
//               <SuccessButton
//               // disabled={Object.keys(errors).length > 0}
//               />
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   </>
// );
