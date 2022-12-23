import '../styles/globals.css'
import { QuioscoProvaider } from '../context/QuioscoProvaider'


function MyApp({Component, pageProps}) {
    return (
        <QuioscoProvaider>
            <Component {...pageProps} />
        </QuioscoProvaider>
    );
}




export default MyApp
