import QuizContainer from "./containers/QuizContainer"
import { store } from "./store/store"
import { Provider } from "react-redux"

function App() {
	return (
		<Provider store={store}>
			<QuizContainer/>
		</Provider>
	)
}

export default App
