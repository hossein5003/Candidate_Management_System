import './App.css';
import {store} from "./actions/store";
import {Provider} from "react-redux"
import DCandidate from "./Components/DCandidate";
import {Container} from "@material-ui/core";
import {ToastProvider} from "react-toast-notifications";

function App() {
    return (
        <Provider store={store}>
            <ToastProvider autoDismiss={true}>
                <Container maxWidth={"lg"}>
                    <DCandidate/>
                </Container>
            </ToastProvider>
        </Provider>
    );
}

export default App;
