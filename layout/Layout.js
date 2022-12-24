import Head from 'next/head'
import Siderbar from '../components/Siderbar';
import Modal from "react-modal"
import LlamarContext from '../hooks/LlamarContext'
import Modalproducto from '../components/Modalproducto';
import Pasos from '../components/Pasos';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


Modal.setAppElement("#__next");

function Layout( {children , title= '', description =''} ) {

  const { modal } = LlamarContext()
  return (
      <>
          <Head>
              {/* <title> {`Menu-${title}`} </title> */}
              <meta name='description' content={description} />
          </Head>

          <div className='md:flex '>
              <aside className=' md:w-4/12  xl:w-1/4 2xl:w-1/5 '>
                  <Siderbar />
              </aside>

              <main className=' md:w-8/12  xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll '>
              <div className="p-10">
              <Pasos />
              {children}
            </div>
              </main>

              {modal && (
             
                <Modal isOpen={modal} style={customStyles}   >
                  <Modalproducto />
              </Modal>
              
          )}

          <ToastContainer/>

          </div>

         
      </>
  );
}

export default Layout